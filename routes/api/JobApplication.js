import { MongoClient, ObjectId } from 'mongodb';
import Router from 'express';
import { dbSetup } from '../../db.js';
const router = Router();

dbSetup.client.connect().then(() => {
    console.log("Connected successfully to MongoDB server");
}).catch(err => {
    console.error("Failed to connect to MongoDB server:", err);
});

const db = dbSetup.client.db(dbSetup.dbName);

router.post('/storeJobVacancy', async (req, res) => {
    try {
        const jobVacancyData = req.body;
        const jobVacancyCollection = db.collection('jobApplications');
        await jobVacancyCollection.insertOne(jobVacancyData);
        res.status(200).json({ message: 'Job application stored successfully', success: true });
    } catch (err) {
        console.error('storeJobVacancy error:', err);
        res.status(500).json({ message: 'Failed to store job application', success: false });
    }
});

router.get('/getApplications', async (req, res) => {
    try {
        const getjobdata = await db.collection('jobApplications').find({}).toArray();
        res.status(200).json(getjobdata);
    } catch (err) {
        console.error('getApplications error:', err);
        res.status(500).json({ message: 'Failed to fetch applications' });
    }
});

router.get('/getSingleJobAppData/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const getSinglejobdata = await db.collection('jobApplications').findOne({ _id: new ObjectId(id) });
        res.status(200).json(getSinglejobdata);
    } catch (err) {
        console.error('getSingleJobAppData error:', err);
        res.status(500).json({ message: 'Failed to fetch job application' });
    }
});

router.post('/getSingleJobAppData', async (req, res) => {
    try {
        const id = req.body.id;
        const getSinglejobdata = await db.collection('jobApplications').findOne({ _id: new ObjectId(id) });
        res.status(200).json(getSinglejobdata);
    } catch (err) {
        console.error('getSingleJobAppData error:', err);
        res.status(500).json({ message: 'Failed to fetch job application' });
    }
});

router.put('/updateJobApplication/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateJobAppData = req.body;
        const jobVacancyCollection = await db.collection('jobApplications');
        const updateResult = await jobVacancyCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateJobAppData }
        );
        if (updateResult.modifiedCount === 1) {
            res.status(200).json({ message: 'Job application updated successfully', success: true });
        } else {
            res.status(200).json({ message: 'No changes made', success: true });
        }
    } catch (err) {
        console.error('updateJobApplication error:', err);
        res.status(500).json({ message: 'Failed to update job application', success: false });
    }
});

router.put('/updateJobApplication', async (req, res) => {
    try {
        const updateJobAppData = req.body;
        const jobVacancyCollection = await db.collection('jobApplications');
        const updateResult = await jobVacancyCollection.updateOne(
            { _id: new ObjectId(updateJobAppData.id) },
            {
                $set: {
                    name: updateJobAppData.name,
                    email: updateJobAppData.email,
                    phone: updateJobAppData.phone,
                    position: updateJobAppData.position,
                    resume: updateJobAppData.resume
                }
            }
        );
        if (updateResult.modifiedCount === 1) {
            res.status(200).json({ message: 'Job application updated successfully', success: true });
        } else {
            res.status(200).json({ message: 'No changes made', success: true });
        }
    } catch (err) {
        console.error('updateJobApplication error:', err);
        res.status(500).json({ message: 'Failed to update job application', success: false });
    }
});

router.delete('/deleteJobAppData/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        const result = await db.collection('jobApplications').deleteOne({ _id: new ObjectId(jobId) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Job application deleted successfully', success: true });
        } else {
            res.status(404).json({ message: 'Job application not found', success: false });
        }
    } catch (err) {
        console.error('deleteJobAppData error:', err);
        res.status(500).json({ message: 'Failed to delete job application', success: false });
    }
});

router.delete('/deleteJobAppData', async (req, res) => {
    try {
        const jobId = req.body.id;
        const result = await db.collection('jobApplications').deleteOne({ _id: new ObjectId(jobId) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Job application deleted successfully', success: true });
        } else {
            res.status(404).json({ message: 'Job application not found', success: false });
        }
    } catch (err) {
        console.error('deleteJobAppData error:', err);
        res.status(500).json({ message: 'Failed to delete job application', success: false });
    }
});

export default router;