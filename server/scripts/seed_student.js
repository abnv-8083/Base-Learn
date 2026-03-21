require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const StudyClass = require('../models/StudyClass');
const Batch = require('../models/Batch');

const seedTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    const email = 'primeheaven.org@gmail.com';
    let user = await User.findOne({ email });

    if (!user) {
      console.log('User not found. Creating test student...');
      user = new User({
        name: 'Test Student',
        email: email,
        password: 'password123',
        role: 'student',
        studentClass: '10',
        isVerified: true,
        isActive: true
      });
      await user.save();
      console.log('Test student created successfully. Password is: password123');
    } else {
      console.log('User found! Forcing password reset to: password123, ensuring verified status.');
      user.password = 'password123';
      user.isVerified = true;
      user.isActive = true;
      await user.save();
    }

    // Attempt to auto-assign batch so dashboard gets data
    const allBatches = await Batch.find({});
    if (allBatches.length > 0) {
      const b = allBatches[0];
      if (!b.students.includes(user._id)) {
        await Batch.updateOne({ _id: b._id }, { $push: { students: user._id } });
        console.log(`Assigned student to Batch: ${b.name}`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding test user:', error);
    process.exit(1);
  }
};

seedTestUser();
