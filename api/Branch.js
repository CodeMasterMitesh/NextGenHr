import { ObjectId } from 'mongodb';

const storeBranch = (req,res,db) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const companyData = JSON.parse(body);
        console.log('Received Company data:', companyData);
        // access collection
        const companyCollection = await db.collection('companies');
        await companyCollection.insertOne(companyData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Company stored successfully' }));
    });
}

const getCompanyData = async (req,res,db) => {
    const companyCollection = await db.collection('branch');
    const companies = await companyCollection.find({}).toArray();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(companies));
}


const companyApi = {
    storeBranch,
    getCompanyData
};

export default companyApi;