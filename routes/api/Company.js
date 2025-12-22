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

router.post('/storeCompany', async (req, res) => {
    try {
        const companyData = req.body;
        const companyCollection = await db.collection('companies');
        await companyCollection.insertOne(companyData);
        res.status(200).json({ message: 'Company stored successfully', success: true });
    } catch (err) {
        console.error('storeCompany error:', err);
        res.status(500).json({ message: 'Failed to store company', success: false });
    }
});

router.get('/getCompanyData', async (req, res) => {
    try {
        const companyCollection = await db.collection('companies');
        const companies = await companyCollection.find({}).toArray();
        res.status(200).json(companies);
    } catch (err) {
        console.error('getCompanyData error:', err);
        res.status(500).json({ message: 'Failed to fetch companies' });
    }
});

router.get('/getCompany/:id', async (req, res) => {
    try {
        const companyId = req.params.id;
        const companyCollection = await db.collection('companies');
        const company = await companyCollection.findOne({ _id: new ObjectId(companyId) });
        res.status(200).json(company);
    } catch (err) {
        console.error('getCompany error:', err);
        res.status(500).json({ message: 'Failed to fetch company' });
    }
});

router.put('/updateCompany/:id', async (req, res) => {
    try {
        const companyId = req.params.id;
        const payload = req.body;
        const companyCollection = await db.collection('companies');
        await companyCollection.updateOne({ _id: new ObjectId(companyId) }, { $set: payload });
        res.status(200).json({ message: 'Company updated successfully', success: true });
    } catch (err) {
        console.error('updateCompany error:', err);
        res.status(500).json({ message: 'Failed to update company', success: false });
    }
});

router.delete('/deleteCompany/:id', async (req, res) => {
    try {
        const companyId = req.params.id;
        const companyCollection = await db.collection('companies');
        await companyCollection.deleteOne({ _id: new ObjectId(companyId) });
        res.status(200).json({ message: 'Company deleted successfully', success: true });
    } catch (err) {
        console.error('deleteCompany error:', err);
        res.status(500).json({ message: 'Failed to delete company', success: false });
    }
});

export default router;