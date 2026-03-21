const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }],
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
