const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema(
  {
    to: { type: String, required: true, index: true },
    subject: { type: String, required: true },
    templateName: { type: String, default: 'custom' },
    data: { type: mongoose.Schema.Types.Mixed },   // template variables
    status: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
      index: true,
    },
    messageId: String,
    error: String,
    sentAt: Date,
    createdAt: { type: Date, default: Date.now, expires: '30d' }, // auto‑delete after 30 days
  },
  { timestamps: true }
);

// Avoid recompiling model on hot reloads in dev
module.exports = mongoose.models.EmailLog || mongoose.model('EmailLog', emailLogSchema);