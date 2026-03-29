const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, enum: ['alert', 'info', 'reminder'], default: 'info' },
  recipient: { type: String, required: true }, // Can be 'all', 'batch_<batchId>', or specific User ID
  sender: { type: mongoose.Schema.Types.ObjectId, required: true },
  dismissedBy: [{ type: mongoose.Schema.Types.ObjectId }]
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
