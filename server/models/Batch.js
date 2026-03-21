const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studyClass: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyClass', required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    capacity: { type: Number, default: 30 }
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);
