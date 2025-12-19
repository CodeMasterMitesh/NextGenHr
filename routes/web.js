import express from "express";
import Router from 'express';

const router = Router();
// ==================== Public Routes ====================
router.get('/', (req,res)=>{
    res.render("index",{ title: "HomePage" });
});

router.get('/login', (req,res)=>{
    res.render("login",{ title: "LoginPage" });
});

// ==================== Dashboard ====================
router.get('/dashboard', (req,res)=>{
    res.render("dashboard",{ title: "DashboardPage", pageClass: 'dashboard-page' });
});

// ==================== Employee Management ====================
router.get('/employees', (req,res)=>{
    res.render("employees",{ title: "Employees" });
});

router.get('/employees/new', (req,res)=>{
    res.render("employee-form",{ title: "Add Employee" });
});

// ==================== Departments ====================
router.get('/departments', (req,res)=>{
    res.render("departments",{ title: "Departments" });
});

router.post('/departments', (req,res)=>{
    // Handle create/update department
    res.json({ message: 'Department saved' });
});

// ==================== Designations ====================
router.get('/designations', (req,res)=>{
    res.render("designations",{ title: "Designations" });
});

router.post('/designations', (req,res)=>{
    // Handle create/update designation
    res.json({ message: 'Designation saved' });
});

// ==================== Branches ====================
router.get('/branches', (req,res)=>{
    res.render("branches",{ title: "Branches" });
});

router.post('/branches', (req,res)=>{
    // Handle create/update branch
    res.json({ message: 'Branch saved' });
});

// ==================== Company ====================
router.get('/company', (req,res)=>{
    res.render("company",{ title: "Company" });
});

router.post('/company', (req,res)=>{
    // Handle company update
    res.json({ message: 'Company info updated' });
});

// ==================== Attendance ====================
router.get('/attendance', (req,res)=>{
    res.render("attendance",{ title: "Attendance" });
});

router.post('/attendance', (req,res)=>{
    // Handle attendance marking
    res.json({ message: 'Attendance saved' });
});

// ==================== Leave Requests ====================
router.get('/leave-requests', (req,res)=>{
    res.render("leave-requests",{ title: "Leave Requests" });
});

router.get('/leave-requests/pending', (req,res)=>{
    res.render("leave-requests",{ title: "Pending Leave Requests" });
});

router.get('/leave-requests/approved', (req,res)=>{
    res.render("leave-requests",{ title: "Approved Leave Requests" });
});

router.get('/leave-requests/all', (req,res)=>{
    res.render("leave-requests",{ title: "All Leave Requests" });
});

router.post('/leave-requests', (req,res)=>{
    // Handle leave request submission
    res.json({ message: 'Leave request saved' });
});

// ==================== Payroll ====================
router.get('/payroll', (req,res)=>{
    res.render("payroll",{ title: "Payroll" });
});

router.post('/payroll', (req,res)=>{
    // Handle payroll processing
    res.json({ message: 'Payroll processed' });
});

// ==================== Payslips ====================
router.get('/payslips', (req,res)=>{
    res.render("payslips",{ title: "Payslips" });
});

// ==================== Performance Reviews ====================
router.get('/performance-reviews', (req,res)=>{
    res.render("performance-reviews",{ title: "Performance Reviews" });
});

router.post('/performance-reviews', (req,res)=>{
    // Handle performance review submission
    res.json({ message: 'Performance review saved' });
});

// ==================== Users ====================
router.get('/users', (req,res)=>{
    res.render("users",{ title: "Users" });
});

router.post('/users', (req,res)=>{
    // Handle user creation
    res.json({ message: 'User created' });
});

// ==================== Roles & Permissions ====================
router.get('/roles', (req,res)=>{
    res.render("roles",{ title: "Roles & Permissions" });
});

router.post('/roles', (req,res)=>{
    // Handle role creation
    res.json({ message: 'Role created' });
});

// ==================== Audit Logs ====================
router.get('/audit-logs', (req,res)=>{
    res.render("audit-logs",{ title: "Audit Logs" });
});

// ==================== Approvals ====================
router.get('/approvals', (req,res)=>{
    res.render("approvals",{ title: "Approvals" });
});

// ==================== Job Portal ====================
router.get('/jobpost', (req,res)=>{
    res.render("jobpost",{ title: "Job Posts" });
});

router.get('/jobpost/new', (req,res)=>{
    res.render("jobpost-form",{ title: "Create Job Post" });
});

router.get('/viewjobpost', (req,res)=>{
    res.render("viewjobpost",{ title: "Job Details" });
});

router.get('/job-applications', (req,res)=>{
    res.render("job-applications",{ title: "Job Applications" });
});

// ==================== Recruitment Module ====================
router.get('/job-requisition', (req,res)=>{
    res.render("job-requisition",{ title: "Job Requisition Management" });
});

router.get('/job-posting', (req,res)=>{
    res.render("job-posting",{ title: "Job Posting & Advertisement" });
});

router.get('/resumes', (req,res)=>{
    res.render("resumes",{ title: "Resume Management" });
});

router.get('/interview-schedule', (req,res)=>{
    res.render("interview-schedule",{ title: "Interview Schedule" });
});

router.get('/onboarding', (req,res)=>{
    res.render("onboarding",{ title: "Employee Onboarding" });
});

router.get('/training-schedule', (req,res)=>{
    res.render("training-schedule",{ title: "Training Schedule" });
});

router.get('/exam', (req,res)=>{
    res.render("exam",{ title: "Employee Exams" });
});

// ==================== Payroll Module ====================
router.get('/shift-management', (req,res)=>{
    res.render("shift-management",{ title: "Shift Management" });
});

router.post('/shift-management', (req,res)=>{
    res.json({ message: 'Shift saved' });
});

router.get('/salary', (req,res)=>{
    res.render("salary",{ title: "Salary Management" });
});

router.post('/salary', (req,res)=>{
    res.json({ message: 'Salary saved' });
});

router.get('/weekoff', (req,res)=>{
    res.render("weekoff",{ title: "Week-off Management" });
});

router.post('/weekoff', (req,res)=>{
    res.json({ message: 'Week-off saved' });
});

router.get('/leaves', (req,res)=>{
    res.render("leave-requests",{ title: "Leave Management" });
});

router.get('/earnings-deductions', (req,res)=>{
    res.render("earnings-deductions",{ title: "Earnings & Deductions" });
});

router.post('/earnings-deductions', (req,res)=>{
    res.json({ message: 'Entry saved' });
});

// ==================== Performance & Assets ====================
router.get('/asset-issue', (req,res)=>{
    res.render("asset-issue",{ title: "Asset Issue" });
});

router.post('/asset-issue', (req,res)=>{
    res.json({ message: 'Asset issued' });
});

router.get('/asset-return', (req,res)=>{
    res.render("asset-return",{ title: "Asset Return" });
});

router.post('/asset-return', (req,res)=>{
    res.json({ message: 'Asset returned' });
});

// ==================== Tasks & Events ====================
router.get('/tasks', (req,res)=>{
    res.render("tasks",{ title: "Task Management" });
});

router.post('/tasks', (req,res)=>{
    res.json({ message: 'Task created' });
});

router.get('/events', (req,res)=>{
    res.render("events",{ title: "Event Management" });
});

router.post('/events', (req,res)=>{
    res.json({ message: 'Event created' });
});

// ==================== Common Module ====================
router.get('/news', (req,res)=>{
    res.render("news",{ title: "News & Articles" });
});

router.post('/news', (req,res)=>{
    res.json({ message: 'Article published' });
});

router.get('/notifications', (req,res)=>{
    res.render("notifications",{ title: "Notifications" });
});

router.post('/notifications', (req,res)=>{
    res.json({ message: 'Notification sent' });
});

router.get('/holidays', (req,res)=>{
    res.render("holidays",{ title: "Holiday Management" });
});

router.post('/holidays', (req,res)=>{
    res.json({ message: 'Holiday added' });
});

export default router;