import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    default: 'bi-circle'
  },
  route: {
    type: String,
    required: true,
    trim: true
  },
  softwareId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Software',
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    trim: true
  },
  permissions: [{
    type: String,
    trim: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
moduleSchema.index({ softwareId: 1, order: 1, isActive: 1 });
moduleSchema.index({ route: 1 });

export default moduleSchema;
