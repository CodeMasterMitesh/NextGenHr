import express from 'express';
import { storeEmployee, getEmployees, getEmployee, getLastEmployees, updateEmployee, deleteEmployee } from '../../controller/User.js';
const router = express.Router();

router.post('/storeEmployee', storeEmployee);
router.get('/getEmployees', getEmployees);
router.get('/getEmployee/:id', getEmployee);
router.get('/getLastEmployees', getLastEmployees);
router.put('/updateEmployee/:id', updateEmployee);
router.delete('/deleteEmployee/:id', deleteEmployee);

export default router;