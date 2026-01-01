// C:\Users\jafar\Desktop\ta3awon\lib\password-reset-email.js
export async function sendPasswordResetEmail(email, code, firstName) {
  console.log(`Password reset email sent to ${email}`);
  console.log(`Reset code: ${code}`);
  console.log(`Dear ${firstName}, use this code to reset your password: ${code}`);
  
  // For development, just return true
  return true;
}
