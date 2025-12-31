import mongoose from 'mongoose';
import softwareSchema from '../schemas/Software.js';

const Software = mongoose.model('Software', softwareSchema);

export default Software;
