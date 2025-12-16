import JobApplication from './api/JobApplication.js';
import usersApi from './api/User.js';
import companyApi from './api/Company.js';
import branchApi from './api/Branch.js';
import { Auth } from './api/Auth.js';
import express from "express";

const app = express();
app.use(express.static('web'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 5000;


app.use(JobApplication);
app.use(companyApi);
app.use(branchApi);
app.use(usersApi);
app.use(Auth);

process.on('SIGINT', () => {
    client.close().then(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

