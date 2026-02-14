// Test Database Connection
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  try {
    // Try to connect to database
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    console.log('✅ Connected to: ai_career_coach database');
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ PostgreSQL version:', result[0].version.split(' ')[0], result[0].version.split(' ')[1]);
    
    console.log('\n🎉 Your database is configured correctly!');
    console.log('📝 Next step: Run "npx prisma db push" to create tables');
    
  } catch (error) {
    console.log('❌ Database connection failed!\n');
    
    if (error.message.includes('password authentication failed')) {
      console.log('🔐 Error: Wrong password');
      console.log('💡 Solution: Update DATABASE_URL in .env file with correct password');
      console.log('   Current: DATABASE_URL="postgresql://postgres:priyanshu12@localhost:5432/ai_career_coach?schema=public"');
    } else if (error.message.includes('database "ai_career_coach" does not exist')) {
      console.log('🗄️  Error: Database does not exist');
      console.log('💡 Solution: Create the database first:');
      console.log('   psql -U postgres');
      console.log('   CREATE DATABASE ai_career_coach;');
      console.log('   \\q');
    } else if (error.message.includes('connect ECONNREFUSED')) {
      console.log('🔌 Error: Cannot connect to PostgreSQL server');
      console.log('💡 Solution: Make sure PostgreSQL is running:');
      console.log('   - Check Services: postgresql-x64-18');
      console.log('   - Or run: net start postgresql-x64-18');
    } else {
      console.log('❌ Error:', error.message);
    }
    
    console.log('\n📚 For detailed help, see: DATABASE_SETUP_GUIDE.md');
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
