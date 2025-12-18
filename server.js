import JobApplication from './routes/api/JobApplication.js';
import usersApi from './routes/api/User.js';
import companyApi from './routes/api/Company.js';
import branchApi from './routes/api/Branch.js';
import Auth  from './routes/api/Auth.js';
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

// ==================== Public Routes ====================
app.get('/', (req,res)=>{
    res.render("index",{ title: "HomePage" });
});

app.get('/login', (req,res)=>{
    res.render("login",{ title: "LoginPage" });
});

// ==================== Dashboard ====================
app.get('/dashboard', (req,res)=>{
    res.render("dashboard",{ title: "DashboardPage", pageClass: 'dashboard-page' });
});

// ==================== Employee Management ====================
app.get('/employees', (req,res)=>{
    res.render("employees",{ title: "Employees" });
});

app.get('/employees/new', (req,res)=>{
    res.render("employee-form",{ title: "Add Employee" });
});

// ==================== Departments ====================
app.get('/departments', (req,res)=>{
    res.render("departments",{ title: "Departments" });
});

app.post('/departments', (req,res)=>{
    // Handle create/update department
    res.json({ message: 'Department saved' });
});

// ==================== Designations ====================
app.get('/designations', (req,res)=>{
    res.render("designations",{ title: "Designations" });
});

app.post('/designations', (req,res)=>{
    // Handle create/update designation
    res.json({ message: 'Designation saved' });
});

// ==================== Branches ====================
app.get('/branches', (req,res)=>{
    res.render("branches",{ title: "Branches" });
});

app.post('/branches', (req,res)=>{
    // Handle create/update branch
    res.json({ message: 'Branch saved' });
});

// ==================== Company ====================
app.get('/company', (req,res)=>{
    res.render("company",{ title: "Company" });
});

app.post('/company', (req,res)=>{
    // Handle company update
    res.json({ message: 'Company info updated' });
});

// ==================== Attendance ====================
app.get('/attendance', (req,res)=>{
    res.render("attendance",{ title: "Attendance" });
});

app.post('/attendance', (req,res)=>{
    // Handle attendance marking
    res.json({ message: 'Attendance saved' });
});

// ==================== Leave Requests ====================
app.get('/leave-requests', (req,res)=>{
    res.render("leave-requests",{ title: "Leave Requests" });
});

app.get('/leave-requests/pending', (req,res)=>{
    res.render("leave-requests",{ title: "Pending Leave Requests" });
});

app.get('/leave-requests/approved', (req,res)=>{
    res.render("leave-requests",{ title: "Approved Leave Requests" });
});

app.get('/leave-requests/all', (req,res)=>{
    res.render("leave-requests",{ title: "All Leave Requests" });
});

app.post('/leave-requests', (req,res)=>{
    // Handle leave request submission
    res.json({ message: 'Leave request saved' });
});

// ==================== Payroll ====================
app.get('/payroll', (req,res)=>{
    res.render("payroll",{ title: "Payroll" });
});

app.post('/payroll', (req,res)=>{
    // Handle payroll processing
    res.json({ message: 'Payroll processed' });
});

// ==================== Payslips ====================
app.get('/payslips', (req,res)=>{
    res.render("payslips",{ title: "Payslips" });
});

// ==================== Performance Reviews ====================
app.get('/performance-reviews', (req,res)=>{
    res.render("performance-reviews",{ title: "Performance Reviews" });
});

app.post('/performance-reviews', (req,res)=>{
    // Handle performance review submission
    res.json({ message: 'Performance review saved' });
});

// ==================== Users ====================
app.get('/users', (req,res)=>{
    res.render("users",{ title: "Users" });
});

app.post('/users', (req,res)=>{
    // Handle user creation
    res.json({ message: 'User created' });
});

// ==================== Roles & Permissions ====================
app.get('/roles', (req,res)=>{
    res.render("roles",{ title: "Roles & Permissions" });
});

app.post('/roles', (req,res)=>{
    // Handle role creation
    res.json({ message: 'Role created' });
});

// ==================== Audit Logs ====================
app.get('/audit-logs', (req,res)=>{
    res.render("audit-logs",{ title: "Audit Logs" });
});

// ==================== Approvals ====================
app.get('/approvals', (req,res)=>{
    res.render("approvals",{ title: "Approvals" });
});

// ==================== Job Portal ====================
app.get('/jobpost', (req,res)=>{
    res.render("jobpost",{ title: "Job Posts" });
});

app.get('/jobpost/new', (req,res)=>{
    res.render("jobpost-form",{ title: "Create Job Post" });
});

app.get('/viewjobpost', (req,res)=>{
    res.render("viewjobpost",{ title: "Job Details" });
});

app.get('/job-applications', (req,res)=>{
    res.render("job-applications",{ title: "Job Applications" });
});

// ==================== Recruitment Module ====================
app.get('/job-requisition', (req,res)=>{
    res.render("job-requisition",{ title: "Job Requisition Management" });
});

app.get('/job-posting', (req,res)=>{
    res.render("job-posting",{ title: "Job Posting & Advertisement" });
});

app.get('/resumes', (req,res)=>{
    res.render("resumes",{ title: "Resume Management" });
});

app.get('/interview-schedule', (req,res)=>{
    res.render("interview-schedule",{ title: "Interview Schedule" });
});

app.get('/onboarding', (req,res)=>{
    res.render("onboarding",{ title: "Employee Onboarding" });
});

app.get('/training-schedule', (req,res)=>{
    res.render("training-schedule",{ title: "Training Schedule" });
});

app.get('/exam', (req,res)=>{
    res.render("exam",{ title: "Employee Exams" });
});

// ==================== Payroll Module ====================
app.get('/shift-management', (req,res)=>{
    res.render("shift-management",{ title: "Shift Management" });
});

app.post('/shift-management', (req,res)=>{
    res.json({ message: 'Shift saved' });
});

app.get('/salary', (req,res)=>{
    res.render("salary",{ title: "Salary Management" });
});

app.post('/salary', (req,res)=>{
    res.json({ message: 'Salary saved' });
});

app.get('/weekoff', (req,res)=>{
    res.render("weekoff",{ title: "Week-off Management" });
});

app.post('/weekoff', (req,res)=>{
    res.json({ message: 'Week-off saved' });
});

app.get('/leaves', (req,res)=>{
    res.render("leave-requests",{ title: "Leave Management" });
});

app.get('/earnings-deductions', (req,res)=>{
    res.render("earnings-deductions",{ title: "Earnings & Deductions" });
});

app.post('/earnings-deductions', (req,res)=>{
    res.json({ message: 'Entry saved' });
});

// ==================== Performance & Assets ====================
app.get('/asset-issue', (req,res)=>{
    res.render("asset-issue",{ title: "Asset Issue" });
});

app.post('/asset-issue', (req,res)=>{
    res.json({ message: 'Asset issued' });
});

app.get('/asset-return', (req,res)=>{
    res.render("asset-return",{ title: "Asset Return" });
});

app.post('/asset-return', (req,res)=>{
    res.json({ message: 'Asset returned' });
});

// ==================== Tasks & Events ====================
app.get('/tasks', (req,res)=>{
    res.render("tasks",{ title: "Task Management" });
});

app.post('/tasks', (req,res)=>{
    res.json({ message: 'Task created' });
});

app.get('/events', (req,res)=>{
    res.render("events",{ title: "Event Management" });
});

app.post('/events', (req,res)=>{
    res.json({ message: 'Event created' });
});

// ==================== Common Module ====================
app.get('/news', (req,res)=>{
    res.render("news",{ title: "News & Articles" });
});

app.post('/news', (req,res)=>{
    res.json({ message: 'Article published' });
});

app.get('/notifications', (req,res)=>{
    res.render("notifications",{ title: "Notifications" });
});

app.post('/notifications', (req,res)=>{
    res.json({ message: 'Notification sent' });
});

app.get('/holidays', (req,res)=>{
    res.render("holidays",{ title: "Holiday Management" });
});

app.post('/holidays', (req,res)=>{
    res.json({ message: 'Holiday added' });
});

// ==================== API Routes ====================
app.use(JobApplication);
app.use(companyApi);
app.use(branchApi);
app.use(usersApi);
app.use(Auth);



process.on('SIGINT', () => {
    dbSetup.client.close().then(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

