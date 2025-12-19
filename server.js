import JobApplication from './routes/api/JobApplication.js';
import usersApi from './routes/api/User.js';
import webRoutes from './routes/web.js';
import companyApi from './routes/api/Company.js';
import branchApi from './routes/api/Branch.js';
import apiRoutes from './routes/api.js';
import express from "express";
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



const PORT = 5000;

// ==================== WEB Routes ====================
app.use(webRoutes);
// ==================== API Routes ====================
app.use(JobApplication);
app.use(companyApi);
app.use(branchApi);
app.use(usersApi);
app.use(apiRoutes);



process.on('SIGINT', () => {
    dbSetup.client.close().then(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

