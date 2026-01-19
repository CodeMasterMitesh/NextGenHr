import JobVacancyApplications from "../models/JobVacancyApplications.js";
import fs from 'fs';
import path from 'path';

// Create new job application
const storeJobVacancy = async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    try {
        const jobVacancyData = req.body;
        
        // Add the uploaded file path to the job vacancy data
        if (req.file) {
            // Remove 'public/' prefix since Express serves public as root
            jobVacancyData.resume = req.file.path.replace(/\\/g, '/').replace('public/', '');
        }
        
        const newJobVacancy = new JobVacancyApplications(jobVacancyData);
        await newJobVacancy.save();
        res.status(200).json({ message: 'Job application stored successfully', success: true });
    } catch (err) {
        console.error('storeJobVacancy error:', err);
        res.status(500).json({ message: 'Failed to store job application', success: false, error: err.message });
    }
};

// Get all applications with pagination
const getApplications = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';
        
        // Build search query
        const searchQuery = search ? {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ]
        } : {};
        
        const totalApplications = await JobVacancyApplications.countDocuments(searchQuery);
        const applications = await JobVacancyApplications.find(searchQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
        
        res.status(200).json({
            success: true,
            data: applications,
            pagination: {
                total: totalApplications,
                page: page,
                limit: limit,
                totalPages: Math.ceil(totalApplications / limit)
            }
        });
    } catch (err) {
        console.error('getApplications error:', err);
        res.status(500).json({ message: 'Failed to fetch applications', success: false, error: err.message });
    }
};

// Get single application by ID (GET method)
const getSingleJobAppData = async (req, res) => {
    try {
        const id = req.params.id;
        const application = await JobVacancyApplications.findById(id)
            .populate('department', 'name')
            .populate('designation', 'name')
            .lean();
            
        if (!application) {
            return res.status(404).json({ message: 'Application not found', success: false });
        }
        
        res.status(200).json({ success: true, data: application });
    } catch (err) {
        console.error('getSingleJobAppData error:', err);
        res.status(500).json({ message: 'Failed to fetch job application', success: false, error: err.message });
    }
};

// Get single application by ID (POST method)
const getSingleJobAppDataByPost = async (req, res) => {
    try {
        const id = req.body.id;
        const application = await JobVacancyApplications.findById(id)
            .populate('department', 'name')
            .populate('designation', 'name')
            .lean();
            
        if (!application) {
            return res.status(404).json({ message: 'Application not found', success: false });
        }
        
        res.status(200).json({ success: true, data: application });
    } catch (err) {
        console.error('getSingleJobAppData error:', err);
        res.status(500).json({ message: 'Failed to fetch job application', success: false, error: err.message });
    }
};

// Update application by ID (with file upload support)
const updateJobApplicationById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateJobAppData = req.body;
        
        // Find existing application
        const existingApp = await JobVacancyApplications.findById(id);
        if (!existingApp) {
            return res.status(404).json({ message: 'Application not found', success: false });
        }
        
        // If new file is uploaded, delete old file and update path
        if (req.file) {
            if (existingApp.resume) {
                const oldFilePath = path.join(process.cwd(), 'public', existingApp.resume);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            // Remove 'public/' prefix since Express serves public as root
            updateJobAppData.resume = req.file.path.replace(/\\/g, '/').replace('public/', '');
        }
        
        // Update application
        const updatedApp = await JobVacancyApplications.findByIdAndUpdate(
            id,
            { $set: updateJobAppData },
            { new: true, runValidators: true }
        );
        
        res.status(200).json({ 
            message: 'Job application updated successfully', 
            success: true,
            data: updatedApp 
        });
    } catch (err) {
        console.error('updateJobApplication error:', err);
        res.status(500).json({ message: 'Failed to update job application', success: false, error: err.message });
    }
};

// Update application (POST method with body ID)
const updateJobApplication = async (req, res) => {
    try {
        const updateJobAppData = req.body;
        const id = updateJobAppData.id;
        
        if (!id) {
            return res.status(400).json({ message: 'Application ID is required', success: false });
        }
        
        // Find existing application
        const existingApp = await JobVacancyApplications.findById(id);
        if (!existingApp) {
            return res.status(404).json({ message: 'Application not found', success: false });
        }
        
        // Remove id from update data
        delete updateJobAppData.id;
        
        // If new file is uploaded, delete old file and update path
        if (req.file) {
            if (existingApp.resume) {
                const oldFilePath = path.join(process.cwd(), 'public', existingApp.resume);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            // Remove 'public/' prefix since Express serves public as root
            updateJobAppData.resume = req.file.path.replace(/\\/g, '/').replace('public/', '');
        }
        
        // Update application
        const updatedApp = await JobVacancyApplications.findByIdAndUpdate(
            id,
            { $set: updateJobAppData },
            { new: true, runValidators: true }
        );
        
        res.status(200).json({ 
            message: 'Job application updated successfully', 
            success: true,
            data: updatedApp 
        });
    } catch (err) {
        console.error('updateJobApplication error:', err);
        res.status(500).json({ message: 'Failed to update job application', success: false, error: err.message });
    }
};

// Delete application by ID (DELETE method)
const deleteJobAppDataById = async (req, res) => {
    try {
        const jobId = req.params.id;
        
        // Find and delete the application
        const application = await JobVacancyApplications.findById(jobId);
        if (!application) {
            return res.status(404).json({ message: 'Job application not found', success: false });
        }
        
        // Delete resume file if exists
        if (application.resume) {
            const filePath = path.join(process.cwd(), 'public', application.resume);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        
        await JobVacancyApplications.findByIdAndDelete(jobId);
        
        res.status(200).json({ message: 'Job application deleted successfully', success: true });
    } catch (err) {
        console.error('deleteJobAppData error:', err);
        res.status(500).json({ message: 'Failed to delete job application', success: false, error: err.message });
    }
};

// Delete application (POST method with body ID)
const deleteJobAppData = async (req, res) => {
    try {
        const jobId = req.body.id;
        
        if (!jobId) {
            return res.status(400).json({ message: 'Application ID is required', success: false });
        }
        
        // Find and delete the application
        const application = await JobVacancyApplications.findById(jobId);
        if (!application) {
            return res.status(404).json({ message: 'Job application not found', success: false });
        }
        
        // Delete resume file if exists
        if (application.resume) {
            const filePath = path.join(process.cwd(), 'public', application.resume);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        
        await JobVacancyApplications.findByIdAndDelete(jobId);
        
        res.status(200).json({ message: 'Job application deleted successfully', success: true });
    } catch (err) {
        console.error('deleteJobAppData error:', err);
        res.status(500).json({ message: 'Failed to delete job application', success: false, error: err.message });
    }
};

export {
    storeJobVacancy,
    getApplications,
    getSingleJobAppData,
    getSingleJobAppDataByPost,
    updateJobApplicationById,
    updateJobApplication,
    deleteJobAppDataById,
    deleteJobAppData
};