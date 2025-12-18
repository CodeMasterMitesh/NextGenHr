const mongoose = require('mongoose');

const payslipSchema = new mongoose.Schema({
  payroll_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Payroll' },
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  file_url: String,
  generated_at: Date
});

module.exports = mongoose.model('Payslip', payslipSchema);
