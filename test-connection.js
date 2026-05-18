require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('DIRECT_URL:', process.env.DIRECT_URL);

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('\n✅ Database connection successful!');
    
    const users = await prisma.user.findMany();
    console.log(`\nFound ${users.length} users in database`);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('\n❌ Database connection failed:');
    console.error(error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

testConnection();
