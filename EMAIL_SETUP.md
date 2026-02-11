# Email Setup Documentation - Resend Integration

## Overview
The contact form now uses **Resend** for reliable email delivery. When someone submits the contact form:
1. The submission is saved to MongoDB (as backup)
2. An email notification is sent via Resend
3. The user receives appropriate feedback based on the result

## Environment Variables Required

### For Render.com (Backend)
Add these environment variables to your Render service:

```bash
# Required - Get this from https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Optional - Defaults to hellojakejohn@gmail.com if not set
RECIPIENT_EMAIL=hellojakejohn@gmail.com

# Optional - Must be a verified domain in Resend
# Defaults to contact@hellojakejohn.com
FROM_EMAIL=contact@yourdomain.com

# Already set (keep these)
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### For Vercel (Frontend)
Keep your existing environment variable:

```bash
# Points to your Render backend
VITE_API_BASE_URL=https://hellojakejohn.onrender.com
```

## Setting Up Resend

### Step 1: Create Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (10,000 emails/month free)
3. Verify your email address

### Step 2: Get Your API Key
1. Go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it "Portfolio Contact Form"
4. Copy the API key (starts with `re_`)
5. Save it securely - you won't see it again!

### Step 3: Configure Domain (Optional but Recommended)
For better deliverability and custom "from" addresses:

1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `hellojakejohn.com`)
4. Add the DNS records shown to your domain provider
5. Wait for verification (usually 5-10 minutes)
6. Once verified, update `FROM_EMAIL` to use your domain

If you skip this step, emails will come from `onboarding@resend.dev`

### Step 4: Add Environment Variables to Render

1. Log into [Render Dashboard](https://dashboard.render.com)
2. Select your backend service (hellojakejohn)
3. Go to "Environment" tab
4. Add the following:
   - Key: `RESEND_API_KEY`, Value: Your API key from Step 2
   - Key: `RECIPIENT_EMAIL`, Value: `hellojakejohn@gmail.com`
   - Key: `FROM_EMAIL`, Value: `contact@yourdomain.com` (or skip if no custom domain)
5. Click "Save Changes"
6. Your service will automatically redeploy

## Email Flow Explanation

### When Everything Works:
1. User fills out contact form
2. Form data is sent to `/api/contact`
3. Backend saves to MongoDB
4. Backend sends email via Resend
5. You receive a formatted HTML email at `hellojakejohn@gmail.com`
6. User sees success toast with green checkmark

### When Email Fails but DB Saves:
1. User fills out contact form
2. Form data is sent to `/api/contact`
3. Backend saves to MongoDB ✅
4. Backend fails to send email ❌
5. User sees warning toast - message saved but email failed
6. You can still see the message in MongoDB

### When RESEND_API_KEY is Missing:
1. User fills out contact form
2. Form data is sent to `/api/contact`
3. Backend saves to MongoDB ✅
4. Backend skips email (no API key)
5. User sees info toast - message received
6. Server logs show warning about missing API key

## Testing Your Setup

### 1. Check API Key is Set (Backend Logs)
After adding the env var to Render, check your server logs:
- If API key is missing: `⚠️  WARNING: RESEND_API_KEY is not set`
- If API key is set: No warning message

### 2. Test Contact Form
```bash
# Test via curl
curl -X POST https://hellojakejohn.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message from the email setup."
  }'

# Expected response:
{
  "success": true,
  "message": "Thank you for your message! I'll get back to you soon.",
  "emailSent": true,
  "savedToDatabase": true
}
```

### 3. Check Your Email
You should receive an email at `hellojakejohn@gmail.com` with:
- Subject: "New Contact Form Submission: Test Subject"
- Formatted HTML with gradient header
- Reply-to set to sender's email
- Database ID for reference

## Troubleshooting

### Email Not Received?

1. **Check Resend Dashboard**:
   - Go to [https://resend.com/emails](https://resend.com/emails)
   - Look for your email in the logs
   - Check status (delivered, bounced, etc.)

2. **Check Spam Folder**:
   - Resend emails might go to spam initially
   - Mark as "Not Spam" to train your email client

3. **Verify API Key**:
   ```bash
   # Test API key directly
   curl -X POST https://api.resend.com/emails \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "from": "onboarding@resend.dev",
       "to": "hellojakejohn@gmail.com",
       "subject": "Test from Resend",
       "text": "Testing Resend API"
     }'
   ```

4. **Check Server Logs**:
   - Go to Render Dashboard > Logs
   - Look for:
     - `✅ Email notification sent successfully` (good)
     - `❌ Failed to send email notification` (check error details)

### Common Issues & Fixes:

| Issue | Solution |
|-------|----------|
| "Invalid API Key" | Double-check the key in Render env vars |
| "From address not verified" | Use `onboarding@resend.dev` or verify your domain |
| Emails go to spam | Add SPF/DKIM records (see domain setup) |
| Rate limit exceeded | Upgrade Resend plan or implement rate limiting |

## Monitoring

### Server Logs Show:
- ✅ Successful saves to database
- ✅ Successful email sends with Resend ID
- ❌ Failed email attempts with error details
- ⚠️  Missing configuration warnings

### Frontend Shows:
- Success toast with green checkmark when everything works
- Warning toast when DB saves but email fails
- Error toast with fallback email when everything fails

## Fallback Contact Method
If the form completely fails, users are instructed to email directly:
**hellojakejohn@gmail.com**

## Cost & Limits

### Resend Free Tier:
- 100 emails per day
- 3,000 emails per month
- Perfect for portfolio contact forms

### When to Upgrade:
- If you receive > 100 contacts per day
- If you need advanced analytics
- If you need priority support

## Security Notes

1. **Never commit API keys to Git**
2. **Always use environment variables**
3. **Rotate API keys periodically**
4. **Monitor for suspicious activity in Resend dashboard**

## Support

- Resend Docs: [https://resend.com/docs](https://resend.com/docs)
- Resend Status: [https://status.resend.com](https://status.resend.com)
- Your Backend Logs: Render Dashboard > Logs

---

Last Updated: February 2024
Contact form implementation uses Resend for reliable email delivery with MongoDB backup.