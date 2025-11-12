const mongoose = require('mongoose');

const attendanceAiLogSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  camera_id: String,
  face_detected_at: Date,
  confidence_score: Number,
  status: { type: String, enum: ['Recognized', 'Unrecognized'] },
  image_url: String
});

module.exports = mongoose.model('AttendanceAiLog', attendanceAiLogSchema);
