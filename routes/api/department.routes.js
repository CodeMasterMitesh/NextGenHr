import express from 'express';
import {
    storeDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
} from '../../controller/Department.js';

const router = express.Router();

// Create
router.post('/departments', storeDepartment);

// Read
router.get('/departments', getDepartments);
router.get('/departments/:id', getDepartmentById);

// Update
router.put('/departments/:id', updateDepartment);

// Delete
router.delete('/departments/:id', deleteDepartment);

export default router;