// C:\Users\jafar\Desktop\ta3awon\lib\email-verification.js
export async function sendVerificationEmail(email, code, firstName) {
  // In production, use a service like SendGrid, Resend, or Nodemailer
  console.log(`Verification email sent to ${email}`);
  console.log(`Verification code: ${code}`);
  console.log(`Dear ${firstName}, please verify your email with code: ${code}`);
  
  // For development, just return true
  return true;
}