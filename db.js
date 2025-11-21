import { MongoClient,ObjectId} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

export const dbSetup = {
    url : process.env.DB_URL,
    client : new MongoClient(process.env.DB_URL),
    dbName : process.env.DB_NAME,
}
