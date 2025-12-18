const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address1 : {type : String },
  address2 : {type : String },
  city : {type : String },
  state : {type : String },
  pincode : {type : String },
  contact_number : {type : String },
  email : {type : String, required: true, unique: true },
  gst_number : {type : String },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);