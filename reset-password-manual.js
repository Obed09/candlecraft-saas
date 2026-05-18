const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function createResetToken() {
  try {
    const email = 'kaylloh09@gmail.com';
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      console.log('User not found');
      return;
    }
    
    console.log('Found user:', user.email);
    
    // Delete any existing reset tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email }
    });
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    
    // Store hashed token
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: hashedToken,
        expires: resetTokenExpiry,
      },
    });
    
    // Generate reset URL
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}&email=${email}`;
    
    console.log('\n✅ Password reset token created!');
    console.log('\n🔗 RESET PASSWORD URL:');
    console.log(resetUrl);
    console.log('\nThis link expires in 1 hour.');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createResetToken();
