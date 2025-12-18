const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  month: String,
  gross_salary: Number,
  deductions: Number,
  net_salary: Number,
  status: { type: String, enum: ['Processed', 'Pending'], default: 'Pending' },
  processed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Payroll', payrollSchema);
