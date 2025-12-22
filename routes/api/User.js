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

router.post('/storeEmployee', async (req, res) => {
    try {
        const employeeData = req.body;
        const employeeCollection = await db.collection('users');
        await employeeCollection.insertOne(employeeData);
        res.status(200).json({ message: 'Employee stored successfully', success: true });
    } catch (err) {
        console.error('storeEmployee error:', err);
        res.status(500).json({ message: 'Failed to store employee', success: false });
    }
});

router.get('/getEmployees', async (req, res) => {
    try {
        const employeeCollection = await db.collection('users');
        const employees = await employeeCollection.find({}).toArray();
        res.status(200).json(employees);
    } catch (err) {
        console.error('getEmployees error:', err);
        res.status(500).json({ message: 'Failed to fetch employees' });
    }
});

router.get('/getEmployee/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employeeCollection = await db.collection('users');
        const employee = await employeeCollection.findOne({ _id: new ObjectId(employeeId) });
        res.status(200).json(employee);
    } catch (err) {
        console.error('getEmployee error:', err);
        res.status(500).json({ message: 'Failed to fetch employee' });
    }
});

router.get('/getLastEmployees', async (req, res) => {
    try {
        const employeeCollection = await db.collection('users');
        const employees = await employeeCollection.find({}).sort({ _id: -1 }).limit(1).toArray();
        res.status(200).json(employees);
    } catch (err) {
        console.error('getLastEmployees error:', err);
        res.status(500).json({ message: 'Failed to fetch last employee' });
    }
});

router.put('/updateEmployee/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const payload = req.body;
        const employeeCollection = await db.collection('users');
        await employeeCollection.updateOne({ _id: new ObjectId(employeeId) }, { $set: payload });
        res.status(200).json({ message: 'Employee updated successfully', success: true });
    } catch (err) {
        console.error('updateEmployee error:', err);
        res.status(500).json({ message: 'Failed to update employee', success: false });
    }
});

router.delete('/deleteEmployee/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employeeCollection = await db.collection('users');
        await employeeCollection.deleteOne({ _id: new ObjectId(employeeId) });
        res.status(200).json({ message: 'Employee deleted successfully', success: true });
    } catch (err) {
        console.error('deleteEmployee error:', err);
        res.status(500).json({ message: 'Failed to delete employee', success: false });
    }
});

export default router;