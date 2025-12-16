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

router.post('/login', async (req, res) => {
        const { email,password } = req.body;
        const loggedUser = await db.collection('users').findOne({ email: email });
        if(loggedUser){
            if(loggedUser.password == password){
                console.log('loggedUser ', loggedUser);
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify(loggedUser));
            }else{
                res.writeHead(401, { 'content-type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid password' }));
            }
        }else{
            res.writeHead(404, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    });

export default router;