import JobVacancyApplications from "../models/JobVacancyApplications.js";

const storeJobVacancy = async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    try {
        const jobVacancyData = req.body;
        
        // Add the uploaded file path to the job vacancy data
        if (req.file) {
            jobVacancyData.resume = req.file.path;
        }
        
        const newJobVacancy = new JobVacancyApplications(jobVacancyData);
        await newJobVacancy.save();
        res.status(200).json({ message: 'Job application stored successfully', success: true });
    } catch (err) {
        console.error('storeJobVacancy error:', err);
        res.status(500).json({ message: 'Failed to store job application', success: false });
    }
};

const getApplications = async (req, res) => {
    try {
        const getjobdata = await JobApp.find({});
        console.log(getjobdata);
        res.status(200).json(getjobdata);
    } catch (err) {
        console.error('getApplications error:', err);
        res.status(500).json({ message: 'Failed to fetch applications' });
    }
};

const getSingleJobAppData = async (req, res) => {
    try {
        const id = req.params.id;
        const getSinglejobdata = await JobVacancyApplications.findById(id);
        res.status(200).json(getSinglejobdata);
    } catch (err) {
        console.error('getSingleJobAppData error:', err);
        res.status(500).json({ message: 'Failed to fetch job application' });
    }
};

const getSingleJobAppDataByPost = async (req, res) => {
    try {
        const id = req.body.id;
        const getSinglejobdata = await JobVacancyApplications.findById(id);
        res.status(200).json(getSinglejobdata);
    } catch (err) {
        console.error('getSingleJobAppData error:', err);
        res.status(500).json({ message: 'Failed to fetch job application' });
    }
};

const updateJobApplicationById = async (req, res) => {
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
};

const updateJobApplication = async (req, res) => {
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
};

const deleteJobAppDataById = async (req, res) => {
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
};

const deleteJobAppData = async (req, res) => {
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
};

export {
    storeJobVacancy,
    getApplications,
    getSingleJobAppDataByPost,
    updateJobApplicationById,
    updateJobApplication,
    deleteJobAppDataById,
    deleteJobAppData
};