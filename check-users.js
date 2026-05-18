const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        business: {
          include: {
            subscription: true
          }
        }
      }
    });
    
    console.log('=== USERS IN DATABASE ===');
    console.log(`Total users: ${users.length}\n`);
    
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`);
      console.log(`  ID: ${user.id}`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Has Password: ${user.password ? 'Yes' : 'No'}`);
      console.log(`  Created: ${user.createdAt}`);
      if (user.business) {
        console.log(`  Business: ${user.business.name}`);
        if (user.business.subscription) {
          console.log(`  Plan: ${user.business.subscription.plan}`);
          console.log(`  Status: ${user.business.subscription.status}`);
        }
      }
      console.log('---');
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
