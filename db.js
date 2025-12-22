import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.set("strictQuery", false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            dbName : process.env.DB_NAME,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

export default connectDB;