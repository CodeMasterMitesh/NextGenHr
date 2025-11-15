const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  check_in: String,
  check_out: String,
  status: { type: String, enum: ['Present', 'Absent', 'Leave'], default: 'Present' },
  source: { type: String, enum: ['AI', 'Manual', 'Biometric'] },
  worked_hours: Number,
  remarks: String
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
