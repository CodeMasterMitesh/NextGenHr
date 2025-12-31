import mongoose from 'mongoose';
import moduleSchema from '../schemas/Module.js';

const Module = mongoose.model('Module', moduleSchema);

export default Module;
