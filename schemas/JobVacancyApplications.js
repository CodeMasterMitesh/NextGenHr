// NextGenHr
import mongoose from 'mongoose';

const JobVacancyApplications = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  department : { type: mongoose.Schema.Types.ObjectId, ref: 'Departments' },
  designation: { type: mongoose.Schema.Types.ObjectId, ref: 'Designations' },
  position : { type: String, required: true },
  resume: { type: String },
  appliedAt: { type: Date, default: Date.now },  
  approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  status: { type: String, enum: ['applied', 'shortlisted', 'rejected', 'selected'], default: 'applied' }
}, { timestamps: true });

export default mongoose.model('JobVacancyApplications', JobVacancyApplications);