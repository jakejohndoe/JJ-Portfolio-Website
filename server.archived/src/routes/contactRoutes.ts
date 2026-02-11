import express from 'express';
import Contact from '../models/Contact.js';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Validate environment variables on startup
if (!process.env.RESEND_API_KEY) {
  console.error('⚠️  WARNING: RESEND_API_KEY is not set in environment variables');
  console.error('   Email notifications will not be sent until this is configured.');
  console.error('   Get your API key at: https://resend.com/api-keys');
}

// Set the recipient email (your email)
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'hellojakejohn@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'contact@hellojakejohn.com';

router.post('/', async (req, res) => {
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

    // Save to MongoDB first (as backup)
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    const savedContact = await newContact.save();
    console.log(`✅ Contact form submission saved to database (ID: ${savedContact._id})`);

    // Attempt to send email notification
    let emailSent = false;

    if (process.env.RESEND_API_KEY) {
      try {
        const emailResponse = await resend.emails.send({
          from: `Portfolio Contact Form <${FROM_EMAIL}>`,
          to: [RECIPIENT_EMAIL],
          replyTo: email, // Set reply-to as the sender's email
          subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                  .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
                  .field { margin-bottom: 20px; }
                  .label { font-weight: bold; color: #555; margin-bottom: 5px; }
                  .value { background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #667eea; }
                  .message { background: white; padding: 15px; border-radius: 4px; border-left: 3px solid #667eea; white-space: pre-wrap; }
                  .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h2 style="margin: 0;">📬 New Contact Form Submission</h2>
                  </div>
                  <div class="content">
                    <div class="field">
                      <div class="label">Name:</div>
                      <div class="value">${name}</div>
                    </div>
                    <div class="field">
                      <div class="label">Email:</div>
                      <div class="value"><a href="mailto:${email}">${email}</a></div>
                    </div>
                    <div class="field">
                      <div class="label">Subject:</div>
                      <div class="value">${subject || 'No subject provided'}</div>
                    </div>
                    <div class="field">
                      <div class="label">Message:</div>
                      <div class="message">${message.replace(/\n/g, '<br>')}</div>
                    </div>
                    <div class="footer">
                      <p>This message was sent from your portfolio contact form at ${new Date().toLocaleString()}</p>
                      <p>Database ID: ${savedContact._id}</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `,
          text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject || 'None'}
Message:
${message}

---
Sent from your portfolio contact form at ${new Date().toLocaleString()}
Database ID: ${savedContact._id}
          `
        });

        emailSent = true;
        console.log(`✅ Email notification sent successfully (Resend ID: ${emailResponse.data?.id})`);
      } catch (emailErr) {
        console.error('❌ Failed to send email notification:', emailErr);
        console.error('   The contact form submission has been saved to the database.');
      }
    } else {
      console.warn('⚠️  Email not sent: RESEND_API_KEY is not configured');
    }

    // Return appropriate response based on email status
    if (!process.env.RESEND_API_KEY) {
      // No API key configured - data saved but email not sent
      return res.status(201).json({
        success: true,
        message: 'Message received and saved. Email notifications are currently disabled.',
        emailSent: false,
        savedToDatabase: true
      });
    } else if (emailSent) {
      // Everything worked perfectly
      return res.status(201).json({
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.',
        emailSent: true,
        savedToDatabase: true
      });
    } else {
      // Email failed but data was saved
      return res.status(201).json({
        success: true,
        message: 'Message saved successfully. There was an issue sending the email notification, but I\'ll still see your message.',
        emailSent: false,
        savedToDatabase: true,
        warning: 'Email notification failed'
      });
    }

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process your message. Please try again later.',
      error: error instanceof Error ? error.message : 'Server error'
    });
  }
});

export default router;