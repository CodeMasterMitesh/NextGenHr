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
// 50 data entries i have and i want get last data than first i descending this data and set limit 1
const getLastEmployees = async (req, res, db) => {
    const employeeCollection = await db.collection('users');
    const employees = await employeeCollection.find({}).sort({ _id: -1 }).limit(1).toArray();
    console.log('Last Employee data:', employees);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(employees));
}
const usersApi = {
    storeEmployee,
    getLastEmployees,
};

export default usersApi;