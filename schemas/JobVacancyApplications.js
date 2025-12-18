// NextGenHr
const mongoose = require('mongoose');

const JobVacancyApplications = new mongoose.Schema({
  name: String,
  email: String,
  department : { type: mongoose.Schema.Types.ObjectId, ref: 'Departments' },
  designation: { type: mongoose.Schema.Types.ObjectId, ref: 'Designations' },
  position : String,
  resume: String,
  appliedAt: { type: Date, default: Date.now },  
  approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
}, { timestamps: true });

module.exports = mongoose.model('JobVacancyApplications', JobVacancyApplications);