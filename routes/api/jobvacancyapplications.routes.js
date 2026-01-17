import express from 'express';
import multer from 'multer';
import { storeJobVacancy, getApplications, getSingleJobAppDataByPost, updateJobApplicationById, updateJobApplication,deleteJobAppDataById,deleteJobAppData } from '../../controller/JobVacancyApplications.js';
const router = express.Router();

const storage = multer.diskStorage({
 destination: (req, file, cb) => {
   cb(null, 'public/uploads/');
 },
 filename: (req, file, cb) => {
   cb(null, Date.now() + '-' + file.originalname);
 }
});
const upload = multer({
 storage: storage,
 limits: { fileSize: 10 * 1024 * 1024 }
});
router.post('/storeJobVacancy',upload.single('resume'), storeJobVacancy);
router.get('/getApplications', getApplications);
router.get('/getSingleJobAppData/:id', getSingleJobAppDataByPost);
router.put('/updateJobApplication/:id', updateJobApplicationById);
router.delete('/deleteJobApplication/:id', deleteJobAppDataById);
router.put('/updateJobApplication', updateJobApplication);
router.delete('/deleteJobApplication', deleteJobAppData);

export default router;