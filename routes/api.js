import express from 'express';
import Router from 'express';
import { AuthLogin } from '../controller/Auth.js';
import { storeBranch,getCompanyWiseBranch } from '../controller/Branch.js';
const router = Router();

router.post('/login',AuthLogin);
router.post('/storeBranch',storeBranch);
router.get('/getCompanyWiseBranch/:companyId',getCompanyWiseBranch);

export default router;