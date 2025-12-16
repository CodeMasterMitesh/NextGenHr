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

router.post('/storeBranch', async (req, res) => {
    const branchData = req.body;
    console.log('Received Company data:', branchData);
    // access collection
    const branchCollection = await db.collection('branch');
    await branchCollection.insertOne(branchData);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Branch stored successfully' }));
});

router.get('/getCompanyWiseBranch/:companyId', async (req, res) => {
    const companyId = req.params.companyId;
    const branchCollection = await db.collection('branch');
    const branch = await branchCollection.find({ 'company_id': companyId }).toArray();
    // console.log(branch);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(branch));

});


export default router;