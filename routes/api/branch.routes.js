import Router from 'express';
import { storeBranch, getCompanyWiseBranch, getBranch, getBranchById, updateBranch, deleteBranch } from '../../controller/Branch.js';
const router = Router();

router.post('/storeBranch',storeBranch);
router.get('/getCompanyWiseBranch/:companyId',getCompanyWiseBranch);
router.get('/getBranch',getBranch);
router.get('/getBranch/:id',getBranchById);
router.put('/updateBranch/:id', updateBranch);
router.delete('/deleteBranch/:id', deleteBranch);

export default router;