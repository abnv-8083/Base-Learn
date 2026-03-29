const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const checkAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const admin = await Admin.findOne({});
    if (admin) {
        console.log('Admin found:', admin.email);
        admin.password = 'admin123';
        await admin.save();
        console.log('Admin password reset to: admin123');
    } else {
        console.log('No admin found. Creating one...');
        await Admin.create({
            name: 'Super Admin',
            email: 'admin@baselearn.com',
            password: 'adminpassword', // This will be hashed by the model pre-save hook
            role: 'admin'
        });
        console.log('Admin created: admin@baselearn.com / adminpassword');
    }
    process.exit();
};

checkAdmin();
