import Company from "../models/Company.js";
import verifyJwt from "../middleware/verifyJwt.js";

const storeCompany = async (req, res) => {
    try {
        await Company.create(req.body);
        res.status(200).json({ message: 'Company stored successfully', success: true });
    } catch (err) {
        console.error('storeCompany error:', err);
        res.status(500).json({ message: 'Failed to store company', success: false });
    }
};

const getCompanyData = async (req, res) => {
    try {
        const companies = await Company.find({});
        res.status(200).json(companies);
    } catch (err) {
        console.error('getCompanyData error:', err);
        res.status(500).json({ message: 'Failed to fetch companies' });
    }
};

const getCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        res.status(200).json(company);
    } catch (err) {
        console.error('getCompany error:', err);
        res.status(500).json({ message: 'Failed to fetch company' });
    }
};

const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const payload = req.body;
        await Company.findByIdAndUpdate(companyId, payload, { new: true });
        res.status(200).json({ message: 'Company updated successfully', success: true });
    } catch (err) {
        console.error('updateCompany error:', err);
        res.status(500).json({ message: 'Failed to update company', success: false });
    }
};

const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        await Company.findByIdAndDelete(companyId);
        res.status(200).json({ message: 'Company deleted successfully', success: true });
    } catch (err) {
        console.error('deleteCompany error:', err);
        res.status(500).json({ message: 'Failed to delete company', success: false });
    }
};

export {
    storeCompany,
    getCompanyData,
    getCompany,
    updateCompany,
    deleteCompany
};