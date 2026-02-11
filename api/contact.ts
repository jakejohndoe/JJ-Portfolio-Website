import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://www.hellojakejohn.com',
    'https://hellojakejohn.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://hellojakejohn.com');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Check for API key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({
        success: false,
        message: 'Email service not configured. Please contact directly: hellojakejohn@gmail.com'
      });
    }

    // Send email using Resend REST API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Portfolio Contact <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
        to: [process.env.RECIPIENT_EMAIL || 'hellojakejohn@gmail.com'],
        reply_to: email,
        subject: `Portfolio Contact: ${subject || 'No Subject'}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  margin: 0;
                  padding: 20px;
                  background-color: #f5f5f5;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background: white;
                  border-radius: 10px;
                  overflow: hidden;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .header {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  padding: 30px;
                  text-align: center;
                }
                .header h1 {
                  margin: 0;
                  font-size: 24px;
                }
                .content {
                  padding: 30px;
                }
                .field {
                  margin-bottom: 20px;
                  padding: 15px;
                  background: #f8f9fa;
                  border-radius: 5px;
                }
                .label {
                  font-weight: 600;
                  color: #555;
                  margin-bottom: 5px;
                  text-transform: uppercase;
                  font-size: 12px;
                  letter-spacing: 0.5px;
                }
                .value {
                  color: #222;
                  font-size: 16px;
                }
                .message-box {
                  background: #f8f9fa;
                  padding: 20px;
                  border-radius: 5px;
                  border-left: 4px solid #667eea;
                  margin-top: 20px;
                }
                .footer {
                  text-align: center;
                  padding: 20px;
                  color: #999;
                  font-size: 12px;
                  background: #f8f9fa;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>📬 New Contact Form Submission</h1>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Name</div>
                    <div class="value">${name}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${email}" style="color: #667eea;">${email}</a></div>
                  </div>
                  ${subject ? `
                  <div class="field">
                    <div class="label">Subject</div>
                    <div class="value">${subject}</div>
                  </div>
                  ` : ''}
                  <div class="message-box">
                    <div class="label" style="margin-bottom: 10px;">Message</div>
                    <div class="value" style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</div>
                  </div>
                </div>
                <div class="footer">
                  Sent from hellojakejohn.com at ${new Date().toLocaleString('en-US', {
                    timeZone: 'America/Los_Angeles',
                    dateStyle: 'full',
                    timeStyle: 'short'
                  })}
                </div>
              </div>
            </body>
          </html>
        `,
        text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}` : ''}

Message:
${message}

---
Sent from hellojakejohn.com at ${new Date().toLocaleString()}
        `
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', responseData);
      return res.status(500).json({
        success: false,
        message: 'Failed to send email. Please try again or contact directly.'
      });
    }

    console.log(`Email sent successfully: ${responseData.id}`);

    return res.status(200).json({
      success: true,
      message: "Thank you for your message! I'll get back to you soon."
    });

  } catch (error: any) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}