import express from 'express';
import Router from 'express';
import { AuthLogin } from '../controller/Auth.js';
import { storeBranch,getCompanyWiseBranch,getBranch,getBranchById} from '../controller/Branch.js';
const router = Router();

router.post('/login',AuthLogin);
router.post('/storeBranch',storeBranch);
router.get('/getCompanyWiseBranch/:companyId',getCompanyWiseBranch);
router.get('/getBranch',getBranch);
router.get('/getBranch/:id',getBranchById);

export default router;