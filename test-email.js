import { sendJobApplicationConfirmation, sendJobApplicationNotificationToHR, verifyEmailConfig } from './services/emailService.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('📧 Email Test Script for NextGenHR\n');
console.log('='.repeat(50));

// Verify email configuration first
console.log('\n1️⃣  Verifying email configuration...');
verifyEmailConfig()
    .then(async (isValid) => {
        if (!isValid) {
            console.log('\n❌ Email configuration is invalid!');
            console.log('\nPlease check your .env file and ensure:');
            console.log('- EMAIL_USER is set to your email address');
            console.log('- EMAIL_APP_PASSWORD is set (for Gmail, use App Password)');
            console.log('- EMAIL_SERVICE is set to "gmail" or "smtp"');
            console.log('\nFor Gmail setup instructions, see EMAIL_SETUP_GUIDE.md');
            process.exit(1);
        }

        console.log('✅ Email configuration is valid!\n');
        console.log('='.repeat(50));

        // Test data - Change the email to your test email
        const testCandidateData = {
            name: 'John Doe',
            email: process.env.TEST_EMAIL || 'prajapatimitesh180893@gmail.com', // Change this!
            phone: '+1234567890',
            position: 'Senior Software Developer',
            appliedAt: new Date()
        };

        console.log('\n2️⃣  Sending test confirmation email to candidate...');
        console.log(`   To: ${testCandidateData.email}`);

        const candidateResult = await sendJobApplicationConfirmation(testCandidateData);
        
        if (candidateResult.success) {
            console.log('✅ Candidate confirmation email sent successfully!');
            console.log(`   Message ID: ${candidateResult.messageId}`);
        } else {
            console.log('❌ Failed to send candidate email:', candidateResult.error);
        }

        console.log('\n' + '='.repeat(50));
        console.log('\n3️⃣  Sending test notification to HR team...');
        console.log(`   To: ${process.env.HR_EMAIL || process.env.EMAIL_USER}`);

        const hrResult = await sendJobApplicationNotificationToHR(testCandidateData);
        
        if (hrResult.success) {
            console.log('✅ HR notification email sent successfully!');
            console.log(`   Message ID: ${hrResult.messageId}`);
        } else {
            console.log('❌ Failed to send HR email:', hrResult.error);
        }

        console.log('\n' + '='.repeat(50));
        console.log('\n✨ Email Test Complete!\n');
        console.log('Next steps:');
        console.log('1. Check your inbox for the test emails');
        console.log('2. Check spam folder if not in inbox');
        console.log('3. If successful, start the server: npm start');
        console.log('4. Test by submitting a real job application\n');
        
        process.exit(0);
    })
    .catch(err => {
        console.error('\n❌ Email test failed:', err);
        console.log('\nTroubleshooting:');
        console.log('- Verify EMAIL_USER and EMAIL_APP_PASSWORD in .env');
        console.log('- For Gmail, ensure 2-Step Verification is enabled');
        console.log('- For Gmail, use App Password not regular password');
        console.log('- Check your internet connection');
        console.log('- See EMAIL_SETUP_GUIDE.md for detailed setup\n');
        process.exit(1);
    });
