const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  emp_code: { type: String, required: true, unique: true },
  first_name: String,
  last_name: String,
  gender: String,
  dob: Date,
  contact_number: String,
  email: { type: String, required: true, unique: true },
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  designation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation' },
  branch_id: { type: mongoose.Schema.Types.ObjectId },
  join_date: Date,
  employment_type: { type: String, enum: ['Full-Time', 'Part-Time', 'Intern', 'Contract'] },
  reporting_manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  address: {
    line1: String,
    city: String,
    state: String,
    pincode: String
  },
  photo_url: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
