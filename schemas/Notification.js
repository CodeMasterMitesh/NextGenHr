const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: { type: String, enum: ['email', 'sms', 'whatsapp'] },
  recipient: String,
  subject: String,
  message: String,
  status: { type: String, enum: ['Pending', 'Sent', 'Failed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
