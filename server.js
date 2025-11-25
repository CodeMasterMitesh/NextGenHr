import { createServer } from "http";
import { MongoClient,ObjectId} from 'mongodb';
import { dbSetup } from './db.js';
import JobApplication from './api/JobApplication.js';
import usersApi from './api/User.js';
import companyApi from './api/Company.js';
// console.log(dbSetup.url);
// console.log('DB URL:', process.env.DB_URL);
const PORT = 3000;
dbSetup.client.connect().then(() => {  // Connect to MongoDB
    console.log("Connected successfully to MongoDB server");
}).catch(err => {
    console.error("Failed to connect to MongoDB server:", err);
});

const db = dbSetup.client.db(dbSetup.dbName);

const server = createServer((req, res) => {
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.end('Hello, World!\n');  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {// Preflight request
        res.writeHead(204);
        res.end();
        return;
    }

    if(req.method === 'POST' && req.url === '/storeJobVacancy') {
        // console.log('Req Url ',req.url);
        JobApplication.storeJobVacance(req, res, db);
    }

    if(req.method === 'GET' && req.url === '/getApplications') {
        JobApplication.getApplications(req, res, db);
    }

    if(req.method === 'POST' && req.url === '/getSingleJobAppData') {
        JobApplication.getSingleJobAppData(req, res, db);
    }
    if(req.method === 'PUT' && req.url === '/updateJobApplication') {
       JobApplication.updateJobApplication(req, res, db);
    }

    if(req.method === 'DELETE' && req.url === '/deleteJobAppData'){
        JobApplication.deleteJobAppData(req, res, db);
    }

    if(req.method === 'POST' && req.url === '/storeEmployee'){
        usersApi.storeEmployee(req, res, db);
    }

    if(req.method === 'POST' && req.url === '/storeCompany'){
        companyApi.storeCompany(req, res, db);
    }
    if(req.method === 'GET' && req.url === '/getCompanyData'){
        companyApi.getCompanyData(req, res, db);
    }
});

process.on('SIGINT', () => {
    client.close().then(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
    });
});
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

