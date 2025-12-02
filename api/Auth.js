import { ObjectId } from 'mongodb';

const login = (req, res, db) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        console.log('Login Request Body:', body);
        const { email,password } = JSON.parse(body);
        console.log('Requested ID:', email);
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
}

export const Auth = {
    login
};