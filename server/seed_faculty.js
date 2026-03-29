require('dotenv').config();
const mongoose = require('mongoose');
const Faculty = require('./models/Faculty');
const Notification = require('./models/Notification');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    try {
        const existing = await Faculty.findOne({ email: 'faculty@gmail.com' });
        if (existing) await Faculty.deleteOne({ email: 'faculty@gmail.com' });

        const fac = new Faculty({
            name: 'Demo Faculty',
            email: 'faculty@gmail.com',
            password: 'password123',
            role: 'faculty',
            phone: '9876543210',
            district: 'Ernakulam',
            qualification: 'M.Tech',
            experience: '5 Years',
            profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop'
        });
        await fac.save();

        const admin = await Admin.findOne({});
        const senderId = admin ? admin._id.toString() : fac._id.toString();

        await Notification.create({
            message: 'Welcome to Base Learn! Your faculty profile has been set up securely. Details: Name: Demo Faculty | Email: faculty@gmail.com | Phone: 9876543210 | District: Ernakulam | Qualification: M.Tech | Experience: 5 Years | ',
            type: 'info',
            recipient: fac._id.toString(),
            sender: senderId
        });

        console.log('Successfully created faculty@gmail.com');
    } catch(err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
});
