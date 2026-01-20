# Quick Email Setup for NextGenHR

## 🚀 Quick Start (5 Minutes)

### 1. Install Package (Already Done)
```bash
npm install nodemailer
```

### 2. Configure Gmail

#### A. Enable 2-Step Verification
1. Go to: https://myaccount.google.com/security
2. Click **2-Step Verification**
3. Follow steps to enable

#### B. Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select App: **Mail** or **Other (Custom name)**
3. Device: Enter "NextGenHR"
4. Click **Generate**
5. **Copy the 16-character password** (shown only once)

### 3. Update .env File

Copy `.env.example` to `.env` if not exists:
```bash
copy .env.example .env
```

Edit `.env` and add:
```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=abcd efgh ijkl mnop
EMAIL_FROM_NAME=NextGenHR
HR_EMAIL=hr@yourcompany.com
APP_URL=http://localhost:5000
COMPANY_WEBSITE=https://www.yourcompany.com
```

**Replace:**
- `your-email@gmail.com` - Your Gmail address
- `abcd efgh ijkl mnop` - The 16-character App Password from step 2B
- `hr@yourcompany.com` - Email where HR notifications should go

### 4. Test Email Configuration

```bash
node test-email.js
```

**Expected output:**
```
📧 Email Test Script for NextGenHR

1️⃣  Verifying email configuration...
✅ Email configuration is valid!

2️⃣  Sending test confirmation email to candidate...
✅ Candidate confirmation email sent successfully!

3️⃣  Sending test notification to HR team...
✅ HR notification email sent successfully!

✨ Email Test Complete!
```

**Check your inbox** (and spam folder) for two test emails.

### 5. Start Server

```bash
npm start
```

You should see:
```
Server is running on http://localhost:5000
📧 Email service configured and ready
```

### 6. Test Live Application

1. Navigate to: http://localhost:5000/job-applications
2. Click **Add New Application**
3. Fill form with **your email address**
4. Upload a resume
5. Submit

**You should receive:**
- ✅ Confirmation email to candidate's email
- ✅ Notification email to HR_EMAIL

---

## 📧 Email Templates Preview

### Candidate Confirmation Email

**Subject:** Application Received - [Position] Position

**Features:**
- ✨ Professional gradient design (purple/blue)
- 📋 Application summary with all details
- 📌 Next steps in hiring process
- 📱 Mobile responsive
- 🎨 Company branding

**Contains:**
- Personalized greeting
- Position applied for
- Application date and time
- Expected timeline (5-7 business days)
- Contact information
- Professional footer

### HR Notification Email

**Subject:** New Job Application - [Position]

**Features:**
- 🔔 Alert box with action required
- 👤 Complete candidate information
- 🔗 Direct link to view in system
- 📊 Professional HR-focused design

**Contains:**
- Candidate name, email, phone
- Position applied for
- Application timestamp
- Quick access button to system

---

## ⚙️ Configuration Options

### Gmail (Recommended for Development)
```env
EMAIL_SERVICE=gmail
EMAIL_USER=yourapp@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password
```

### Outlook/Office 365
```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=yourapp@outlook.com
SMTP_PASSWORD=your-outlook-password
```

### SendGrid (Recommended for Production)
```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

---

## 🔧 Troubleshooting

### ❌ "Invalid login" error
- For Gmail: Use **App Password**, not regular password
- Verify 2-Step Verification is enabled
- Check credentials in .env file

### ❌ "Connection timeout" error
- Check internet connection
- Verify port 587 is not blocked
- Try port 465 with SMTP_SECURE=true

### ❌ Emails in spam folder
- Add sender to contacts
- For production, use verified domain
- Use professional SMTP service (SendGrid, AWS SES)

### ❌ "Email not configured" warning
- Check .env file exists
- Verify EMAIL_USER and EMAIL_APP_PASSWORD are set
- Restart server after changing .env

---

## 📁 Files Created/Modified

1. ✅ `services/emailService.js` - Email service with templates
2. ✅ `controller/JobVacancyApplications.js` - Added email sending
3. ✅ `server.js` - Email config verification on startup
4. ✅ `.env.example` - Environment variables template
5. ✅ `test-email.js` - Email testing script
6. ✅ `EMAIL_SETUP_GUIDE.md` - Complete documentation
7. ✅ `EMAIL_QUICK_START.md` - This quick reference

---

## 🎯 Testing Checklist

- [ ] Install nodemailer: `npm install nodemailer`
- [ ] Enable Gmail 2-Step Verification
- [ ] Generate Gmail App Password
- [ ] Update .env with credentials
- [ ] Run test script: `node test-email.js`
- [ ] Verify emails received (check spam)
- [ ] Start server: `npm start`
- [ ] Submit test job application
- [ ] Confirm both emails received

---

## 🚀 Production Recommendations

For production use:
- ✅ Use professional SMTP service (SendGrid, AWS SES, Mailgun)
- ✅ Set up SPF, DKIM, DMARC records
- ✅ Use dedicated sending domain
- ✅ Implement email queue for high volume
- ✅ Monitor delivery rates
- ✅ Keep App Passwords secure

---

## 📞 Need Help?

See full documentation: [EMAIL_SETUP_GUIDE.md](./EMAIL_SETUP_GUIDE.md)

Gmail App Passwords: https://support.google.com/accounts/answer/185833  
Nodemailer Docs: https://nodemailer.com/about/

---

**Ready to go!** Start with step 2 above to configure Gmail, then test with `node test-email.js`
