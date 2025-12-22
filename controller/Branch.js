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

const storeBranch = async (req, res) => {
    try {
        const branchData = req.body;
        const branchCollection = await db.collection('branch');
        await branchCollection.insertOne(branchData);
        res.status(200).json({ message: 'Branch stored successfully', success: true });
    } catch (err) {
        console.error('storeBranch error', err);
        res.status(500).json({ message: 'Failed to store branch', success: false });
    }
};

const getCompanyWiseBranch = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const branchCollection = await db.collection('branch');
        const branch = await branchCollection.find({ company_id: companyId }).toArray();
        res.status(200).json(branch);
    } catch (err) {
        console.error('getCompanyWiseBranch error', err);
        res.status(500).json({ message: 'Failed to fetch branches' });
    }
};

const getBranch = async (req, res) => {
    try {
        const branchCollection = await db.collection('branch');
        const branch = await branchCollection.find({}).toArray();
        res.status(200).json(branch);
    } catch (err) {
        console.error('getBranch error', err);
        res.status(500).json({ message: 'Failed to fetch branches' });
    }
};

const getBranchById = async (req, res) => {
    try {
        const branchId = req.params.id;
        const branchCollection = await db.collection('branch');
        const branch = await branchCollection.findOne({ _id: new ObjectId(branchId) });
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
        const branchCollection = await db.collection('branch');
        await branchCollection.updateOne({ _id: new ObjectId(branchId) }, { $set: payload });
        res.status(200).json({ message: 'Branch updated successfully', success: true });
    } catch (err) {
        console.error('updateBranch error', err);
        res.status(500).json({ message: 'Failed to update branch', success: false });
    }
};

const deleteBranch = async (req, res) => {
    try {
        const branchId = req.params.id;
        const branchCollection = await db.collection('branch');
        await branchCollection.deleteOne({ _id: new ObjectId(branchId) });
        res.status(200).json({ message: 'Branch deleted successfully', success: true });
    } catch (err) {
        console.error('deleteBranch error', err);
        res.status(500).json({ message: 'Failed to delete branch', success: false });
    }
};

export { storeBranch, getCompanyWiseBranch, getBranch, getBranchById, updateBranch, deleteBranch };