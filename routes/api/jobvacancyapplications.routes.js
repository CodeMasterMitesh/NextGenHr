import express from 'express';
import { storeJobVacancy, getApplications, getSingleJobAppDataByPost, updateJobApplicationById, updateJobApplication,deleteJobAppDataById,deleteJobAppData } from '../../controller/JobVacancyApplications.js';
const router = express.Router();

router.post('/storeJobVacancy', storeJobVacancy);
router.get('/getApplications', getApplications);
router.get('/getSingleJobAppData/:id', getSingleJobAppDataByPost);
router.put('/updateJobApplication/:id', updateJobApplicationById);
router.delete('/deleteJobApplication/:id', deleteJobAppDataById);
router.put('/updateJobApplication', updateJobApplication);
router.delete('/deleteJobApplication', deleteJobAppData);

export default router;