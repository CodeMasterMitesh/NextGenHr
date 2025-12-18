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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const loggedUser = await db.collection('users').findOne({ email });

        if (!loggedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (loggedUser.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Return JSON so the frontend fetch can redirect after parsing the response
        const { password: _pw, ...safeUser } = loggedUser;
        res.status(200).json({ message: 'Login successful', user: safeUser });
    } catch (err) {
        console.error('Login failed:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;