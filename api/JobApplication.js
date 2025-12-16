import { MongoClient, ObjectId } from 'mongodb';
import Router from 'express';
import { dbSetup } from '../db.js';
const router = Router();

dbSetup.client.connect().then(() => {  // Connect to MongoDB
    console.log("Connected successfully to MongoDB server");
}).catch(err => {
    console.error("Failed to connect to MongoDB server:", err);
});

const db = dbSetup.client.db(dbSetup.dbName);

router.post('/storeJobVacancy', (req, res) => {
    const jobVacancyData = req.body;
    console.log('Job Vacancy Data Received:', jobVacancyData);
    // access collection
    const jobVacancyCollection = db.collection('jobApplications');
    // Insert the job vacancy data into the collection
    jobVacancyCollection.insertOne(jobVacancyData);

    res.redirect('/viewJobpost.html');
});

router.get('/getApplications', async (req, res) => {
    const getjobdata = await db.collection('jobApplications').find({}).toArray();
    // console.log('Job Application Data Retrieved:', getjobdata);
    res.send(getjobdata);
});

router.post('/getSingleJobAppData', async (req, res) => {
    console.log('Request Body:', req.body);
    const id = req.body.id;
    console.log('Requested ID:', id);
    const getSinglejobdata = await db.collection('jobApplications').findOne({ _id: new ObjectId(id) });
    console.log('Single Job Data ', getSinglejobdata);
    res.send(getSinglejobdata);
});

router.put('/updateJobApplication', async (req, res) => {
        console.log('Update Job Application Request Body:', req.body);
        const updateJobAppData = req.body;
        console.log('Update Job Application Data:', updateJobAppData);
        const jobVacancyCollection = await db.collection('jobApplications');

        // update the job vacancy data into the collection
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
        )
        if (updateResult.modifiedCount === 1) {
            res.status(200).send(JSON.stringify({ message: 'Job vacancyData updated successfully' }));
        } else {
            res.status(500).send(JSON.stringify({ message: 'Failed to update job vacancyData' }));
        }
});

router.delete('/deleteJobAppData', async (req, res) => {
    const jobId = req.body.id;
    // console.log('Delete Job Application ID:', jobId);
    const result = await db.collection('jobApplications').deleteOne({ _id: new ObjectId(jobId) });
    if (result.deletedCount === 1) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Job Application deleted successfully' }));
    } else {
        res.writeHead(500, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Failed to delete Job Application' }));
    }

});
export default router;