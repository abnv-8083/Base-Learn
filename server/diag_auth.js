const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './.env' });

const diag = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const admin = await Admin.findOne({ email: 'admin@baselearn.com' });
        if (!admin) {
            console.log('❌ Admin NOT FOUND');
        } else {
            console.log('✅ Admin FOUND');
            console.log('Email:', admin.email);
            console.log('Role:', admin.role);
            console.log('Is Active:', admin.isActive);
            
            const isMatch = await bcrypt.compare('Admin@123', admin.password);
            console.log('Password Match (Admin@123):', isMatch);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

diag();
