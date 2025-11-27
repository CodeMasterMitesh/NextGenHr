import { ObjectId } from 'mongodb';
const storeBranch = (req,res,db) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const branchData = JSON.parse(body);
        console.log('Received Company data:', branchData);
        // access collection
        const branchCollection = await db.collection('branch');
        await branchCollection.insertOne(branchData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Branch stored successfully' }));
    });
}

const getCompanyBranch = async (req,res,db,companyId) => {
    const branchCollection = await db.collection('branch');
    const branch = await branchCollection.find({'company_id' : companyId}).toArray();
    // console.log(branch);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(branch));
}


const branchApi = {
    storeBranch,
    getCompanyBranch
};

export default branchApi;