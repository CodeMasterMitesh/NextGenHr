import { Router } from 'express';
import ModuleController from '../../controller/Module.js';
import mongoose from 'mongoose';

const router = Router();

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  const { id, softwareId } = req.params;
  const idToValidate = id || softwareId;
  
  if (!mongoose.Types.ObjectId.isValid(idToValidate)) {
    console.log(`Invalid ObjectId attempted: "${idToValidate}" on path: ${req.path}`);
    return res.status(400).json({
      success: false,
      message: `Invalid ID format: ${idToValidate}`
    });
  }
  next();
};

// Get all modules
router.get('/modules', ModuleController.getAll);

// Get modules by software ID (must be before /:id route)
router.get('/modules/software/:softwareId', validateObjectId, ModuleController.getBySoftwareId);

// Toggle module status (must be before /:id route to avoid conflicts)
router.patch('/modules/:id/toggle-status', validateObjectId, ModuleController.toggleStatus);

// Get single module
router.get('/modules/:id', validateObjectId, ModuleController.getById);

// Create module
router.post('/modules', ModuleController.create);

// Update module
router.put('/modules/:id', validateObjectId, ModuleController.update);

// Delete module
router.delete('/modules/:id', validateObjectId, ModuleController.delete);

export default router;