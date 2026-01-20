import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
const createTransporter = () => {
    // Configure based on email provider
    // For Gmail, Outlook, or custom SMTP
    
    if (process.env.EMAIL_SERVICE === 'gmail') {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD // Use App Password for Gmail
            }
        });
    } else if (process.env.EMAIL_SERVICE === 'smtp') {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    } else {
        // Default Gmail configuration
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        });
    }
};

// Verify transporter configuration
export const verifyEmailConfig = async () => {
    try {
        const transporter = createTransporter();
        await transporter.verify();
        console.log('✅ Email server is ready to send messages');
        return true;
    } catch (error) {
        console.error('❌ Email configuration error:', error.message);
        return false;
    }
};

// Send email function
export const sendEmail = async ({ to, subject, html, text, attachments = [] }) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: {
                name: process.env.EMAIL_FROM_NAME || 'NextGenHR',
                address: process.env.EMAIL_USER
            },
            to: to,
            subject: subject,
            text: text,
            html: html,
            attachments: attachments
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending email:', error);
        return { success: false, error: error.message };
    }
};

// Send job application confirmation to candidate
export const sendJobApplicationConfirmation = async (applicationData) => {
    const { name, email, position, appliedAt } = applicationData;
    
    const subject = `Application Received - ${position} Position`;
    
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Confirmation</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #ffffff;
                padding: 30px 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
            }
            .header p {
                margin: 10px 0 0 0;
                font-size: 16px;
                opacity: 0.9;
            }
            .content {
                padding: 30px 20px;
            }
            .greeting {
                font-size: 18px;
                font-weight: 500;
                color: #333;
                margin-bottom: 20px;
            }
            .message {
                font-size: 15px;
                color: #555;
                margin-bottom: 20px;
            }
            .info-box {
                background-color: #f8f9fa;
                border-left: 4px solid #667eea;
                padding: 20px;
                margin: 20px 0;
                border-radius: 4px;
            }
            .info-box h3 {
                margin: 0 0 15px 0;
                color: #667eea;
                font-size: 16px;
            }
            .info-item {
                margin: 10px 0;
                display: flex;
                align-items: baseline;
            }
            .info-label {
                font-weight: 600;
                color: #333;
                min-width: 120px;
            }
            .info-value {
                color: #555;
            }
            .next-steps {
                background-color: #fff3cd;
                border: 1px solid #ffc107;
                border-radius: 4px;
                padding: 20px;
                margin: 20px 0;
            }
            .next-steps h3 {
                margin: 0 0 15px 0;
                color: #856404;
                font-size: 16px;
            }
            .next-steps ul {
                margin: 0;
                padding-left: 20px;
            }
            .next-steps li {
                margin: 8px 0;
                color: #856404;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
                font-size: 13px;
                color: #666;
                border-top: 1px solid #e9ecef;
            }
            .footer a {
                color: #667eea;
                text-decoration: none;
            }
            .button {
                display: inline-block;
                padding: 12px 30px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-weight: 500;
                margin: 20px 0;
            }
            .divider {
                height: 1px;
                background-color: #e9ecef;
                margin: 25px 0;
            }
            @media only screen and (max-width: 600px) {
                .container {
                    margin: 10px;
                }
                .header h1 {
                    font-size: 24px;
                }
                .content {
                    padding: 20px 15px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✅ Application Received</h1>
                <p>Thank you for applying to NextGenHR</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Dear ${name},
                </div>
                
                <div class="message">
                    Thank you for your interest in the <strong>${position}</strong> position at NextGenHR. 
                    We have successfully received your application and wanted to confirm that it is now under review.
                </div>
                
                <div class="info-box">
                    <h3>📋 Application Summary</h3>
                    <div class="info-item">
                        <span class="info-label">Position:</span>
                        <span class="info-value">${position}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Candidate Name:</span>
                        <span class="info-value">${name}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Email:</span>
                        <span class="info-value">${email}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Application Date:</span>
                        <span class="info-value">${new Date(appliedAt).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</span>
                    </div>
                </div>
                
                <div class="next-steps">
                    <h3>📌 What Happens Next?</h3>
                    <ul>
                        <li>Our recruitment team will carefully review your application and resume</li>
                        <li>If your qualifications match our requirements, we'll contact you within 5-7 business days</li>
                        <li>You may be invited for an initial screening call or interview</li>
                        <li>We'll keep you updated throughout the hiring process</li>
                    </ul>
                </div>
                
                <div class="message">
                    We appreciate the time and effort you've invested in your application. 
                    Our team reviews every application thoroughly to ensure we find the best fit for both 
                    the role and our company culture.
                </div>
                
                <div class="divider"></div>
                
                <div class="message" style="font-size: 14px; color: #666;">
                    <strong>Important:</strong> Please check your spam folder regularly as sometimes our emails 
                    might end up there. Add <a href="mailto:${process.env.EMAIL_USER}" style="color: #667eea;">${process.env.EMAIL_USER}</a> 
                    to your contacts to ensure you receive our updates.
                </div>
                
                <div class="message" style="font-size: 14px; color: #666; margin-top: 20px;">
                    If you have any questions about your application status, please don't hesitate to reach out to us.
                </div>
            </div>
            
            <div class="footer">
                <p style="margin: 0 0 10px 0;">
                    <strong>NextGenHR - Employee Management System</strong>
                </p>
                <p style="margin: 5px 0;">
                    📧 Email: <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>
                </p>
                <p style="margin: 5px 0;">
                    🌐 Website: <a href="${process.env.COMPANY_WEBSITE || '#'}">${process.env.COMPANY_WEBSITE || 'www.nextgenhr.com'}</a>
                </p>
                <p style="margin: 15px 0 5px 0; font-size: 12px; color: #999;">
                    This is an automated message. Please do not reply directly to this email.
                </p>
                <p style="margin: 5px 0; font-size: 12px; color: #999;">
                    © ${new Date().getFullYear()} NextGenHR. All rights reserved.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
    
    const text = `
Dear ${name},

Thank you for your interest in the ${position} position at NextGenHR.

We have successfully received your application and wanted to confirm that it is now under review.

Application Summary:
- Position: ${position}
- Candidate Name: ${name}
- Email: ${email}
- Application Date: ${new Date(appliedAt).toLocaleDateString('en-US')}

What Happens Next?
- Our recruitment team will carefully review your application and resume
- If your qualifications match our requirements, we'll contact you within 5-7 business days
- You may be invited for an initial screening call or interview
- We'll keep you updated throughout the hiring process

We appreciate the time and effort you've invested in your application.

Best regards,
NextGenHR Team

---
This is an automated message. Please do not reply directly to this email.
© ${new Date().getFullYear()} NextGenHR. All rights reserved.
    `;
    
    return await sendEmail({
        to: email,
        subject: subject,
        html: html,
        text: text
    });
};

// Send notification to HR team
export const sendJobApplicationNotificationToHR = async (applicationData) => {
    const { name, email, phone, position, appliedAt } = applicationData;
    
    const hrEmail = process.env.HR_EMAIL || process.env.EMAIL_USER;
    const subject = `New Job Application - ${position}`;
    
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Application Notification</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: #ffffff;
                padding: 30px 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 26px;
                font-weight: 600;
            }
            .content {
                padding: 30px 20px;
            }
            .alert-box {
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
                border-left: 4px solid #28a745;
                padding: 15px;
                margin-bottom: 20px;
                border-radius: 4px;
                color: #155724;
            }
            .info-box {
                background-color: #f8f9fa;
                border: 1px solid #dee2e6;
                padding: 20px;
                margin: 20px 0;
                border-radius: 4px;
            }
            .info-item {
                margin: 12px 0;
                display: flex;
            }
            .info-label {
                font-weight: 600;
                min-width: 150px;
                color: #495057;
            }
            .info-value {
                color: #212529;
            }
            .button {
                display: inline-block;
                padding: 12px 25px;
                background: #28a745;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-weight: 500;
                margin: 10px 5px;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
                font-size: 13px;
                color: #666;
                border-top: 1px solid #e9ecef;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔔 New Job Application</h1>
            </div>
            
            <div class="content">
                <div class="alert-box">
                    <strong>⚡ Action Required:</strong> A new candidate has applied for the ${position} position.
                </div>
                
                <h3 style="color: #28a745; margin-top: 25px;">Candidate Information</h3>
                <div class="info-box">
                    <div class="info-item">
                        <span class="info-label">👤 Name:</span>
                        <span class="info-value">${name}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">📧 Email:</span>
                        <span class="info-value"><a href="mailto:${email}">${email}</a></span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">📱 Phone:</span>
                        <span class="info-value">${phone || 'Not provided'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">💼 Position:</span>
                        <span class="info-value"><strong>${position}</strong></span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">📅 Applied Date:</span>
                        <span class="info-value">${new Date(appliedAt).toLocaleString('en-US')}</span>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.APP_URL || 'http://localhost:5000'}/job-applications" class="button">
                        View Application in System
                    </a>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-top: 20px;">
                    Please review the application and resume at your earliest convenience. 
                    The candidate has been sent an automated confirmation email.
                </p>
            </div>
            
            <div class="footer">
                <p style="margin: 5px 0;">NextGenHR - Recruitment System</p>
                <p style="margin: 5px 0; font-size: 12px; color: #999;">
                    This is an automated notification from the NextGenHR system.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
    
    const text = `
New Job Application Received

Candidate Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || 'Not provided'}
- Position: ${position}
- Applied Date: ${new Date(appliedAt).toLocaleString('en-US')}

Please review the application in the NextGenHR system: ${process.env.APP_URL || 'http://localhost:5000'}/job-applications

---
This is an automated notification from the NextGenHR system.
    `;
    
    return await sendEmail({
        to: hrEmail,
        subject: subject,
        html: html,
        text: text
    });
};