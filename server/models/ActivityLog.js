const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    actor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    actorName: { type: String },      // denormalized for fast reads
    actorRole: { type: String },
    action: { type: String, required: true }, // e.g. 'Uploaded Video', 'Added Student Note'
    target: { type: String },                 // e.g. 'Student: Arjun Kumar'
    targetId: { type: mongoose.Schema.Types.ObjectId },
    targetModel: { type: String },            // e.g. 'User', 'RecordedClass', 'Chapter'
    details: { type: mongoose.Schema.Types.Mixed }, // any extra payload
    ipAddress: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
