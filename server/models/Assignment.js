const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  fileUrl: { type: String }, // For direct file uploads
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  isMain: { type: Boolean, default: false },
  batchId: { type: String },
  assignedBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }],
  assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudyClass' }],
  assignedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  deadline: { type: Date, required: true },
  maxMarks: { type: Number, default: 100 },
  allowedFileTypes: [{ type: String, default: ['pdf'] }], // e.g. 'pdf', 'docx'
  submissions: [
    {
      studentId: { type: String, required: true }, // Clerk User ID
      fileUrl: { type: String, required: true },
      submittedAt: { type: Date, default: Date.now },
      isLate: { type: Boolean, default: false },
      marks: { type: Number },
      feedback: { type: String },
      gradedAt: { type: Date }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
