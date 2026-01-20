# Email Provider Configuration Examples

## Quick Reference for Different Email Services

---

## 1. Gmail (Development - Free)

### Setup Steps:
1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Copy 16-character password

### .env Configuration:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=yourapp@gmail.com
EMAIL_APP_PASSWORD=abcd efgh ijkl mnop
EMAIL_FROM_NAME=NextGenHR
HR_EMAIL=hr@yourcompany.com
APP_URL=http://localhost:5000
COMPANY_WEBSITE=https://www.yourcompany.com
```

**Limits:** 500 emails/day  
**Best For:** Development, testing, small projects  

---

## 2. Outlook/Office 365 (Free/Paid)

### .env Configuration:
```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=yourapp@outlook.com
SMTP_PASSWORD=your-outlook-password
EMAIL_FROM_NAME=NextGenHR
HR_EMAIL=hr@yourcompany.com
APP_URL=https://yourapp.com
COMPANY_WEBSITE=https://www.yourcompany.com
```

**Limits:** 300 emails/day (free), 10,000/day (paid)  
**Best For:** Corporate environments with Office 365  

---

## 3. SendGrid (Production - Recommended)

### Setup Steps:
1. Create account: https://sendgrid.com
2. Verify sender identity
3. Create API Key

### .env Configuration:
```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM_NAME=NextGenHR
HR_EMAIL=hr@yourcompany.com
APP_URL=https://yourapp.com
COMPANY_WEBSITE=https://www.yourcompany.com
```

**Limits:** 100 emails/day (free), paid plans available  
**Best For:** Production applications, reliable delivery  
**Features:** Analytics, templates, webhooks, high deliverability  

---

## 4. AWS SES (Production - Cost Effective)

### Setup Steps:
1. AWS Console → SES
2. Verify domain/email
3. Create SMTP credentials

### .env Configuration:
```env
EMAIL_SERVICE=smtp
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-aws-ses-smtp-username
SMTP_PASSWORD=your-aws-ses-smtp-password
EMAIL_FROM_NAME=NextGenHR
HR_EMAIL=hr@yourcompany.com
APP_URL=https://yourapp.com
COMPANY_WEBSITE=https://www.yourcompany.com
```

**Pricing:** $0.10 per 1,000 emails  
**Best For:** High volume, AWS infrastructure  
**Features:** Scalable, reliable, cost-effective  

---

## 5. Mailgun (Production)

### Setup Steps:
1. Create account: https://mailgun.com
2. Verify domain
3. Get SMTP credentials

### .env Configuration:
```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@yourdomain.com
SMTP_PASSWORD=your-mailgun-password
EMAIL_FROM_NAME=NextGenHR
HR_EMAIL=hr@yourcompany.com
APP_URL=https://yourapp.com
COMPANY_WEBSITE=https://www.yourcompany.com
```

**Limits:** 5,000 emails/month free for 3 months  
**Best For:** Developers, flexible API  
**Features:** Powerful API, good documentation  

---

## 6. Postmark (Production - Transactional)

### Setup Steps:
1. Create account: https://postmarkapp.com
2. Create server
3. Get SMTP credentials

### .env Configuration:
```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.postmarkapp.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-postmark-server-token
SMTP_PASSWORD=your-postmark-server-token
EMAIL_FROM_NAME=NextGenHR
HR_EMAIL=hr@yourcompany.com
APP_URL=https://yourapp.com
COMPANY_WEBSITE=https://www.yourcompany.com
```

**Pricing:** $10/month for 10,000 emails  
**Best For:** Transactional emails, excellent deliverability  
**Features:** Fast delivery, detailed analytics  

---

## 7. Zoho Mail (Business)

### .env Configuration:
```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=yourapp@yourdomain.com
SMTP_PASSWORD=your-zoho-password
EMAIL_FROM_NAME=NextGenHR
HR_EMAIL=hr@yourcompany.com
APP_URL=https://yourapp.com
COMPANY_WEBSITE=https://www.yourcompany.com
```

**Best For:** Small businesses with custom domain  

---

## 8. Custom SMTP Server

### .env Configuration:
```env
EMAIL_SERVICE=smtp
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@yourdomain.com
SMTP_PASSWORD=your-password
EMAIL_FROM_NAME=NextGenHR
HR_EMAIL=hr@yourcompany.com
APP_URL=https://yourapp.com
COMPANY_WEBSITE=https://www.yourcompany.com
```

---

## Port Configuration Guide

### Common SMTP Ports:

| Port | Security | Usage |
|------|----------|-------|
| 25 | None | Default SMTP (often blocked) |
| 587 | STARTTLS | **Recommended** - Modern standard |
| 465 | SSL/TLS | Legacy SSL (use SMTP_SECURE=true) |
| 2525 | STARTTLS | Alternative to 587 |

### Recommended Setup:
```env
SMTP_PORT=587
SMTP_SECURE=false
```

### For Port 465 (SSL):
```env
SMTP_PORT=465
SMTP_SECURE=true
```

---

## Comparison Table

| Provider | Free Tier | Paid Starting | Deliverability | Ease of Setup | Best For |
|----------|-----------|---------------|----------------|---------------|----------|
| **Gmail** | 500/day | N/A | Good | ⭐⭐⭐⭐⭐ | Development |
| **Outlook** | 300/day | $10/month | Good | ⭐⭐⭐⭐ | Corporate |
| **SendGrid** | 100/day | $15/month | Excellent | ⭐⭐⭐⭐ | Production |
| **AWS SES** | 62,000/month* | $0.10/1000 | Excellent | ⭐⭐⭐ | High Volume |
| **Mailgun** | 5000/month** | $35/month | Excellent | ⭐⭐⭐⭐ | Developers |
| **Postmark** | None | $10/month | Excellent | ⭐⭐⭐⭐ | Transactional |

\* If sending from EC2  
\** First 3 months only

---

## Testing Your Configuration

After configuring your `.env` file, test with:

```bash
npm run test:email
```

**Expected Output:**
```
✅ Email server is ready to send messages
✅ Candidate confirmation email sent successfully!
✅ HR notification email sent successfully!
```

---

## Troubleshooting by Provider

### Gmail
- ❌ "Invalid login" → Use App Password, not regular password
- ❌ "Less secure apps" → Enable 2-Step Verification and use App Password
- ❌ Rate limit → You've hit 500/day limit

### Outlook
- ❌ "Authentication failed" → Enable SMTP in account settings
- ❌ "Too many connections" → Rate limiting, wait and retry

### SendGrid
- ❌ "Sender identity not verified" → Verify sender in SendGrid dashboard
- ❌ "API key invalid" → Regenerate API key
- ❌ SMTP_USER must be exactly "apikey" (not your email)

### AWS SES
- ❌ "Email address not verified" → Verify in SES console
- ❌ "Sandbox mode" → Request production access
- ❌ Check AWS region in SMTP_HOST

---

## Security Recommendations

### For All Providers:

1. **Never commit credentials to git**
   ```gitignore
   .env
   .env.local
   ```

2. **Use environment variables**
   ```javascript
   EMAIL_USER=process.env.EMAIL_USER
   ```

3. **Rotate passwords regularly**
   - Change every 3-6 months
   - Use strong, unique passwords

4. **Enable 2FA**
   - All email accounts should use 2FA
   - Use app passwords instead of regular passwords

5. **Restrict API keys**
   - Limit to specific IP addresses
   - Set minimal required permissions

---

## Production Checklist

Before going live:

- [ ] Switch from Gmail to professional SMTP service
- [ ] Set up SPF record for your domain
- [ ] Configure DKIM signing
- [ ] Set up DMARC policy
- [ ] Use verified custom domain
- [ ] Test email deliverability
- [ ] Set up monitoring and alerts
- [ ] Implement email queue for high volume
- [ ] Add unsubscribe functionality
- [ ] Review and test all email templates

---

## Monitoring and Logs

### What to Track:

```javascript
// Email service logs
✅ Email sent successfully: messageId
❌ Email failed: error message

// Application logs
📧 Confirmation sent to: candidate@example.com
📧 HR notification sent to: hr@company.com
```

### Recommended Tools:
- SendGrid: Built-in analytics
- AWS SES: CloudWatch metrics
- Postmark: Dashboard analytics
- Custom: Log to database

---

## Quick Switch Guide

### From Gmail to SendGrid:

1. Create SendGrid account
2. Get API key
3. Update `.env`:
   ```env
   EMAIL_SERVICE=smtp
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASSWORD=SG.your-api-key
   ```
4. Test: `npm run test:email`
5. Done! No code changes needed

---

## Support Links

| Provider | Documentation | Support |
|----------|---------------|---------|
| Gmail | [App Passwords Guide](https://support.google.com/accounts/answer/185833) | [Help Center](https://support.google.com/mail) |
| SendGrid | [SMTP API Docs](https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api) | [Support](https://support.sendgrid.com) |
| AWS SES | [SMTP Guide](https://docs.aws.amazon.com/ses/latest/dg/send-email-smtp.html) | [AWS Support](https://aws.amazon.com/ses/) |
| Mailgun | [SMTP Docs](https://documentation.mailgun.com/en/latest/user_manual.html#sending-via-smtp) | [Support](https://www.mailgun.com/support/) |
| Postmark | [SMTP Guide](https://postmarkapp.com/support/article/1008-what-are-the-smtp-details) | [Support](https://postmarkapp.com/support) |

---

**Last Updated:** January 20, 2026  
**NextGenHR v1.0**
