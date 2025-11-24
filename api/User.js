import { ObjectId } from 'mongodb';

const storeEmployee = (req,res,db) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const employeeData = JSON.parse(body);
        console.log('Received Employee data:', employeeData);
        // access collection
        const employeeCollection = await db.collection('users');
        await employeeCollection.insertOne(employeeData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Employee stored successfully' }));
    });
}


const usersApi = {
    storeEmployee,
};

export default usersApi;