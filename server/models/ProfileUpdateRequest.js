const mongoose = require('mongoose');

const profileUpdateRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'userModel' },
    userModel: { type: String, required: true, enum: ['Instructor', 'Faculty', 'Student'] },
    type: { type: String, enum: ['email', 'password'], required: true },
    newValue: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('ProfileUpdateRequest', profileUpdateRequestSchema);
