const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  fileUrl: { type: String, required: true }, // The test PDF/document
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }],
  deadline: { type: Date },
  maxMarks: { type: Number, default: 100 },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  isMain: { type: Boolean, default: false },
  publishedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);
