import { createServer } from "http";
import { MongoClient } from 'mongodb'


const PORT = 3000;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'NextGenHr';

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
        console.log('Received a POST request to ',req.url);
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log('Received data:', body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Job vacancy stored successfully' }));
        });
    }
});


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

