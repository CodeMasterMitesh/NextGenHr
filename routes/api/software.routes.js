import { Router } from 'express';
import SoftwareController from '../../controller/Software.js';
import mongoose from 'mongoose';

const router = Router();

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  // Check if this is actually a special keyword, not an ID
  if (id === 'management') {
    // This shouldn't happen if routes are ordered correctly, but just in case
    return next('route'); // Skip to next route definition
  }
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(`Invalid ObjectId attempted: "${id}" on path: ${req.path}`);
    return res.status(400).json({
      success: false,
      message: `Invalid ID format: ${id}`
    });
  }
  next();
};

// Get all software with modules (for sidebar)
router.get('/software', SoftwareController.getAll);

// Get all software for management - use query parameter to avoid :id conflict
router.get('/software', (req, res, next) => {
  if (req.query.list === 'all') {
    return SoftwareController.getAllForManagement(req, res);
  }
  next();
});

// Create software
router.post('/software', SoftwareController.create);

// Toggle software status - MUST be before /:id
router.patch('/software/:id/toggle-status', validateObjectId, SoftwareController.toggleStatus);

// Get single software by ID
router.get('/software/:id', validateObjectId, SoftwareController.getById);

// Update software
router.put('/software/:id', validateObjectId, SoftwareController.update);

// Delete software
router.delete('/software/:id', validateObjectId, SoftwareController.delete);

export default router;

