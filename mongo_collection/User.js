const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  last_login: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
