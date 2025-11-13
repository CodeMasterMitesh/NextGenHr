const mongoose = require('mongoose');

const performanceReviewSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  review_period: String,
  ratings: {
    punctuality: Number,
    teamwork: Number,
    communication: Number,
    performance: Number
  },
  comments: String,
  reviewed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
}, { timestamps: true });

module.exports = mongoose.model('PerformanceReview', performanceReviewSchema);
