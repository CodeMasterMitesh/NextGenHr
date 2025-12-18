import { MongoClient, ObjectId } from 'mongodb';
import Router from 'express';
import { dbSetup } from '../../db.js';
const router = Router();

dbSetup.client.connect().then(() => {  // Connect to MongoDB
    console.log("Connected successfully to MongoDB server");
}).catch(err => {
    console.error("Failed to connect to MongoDB server:", err);
});

const db = dbSetup.client.db(dbSetup.dbName);

router.post('/storeCompany', async (req, res) => {
        const companyData = req.body;
        console.log('Received Company data:', companyData);
        // access collection
        const companyCollection = await db.collection('companies');
        await companyCollection.insertOne(companyData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Company stored successfully' }));
});

router.get('/getCompanyData', async (req,res) => {
    const companyCollection = await db.collection('companies');
    const companies = await companyCollection.find({}).toArray();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(companies));

});



export default router;