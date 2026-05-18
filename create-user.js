const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createUser() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('Candla.2025!', 10);
    
    // Create user with business and subscription
    const user = await prisma.user.create({
      data: {
        email: 'kaylloh09@gmail.com',
        name: 'Obed',
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date(),
        business: {
          create: {
            name: 'CandlePilots',
            subscription: {
              create: {
                plan: 'premium',
                status: 'active',
                stripeCurrentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
              }
            }
          }
        }
      },
      include: {
        business: {
          include: {
            subscription: true
          }
        }
      }
    });

    console.log('✅ User created successfully!');
    console.log('📧 Email:', user.email);
    console.log('🔑 Password: Candla.2025!');
    console.log('👤 Role:', user.role);
    console.log('🏢 Business:', user.business.name);
    console.log('💎 Subscription:', user.business.subscription.plan, '-', user.business.subscription.status);
    console.log('\n🌐 Login at: https://www.candlepilots.com/sign-in');
    
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
