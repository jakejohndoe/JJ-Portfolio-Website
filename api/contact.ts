import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Wrap entire handler in try-catch to ensure JSON responses
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // CORS headers - accept both www and non-www domains
    const origin = req.headers.origin || req.headers.referer || '';
    const allowedOrigins = [
      'https://hellojakejohn.com',
      'https://www.hellojakejohn.com',
      'http://localhost:5173', // Vite dev server
      'http://localhost:3000'
    ];

    const corsOrigin = process.env.NODE_ENV === 'development'
      ? '*'
      : allowedOrigins.includes(origin) ? origin : 'https://hellojakejohn.com';

    const corsHeaders = {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      return res.status(200).json({ ok: true });
    }

    // Set CORS headers for actual request
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // Only allow POST
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        message: 'Method not allowed'
      });
    }

    // Rate limiting - simple in-memory store
    const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
    const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
    const RATE_LIMIT_MAX = 5; // Max 5 submissions per window

    function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
      const now = Date.now();
      const userLimit = rateLimitStore.get(ip);

      if (!userLimit || now > userLimit.resetTime) {
        // Create new window
        rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return { allowed: true };
      }

      if (userLimit.count >= RATE_LIMIT_MAX) {
        return { allowed: false, resetTime: userLimit.resetTime };
      }

      // Increment count
      userLimit.count++;
      return { allowed: true };
    }

    function getClientIP(req: VercelRequest): string {
      return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
             (req.headers['x-real-ip'] as string) ||
             'unknown';
    }

    // Simple XSS sanitization
    function sanitizeInput(str: string): string {
      if (!str) return '';
      return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    }

    // Rate limiting check
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.allowed) {
      const resetTime = rateLimit.resetTime ? new Date(rateLimit.resetTime) : new Date();
      return res.status(429).json({
        success: false,
        message: `Too many requests. Please try again after ${resetTime.toLocaleTimeString()}.`,
        retryAfter: Math.ceil((rateLimit.resetTime! - Date.now()) / 1000)
      });
    }

    // Parse request body
    const { name, email, subject = '', message } = req.body || {};

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Sanitize inputs to prevent XSS
    const sanitizedName = sanitizeInput(name);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // Check for required environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY not configured');
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please contact directly: hellojakejohn@gmail.com'
      });
    }

    // Send email via Resend
    const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'hellojakejohn@gmail.com';
    const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    try {
      const emailResponse = await resend.emails.send({
        from: `Portfolio Contact <${FROM_EMAIL}>`,
        to: [RECIPIENT_EMAIL],
        replyTo: email,
        subject: `Portfolio Contact: ${sanitizedSubject || 'No Subject'}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
                .content { background: #f8f9fa; padding: 30px; }
                .field { margin-bottom: 25px; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                .label { font-weight: 600; color: #555; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
                .value { color: #222; font-size: 16px; }
                .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin-top: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background: #fff; border-top: 1px solid #e0e0e0; }
                a { color: #667eea; text-decoration: none; }
                a:hover { text-decoration: underline; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0; font-size: 28px;">📬 New Contact Form Submission</h1>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">From</div>
                    <div class="value">${sanitizedName}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  ${sanitizedSubject ? `
                  <div class="field">
                    <div class="label">Subject</div>
                    <div class="value">${sanitizedSubject}</div>
                  </div>
                  ` : ''}
                  <div class="message-box">
                    <div class="label" style="margin-bottom: 12px;">Message</div>
                    <div class="value" style="white-space: pre-wrap; line-height: 1.8;">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
                  </div>
                </div>
                <div class="footer">
                  <p>Sent from hellojakejohn.com at ${new Date().toLocaleString('en-US', {
                    timeZone: 'America/Los_Angeles',
                    dateStyle: 'full',
                    timeStyle: 'short'
                  })}</p>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `
New Contact Form Submission

From: ${sanitizedName}
Email: ${email}
${sanitizedSubject ? `Subject: ${sanitizedSubject}` : ''}

Message:
${message}

---
Sent from hellojakejohn.com at ${new Date().toLocaleString()}
        `
      });

      console.log(`✅ Email sent via Resend (ID: ${emailResponse.data?.id})`);

      return res.status(201).json({
        success: true,
        message: "Thank you for your message! I'll get back to you soon."
      });

    } catch (emailError: any) {
      console.error('❌ Resend email failed:', emailError);

      return res.status(500).json({
        success: false,
        message: 'Failed to send your message. Please try again or email directly: hellojakejohn@gmail.com',
        error: process.env.NODE_ENV === 'development' ? emailError.message : undefined
      });
    }

  } catch (error: any) {
    // Top-level error handler - ensures ALL errors return JSON
    console.error('❌ Contact form handler error:', error);

    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again or email directly: hellojakejohn@gmail.com',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}