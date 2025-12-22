import express from 'express';
import Router from 'express';
import { AuthLogin } from '../controller/Auth.js';
import { storeBranch, getCompanyWiseBranch, getBranch, getBranchById, updateBranch, deleteBranch } from '../controller/Branch.js';
const router = Router();

router.post('/login',AuthLogin);
router.post('/storeBranch',storeBranch);
router.get('/getCompanyWiseBranch/:companyId',getCompanyWiseBranch);
router.get('/getBranch',getBranch);
router.get('/getBranch/:id',getBranchById);
router.put('/updateBranch/:id', updateBranch);
router.delete('/deleteBranch/:id', deleteBranch);

export default router;