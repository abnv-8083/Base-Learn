require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const seedAdmin = async () => {
  await connectDB();

  const email = 'admin@baselearn.com';
  const existing = await User.findOne({ email });

  if (existing) {
    console.log('ℹ️  Admin already exists:', email);
    process.exit(0);
  }

  const admin = await User.create({
    name: 'Super Admin',
    email,
    password: 'Admin@123',
    role: 'admin',
    isVerified: true,
    isActive: true,
  });

  console.log('✅ Demo admin created!');
  console.log('   Email   :', admin.email);
  console.log('   Password: Admin@123');
  process.exit(0);
};

seedAdmin().catch(err => { console.error(err); process.exit(1); });
