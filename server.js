import { createServer } from "http";
import { MongoClient} from 'mongodb'


const PORT = 3000;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'NextGenHr';
// console.log(db);

client.connect().then(() => {  // Connect to MongoDB
    console.log("Connected successfully to MongoDB server");
}).catch(err => {
    console.error("Failed to connect to MongoDB server:", err);
});

const db = client.db(dbName);

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
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            // console.log('Received data:', body);
            // convert body to JSON
            const jobVacancyData = JSON.parse(body);

            // access collection
            const jobVacancyCollection = await db.collection('jobApplications');

            // Insert the job vacancy data into the collection
            await jobVacancyCollection.insertOne(jobVacancyData);
            // console.log('Job Data:', jobVacancyData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Job vacancy stored successfully' }));
        });
    }

    if(req.method === 'GET' && req.url === '/getApplications') {
        (async () => {
            const getjobdata = await db.collection('jobApplications').find({}).toArray();
            res.writeHead(200, {'content-type' : 'application/json'});
            res.end(JSON.stringify(getjobdata));
        })();
    }
});


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

