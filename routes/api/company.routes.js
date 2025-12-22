import express from 'express';
import { storeCompany, getCompanyData, getCompany, updateCompany, deleteCompany } from '../../controller/Company.js';
const router = express.Router();

router.post('/storeCompany', storeCompany);
router.get('/getCompanyData', getCompanyData);
router.get('/getCompany/:id', getCompany);
router.put('/updateCompany/:id', updateCompany);
router.delete('/deleteCompany/:id', deleteCompany);

export default router;