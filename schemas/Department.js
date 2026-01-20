import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  branch_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  description: String
}, { timestamps: true });

export default mongoose.model('Department', departmentSchema);
