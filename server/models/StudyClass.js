const mongoose = require('mongoose');

const studyClassSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    targetGrade: { 
        type: String, 
        required: true,
        trim: true
    },
    instructor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Instructor', 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('StudyClass', studyClassSchema);
