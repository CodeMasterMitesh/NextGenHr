# Email Configuration Guide for NextGenHR

## Overview
This guide explains how to set up email notifications for the NextGenHR application using Nodemailer. The system sends professional emails to candidates and HR team when job applications are submitted.

---

## Table of Contents
1. [Installation](#installation)
2. [Gmail Configuration](#gmail-configuration)
3. [Custom SMTP Configuration](#custom-smtp-configuration)
4. [Environment Variables](#environment-variables)
5. [Testing Email](#testing-email)
6. [Email Templates](#email-templates)
7. [Troubleshooting](#troubleshooting)

---

## 1. Installation

### Install Nodemailer Package

```bash
npm install nodemailer
```

The email service is already integrated into the application at `services/emailService.js`.

---

## 2. Gmail Configuration (Recommended for Development)

### Step 1: Enable 2-Step Verification
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification**
3. Follow the steps to enable 2-Step Verification

### Step 2: Generate App Password
1. After enabling 2-Step Verification, go to: https://myaccount.google.com/apppasswords
2. Select **App**: Choose "Mail" or "Other (Custom name)"
3. Select **Device**: Choose your device or enter "NextGenHR"
4. Click **Generate**
5. Copy the 16-character app password (it will be shown only once)

### Step 3: Configure .env File

Create a `.env` file in the root directory (copy from `.env.example`):

```env
# Email Configuration - Gmail
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=abcd efgh ijkl mnop
EMAIL_FROM_NAME=NextGenHR
HR_EMAIL=hr@yourcompany.com
APP_URL=http://localhost:5000
COMPANY_WEBSITE=https://www.yourcompany.com
```

**Important Notes:**
- Use the **App Password**, NOT your regular Gmail password
- Remove spaces from the app password (or keep them, Nodemailer handles both)
- Never commit `.env` file to git (already in .gitignore)

---

## 3. Custom SMTP Configuration (For Production)

If you're using a custom email server (e.g., Outlook, Office 365, SendGrid, AWS SES), use SMTP configuration:

### Outlook/Office 365 Example

```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-outlook-password
EMAIL_FROM_NAME=NextGenHR
HR_EMAIL=hr@yourcompany.com
```

### SendGrid Example

```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
EMAIL_FROM_NAME=NextGenHR
HR_EMAIL=hr@yourcompany.com
```

### AWS SES Example

```env
EMAIL_SERVICE=smtp
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-aws-ses-smtp-username
SMTP_PASSWORD=your-aws-ses-smtp-password
EMAIL_FROM_NAME=NextGenHR
HR_EMAIL=hr@yourcompany.com
```

---

## 4. Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_SERVICE` | Email provider type: `gmail` or `smtp` | `gmail` |
| `EMAIL_USER` | Sender email address | `yourapp@gmail.com` |
| `EMAIL_APP_PASSWORD` | Gmail app password or SMTP password | `abcd efgh ijkl mnop` |
| `EMAIL_FROM_NAME` | Display name for sender | `NextGenHR` |
| `HR_EMAIL` | HR team notification email | `hr@company.com` |
| `APP_URL` | Application URL for links in emails | `http://localhost:5000` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `COMPANY_WEBSITE` | Company website URL | `www.nextgenhr.com` |
| `SMTP_HOST` | Custom SMTP server hostname | N/A |
| `SMTP_PORT` | SMTP port (587, 465, 25) | `587` |
| `SMTP_SECURE` | Use SSL/TLS (true for port 465) | `false` |
| `SMTP_USER` | SMTP authentication username | N/A |
| `SMTP_PASSWORD` | SMTP authentication password | N/A |

---

## 5. Testing Email Configuration

### Start the Server

```bash
npm start
```

You should see in the console:
```
✅ Email server is ready to send messages
📧 Email service configured and ready
```

If there's an error:
```
⚠️  Email service not configured properly. Check .env file for email settings.
```

### Test by Submitting a Job Application

1. Navigate to the job applications page
2. Fill out the application form with your email
3. Submit the application
4. Check the console for:
   ```
   ✅ Confirmation email sent to candidate: candidate@example.com
   ✅ Notification email sent to HR team
   ```
5. Check your inbox (and spam folder) for the confirmation email

### Manual Test (Optional)

Create a test file `test-email.js`:

```javascript
import { sendJobApplicationConfirmation } from './services/emailService.js';
import dotenv from 'dotenv';

dotenv.config();

const testData = {
    name: 'John Doe',
    email: 'your-test-email@example.com', // Change this to your email
    position: 'Software Developer',
    appliedAt: new Date()
};

sendJobApplicationConfirmation(testData)
    .then(result => {
        console.log('Email sent:', result);
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
```

Run: `node test-email.js`

---

## 6. Email Templates

The system includes two professional HTML email templates:

### 6.1 Candidate Confirmation Email

**Sent to:** Candidate who applied  
**Trigger:** When application is successfully submitted  
**Contains:**
- Personalized greeting with candidate name
- Application summary (position, date, email)
- Next steps in the hiring process
- Professional branding with gradient colors
- Mobile-responsive design
- Company contact information

### 6.2 HR Notification Email

**Sent to:** HR team email (from `HR_EMAIL` env variable)  
**Trigger:** When new application is received  
**Contains:**
- Alert box with action required message
- Complete candidate information
- Direct link to view application in system
- Professional HR-focused design
- Quick access to candidate contact details

### Customizing Templates

Templates are in `services/emailService.js`:

**To customize colors:**
```javascript
// Find gradient colors in CSS:
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

// Change to your brand colors:
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

**To add company logo:**
```html
<div class="header">
    <img src="YOUR_LOGO_URL" alt="Company Logo" style="max-width: 150px; margin-bottom: 15px;">
    <h1>✅ Application Received</h1>
</div>
```

**To modify content:**
Edit the HTML string in the respective functions:
- `sendJobApplicationConfirmation()` - Candidate email
- `sendJobApplicationNotificationToHR()` - HR email

---

## 7. Troubleshooting

### Issue: "Email configuration error: Invalid login"

**Solution:**
- For Gmail: Ensure you're using App Password, not regular password
- Verify 2-Step Verification is enabled
- Check EMAIL_USER and EMAIL_APP_PASSWORD are correct in .env

### Issue: "Error sending email: Connection timeout"

**Solution:**
- Check your internet connection
- Verify SMTP_HOST and SMTP_PORT are correct
- For corporate networks, check if port 587 or 465 is blocked
- Try using port 25 or contact your network admin

### Issue: Emails going to spam folder

**Solution:**
- Add sender email to contacts
- For production, use a verified domain with proper SPF/DKIM records
- Consider using a professional email service (SendGrid, AWS SES)
- Avoid spam trigger words in subject lines

### Issue: "self signed certificate" error

**Solution:**
Add to transporter configuration:
```javascript
tls: {
    rejectUnauthorized: false
}
```

### Issue: Rate limiting / Too many requests

**Solution:**
- Gmail has a limit of 500 emails/day for free accounts
- For high volume, use SendGrid, AWS SES, or Mailgun
- Implement email queue system for bulk sending

### Issue: Emails not sending in production

**Solution:**
- Verify all environment variables are set on production server
- Check firewall rules allow outbound SMTP connections
- For Gmail, you may need to allow "less secure apps" (not recommended)
- Use a dedicated SMTP service for production

### Issue: Candidate email shows wrong information

**Solution:**
- Check that savedApplication data is populated correctly
- Verify the fields match your schema (name, email, position)
- Check console logs for any errors during email generation

---

## Email Service Architecture

### Flow Diagram

```
User Submits Application
         ↓
Controller receives data
         ↓
Save to Database (await)
         ↓
         ├→ Send Confirmation to Candidate (async, no await)
         │           ↓
         │     Email Service
         │           ↓
         │     Nodemailer Transport
         │           ↓
         │     SMTP Server
         │           ↓
         │     Candidate's Inbox
         │
         └→ Send Notification to HR (async, no await)
                     ↓
               Email Service
                     ↓
               Nodemailer Transport
                     ↓
               SMTP Server
                     ↓
               HR Team's Inbox
```

### Non-Blocking Design

The email sending is implemented as **non-blocking** to ensure:
- Fast API response to user
- Application saved even if email fails
- Better user experience
- Console logs for monitoring

```javascript
// Emails sent asynchronously without blocking response
sendJobApplicationConfirmation(...).then(...).catch(...);
sendJobApplicationNotificationToHR(...).then(...).catch(...);

// Response sent immediately
res.status(201).json({ message: 'Success!' });
```

---

## Production Recommendations

### 1. Use Professional Email Service
- **SendGrid** - 100 emails/day free, great API
- **AWS SES** - $0.10 per 1,000 emails, reliable
- **Mailgun** - First 5,000 emails free for 3 months
- **Postmark** - Excellent deliverability

### 2. Implement Email Queue
For high volume applications:
```bash
npm install bull redis
```

### 3. Monitor Email Delivery
- Log all email attempts
- Track delivery rates
- Set up alerts for failures
- Use email service webhooks

### 4. Add Email Templates Management
- Store templates in database
- Allow HR to customize email content
- Support multiple languages
- Version control for templates

### 5. Security Best Practices
- Never expose email credentials
- Use environment variables
- Rotate passwords regularly
- Enable 2FA on email accounts
- Use API keys instead of passwords when possible

---

## Support

If you encounter any issues:

1. Check console logs for error messages
2. Verify all environment variables are set
3. Test with manual email script
4. Check spam folder
5. Review SMTP server documentation

For Gmail specific issues: https://support.google.com/accounts/answer/185833  
For Nodemailer documentation: https://nodemailer.com/about/

---

## Quick Start Checklist

- [ ] Install nodemailer: `npm install nodemailer`
- [ ] Copy `.env.example` to `.env`
- [ ] Enable Google 2-Step Verification
- [ ] Generate Gmail App Password
- [ ] Add credentials to `.env` file
- [ ] Start server: `npm start`
- [ ] Verify email config in console
- [ ] Submit test application
- [ ] Check inbox for confirmation email
- [ ] Check HR email for notification

---

## Files Modified

1. **services/emailService.js** - Email service implementation
2. **controller/JobVacancyApplications.js** - Integrated email sending
3. **server.js** - Added email config verification
4. **.env.example** - Email configuration template
5. **EMAIL_SETUP_GUIDE.md** - This documentation

---

*Last Updated: January 20, 2026*  
*NextGenHR v1.0*
