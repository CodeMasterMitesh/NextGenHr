import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  emp_code: { type: String, required: true, unique: true },
  first_name: String,
  last_name: String,
  gender: String,
  dob: Date,
  contact_number: String,
  email: { type: String, required: true, unique: true },
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  designation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation' },
  company_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  join_date: Date,
  employment_type: { type: String},
  reporting_manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  address: {
    line1: String,
    city: String,
    state: String,
    pincode: String
  },
  photo_url: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  last_login: Date,
  status: { type: String, enum: ['probation','resigned','terminated','confirmed'], default: 'probation' },
  type : { type: String, enum: ['admin','employee'], default: 'employee' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);

