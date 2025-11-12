const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Designation', designationSchema);
