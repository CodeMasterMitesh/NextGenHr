import Branch from '../models/Branch.js';

const storeBranch = async (req, res) => {
    try {
        const branch = await Branch.create(req.body);
        res.status(200).json({ message: 'Branch stored successfully', success: true,data: branch });
    } catch (err) {
        console.error('storeBranch error', err);
        res.status(500).json({ message: 'Failed to store branch', success: false });
    }
};

const getCompanyWiseBranch = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const branch = await Branch.find({ company_id: companyId });
        res.status(200).json(branch);
    } catch (err) {
        console.error('getCompanyWiseBranch error', err);
        res.status(500).json({ message: 'Failed to fetch branches' });
    }
};

const getBranch = async (req, res) => {
    try {
      
        const branch = await Branch.find({});
        res.status(200).json(branch);
    } catch (err) {
        console.error('getBranch error', err);
        res.status(500).json({ message: 'Failed to fetch branches' });
    }
};

const getBranchById = async (req, res) => {
    try {
        const branchId = req.params.id;
        const branch = await Branch.findById(branchId);
        res.status(200).json(branch);
    } catch (err) {
        console.error('getBranchById error', err);
        res.status(500).json({ message: 'Failed to fetch branch' });
    }
};

const updateBranch = async (req, res) => {
    try {
        const branchId = req.params.id;
        const payload = req.body;
        await Branch.findByIdAndUpdate(branchId, payload);
        res.status(200).json({ message: 'Branch updated successfully', success: true });
    } catch (err) {
        console.error('updateBranch error', err);
        res.status(500).json({ message: 'Failed to update branch', success: false });
    }
};

const deleteBranch = async (req, res) => {
    try {
        const branchId = req.params.id;
        await Branch.findByIdAndDelete(branchId);
        res.status(200).json({ message: 'Branch deleted successfully', success: true });
    } catch (err) {
        console.error('deleteBranch error', err);
        res.status(500).json({ message: 'Failed to delete branch', success: false });
    }
};

export { storeBranch, getCompanyWiseBranch, getBranch, getBranchById, updateBranch, deleteBranch };