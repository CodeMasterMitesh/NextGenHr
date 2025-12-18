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

router.post('/storeEmployee', async (req, res) => {
        const employeeData = req.body;
        console.log('Received Employee data:', employeeData);
        // access collection
        const employeeCollection = await db.collection('users');
        await employeeCollection.insertOne(employeeData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Employee stored successfully' }));
});
// 50 data entries i have and i want get last data than first i descending this data and set limit 1
router.get('/getLastEmployees', async (req, res) => {
    const employeeCollection = await db.collection('users');
    const employees = await employeeCollection.find({}).sort({ _id: -1 }).limit(1).toArray();
    console.log('Last Employee data:', employees);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(employees));

});


export default router;