import JobApplication from './api/JobApplication.js';
import usersApi from './api/User.js';
import companyApi from './api/Company.js';
import branchApi from './api/Branch.js';
import Auth  from './api/Auth.js';
import express from "express";
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// app.use(express.static('web'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use EJS layouts
app.use(expressLayouts);
app.set('layout', 'layouts/masterlayout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);


const PORT = 5000;
app.get('/', (req, res) => {
    res.render('index', { title: 'NextGen', page: 'home', layout: false })
});


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

