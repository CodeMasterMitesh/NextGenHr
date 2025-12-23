import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  name: { type: String, required: [true, 'Branch name is required'], unique: true, },
  address1 : {type : String },
  address2 : {type : String },
  city : {type : String },
  state : {type : String },
  pincode : {type : String },
  contact_number : {type : String },
  email : {type : String, required: true, unique: true },
  logo : {type : String }
}, { timestamps: true });

export default mongoose.model('Branch', branchSchema);