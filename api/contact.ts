import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { MongoClient } from 'mongodb';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// MongoDB connection
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development'
    ? '*'
    : 'https://hellojakejohn.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Rate limiting - simple in-memory store (for more robust solution, use Redis)
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
         req.connection?.remoteAddress ||
         'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin'])
      .setHeader('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods'])
      .setHeader('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers'])
      .end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  // Set CORS headers for actual request
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

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

  try {
    const { name, email, subject = '', message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Save to MongoDB
    let savedToDatabase = false;
    let dbId = null;

    try {
      const client = await connectToDatabase();
      const db = client.db('jakejohn-portfolio');
      const collection = db.collection('contacts');

      const document = {
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
        source: 'portfolio-contact-form'
      };

      const result = await collection.insertOne(document);
      savedToDatabase = true;
      dbId = result.insertedId.toString();
      console.log(`✅ Contact saved to MongoDB (ID: ${dbId})`);
    } catch (dbError) {
      console.error('❌ MongoDB save failed:', dbError);
      // Continue even if DB fails - we'll still try to send email
    }

    // Send email via Resend
    let emailSent = false;
    const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'hellojakejohn@gmail.com';
    const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️ RESEND_API_KEY not configured - email will not be sent');

      return res.status(201).json({
        success: true,
        message: 'Message received. Email notifications are currently disabled.',
        emailSent: false,
        savedToDatabase
      });
    }

    try {
      const emailResponse = await resend.emails.send({
        from: `Portfolio Contact <${FROM_EMAIL}>`,
        to: [RECIPIENT_EMAIL],
        replyTo: email,
        subject: `Portfolio Contact: ${subject || 'No Subject'}`,
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
                    <div class="value">${name}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  ${subject ? `
                  <div class="field">
                    <div class="label">Subject</div>
                    <div class="value">${subject}</div>
                  </div>
                  ` : ''}
                  <div class="message-box">
                    <div class="label" style="margin-bottom: 12px;">Message</div>
                    <div class="value" style="white-space: pre-wrap; line-height: 1.8;">${message.replace(/\n/g, '<br>')}</div>
                  </div>
                </div>
                <div class="footer">
                  <p>Sent from hellojakejohn.com at ${new Date().toLocaleString('en-US', {
                    timeZone: 'America/Los_Angeles',
                    dateStyle: 'full',
                    timeStyle: 'short'
                  })}</p>
                  ${dbId ? `<p style="color: #999;">Reference: ${dbId}</p>` : ''}
                </div>
              </div>
            </body>
          </html>
        `,
        text: `
New Contact Form Submission

From: ${name}
Email: ${email}
${subject ? `Subject: ${subject}` : ''}

Message:
${message}

---
Sent from hellojakejohn.com at ${new Date().toLocaleString()}
${dbId ? `Reference ID: ${dbId}` : ''}
        `
      });

      emailSent = true;
      console.log(`✅ Email sent via Resend (ID: ${emailResponse.data?.id})`);
    } catch (emailError) {
      console.error('❌ Resend email failed:', emailError);
    }

    // Return response based on what succeeded
    if (emailSent && savedToDatabase) {
      return res.status(201).json({
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
        emailSent: true,
        savedToDatabase: true
      });
    } else if (emailSent) {
      return res.status(201).json({
        success: true,
        message: "Message sent successfully!",
        emailSent: true,
        savedToDatabase: false
      });
    } else if (savedToDatabase) {
      return res.status(201).json({
        success: true,
        message: "Message saved. I'll still see it even though the email notification failed.",
        emailSent: false,
        savedToDatabase: true,
        warning: 'Email notification failed'
      });
    } else {
      throw new Error('Both email and database operations failed');
    }

  } catch (error) {
    console.error('❌ Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process your message. Please try again or email directly: hellojakejohn@gmail.com',
      error: error instanceof Error ? error.message : 'Server error'
    });
  }
}