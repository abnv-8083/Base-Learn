const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' },
    studentId: { type: String },
    studentClass: { type: String },
    school: { type: String },
    parentName: { type: String },
    parentPhone: { type: String },
    phone: { type: String },
    countryCode: { type: String, default: '+91' },
    dob: { type: Date },
    district: { type: String },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
    profilePhoto: { type: String, default: '' },
    instructorNotes: [{
        note: { type: String },
        date: { type: Date, default: Date.now }
    }],
    isActive: { type: Boolean, default: true },
    hasPaid: { type: Boolean, default: false }
}, { timestamps: true });

studentSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Student', studentSchema);
