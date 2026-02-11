import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔧 Testing email configuration...\n');

// Check environment variables
console.log('📧 EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Missing');
console.log('🔑 EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing');
console.log('');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ Missing email credentials in environment variables');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function testEmail() {
  try {
    console.log('🔍 Verifying email transporter...');
    await transporter.verify();
    console.log('✅ Email transporter verified successfully');
    
    console.log('\n📤 Sending test email...');
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email - Contact Form Debug',
      text: 'This is a test email to verify email delivery is working.',
      html: '<h3>Test Email</h3><p>This is a test email to verify email delivery is working.</p>'
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('📬 Message ID:', info.messageId);
    console.log('📨 Response:', info.response);
    
  } catch (error) {
    console.error('❌ Email test failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Make sure 2-factor authentication is enabled on Gmail');
      console.log('2. Use an App Password instead of your regular password');
      console.log('3. Check that "Less secure app access" is enabled (if not using App Password)');
    }
  }
}

testEmail();