import { ObjectId } from 'mongodb';
const storeJobVacance = (req, res, db) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        // console.log('Received data:', body);
        // convert body to JSON
        const jobVacancyData = JSON.parse(body);

        // access collection
        const jobVacancyCollection = await db.collection('jobApplications');

        // Insert the job vacancy data into the collection
        await jobVacancyCollection.insertOne(jobVacancyData);
        // console.log('Job Data:', jobVacancyData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Job vacancy stored successfully' }));
    });
}

const getApplications = async (req, res, db) => {
    const getjobdata = await db.collection('jobApplications').find({}).toArray();
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(getjobdata));

}

const getSingleJobAppData = (req, res, db) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const { id } = JSON.parse(body);
        console.log('Requested ID:', id);
        const getSinglejobdata = await db.collection('jobApplications').findOne({ _id: new ObjectId(id) });
        console.log('Single Job Data ', getSinglejobdata);
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(getSinglejobdata));
    });
}

const updateJobApplication = (req, res, db) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const updateJobAppData = JSON.parse(body);
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
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Job vacancyData updated successfully' }));
        } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Failed to update job vacancyData' }));
        }

    });
}

const deleteJobAppData = (req, res, db) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        const jobId = JSON.parse(body).id;
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

}

const  JobApplication = {
    storeJobVacance,
    getApplications,
    getSingleJobAppData,
    updateJobApplication,
    deleteJobAppData
}
export default JobApplication;