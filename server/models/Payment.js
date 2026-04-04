const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    student:       { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    amount:        { type: Number, required: true },
    currency:      { type: String, default: 'INR' },
    method:        { type: String, enum: ['cash', 'upi', 'bank_transfer', 'cheque', 'online', 'other'], default: 'cash' },
    status:        { type: String, enum: ['paid', 'pending', 'partial', 'refunded'], default: 'paid' },
    category:      { type: String, enum: ['tuition', 'registration', 'exam', 'material', 'other'], default: 'tuition' },
    remarks:       { type: String },
    transactionId: { type: String },
    receiptNo:     { type: String },
    paidAt:        { type: Date, default: Date.now },
    recordedBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    dueDate:       { type: Date },
}, { timestamps: true });

// Auto-generate receipt number
paymentSchema.pre('save', async function () {
    if (this.isNew && !this.receiptNo) {
        const count = await this.constructor.countDocuments();
        this.receiptNo = `BL-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
    }
});

module.exports = mongoose.model('Payment', paymentSchema);
