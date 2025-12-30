import { Router } from 'express';

const router = Router();

// Employee Routes
router.get('/employees', (req, res) => {
  res.render("employees/list", { title: "Employees" });
});

router.get('/employees/add', (req, res) => {
  res.render("employees/add", { title: "Add Employee" });
});

router.get('/employees/edit/:id', (req, res) => {
  res.render("employees/edit", { title: "Edit Employee", employee: {} });
});

router.get('/employees/view/:id', (req, res) => {
  res.render("employees/view", { title: "View Employee", employee: {} });
});

router.post('/employees', (req, res) => {
  res.json({ message: 'Employee saved' });
});

// Department Routes
router.get('/departments', (req, res) => {
  res.render("departments/list", { title: "Departments" });
});

router.get('/departments/add', (req, res) => {
  res.render("departments/add", { title: "Add Department" });
});

router.get('/departments/edit/:id', (req, res) => {
  res.render("departments/edit", { title: "Edit Department", department: {} });
});

router.get('/departments/view/:id', (req, res) => {
  res.render("departments/view", { title: "View Department", department: {} });
});

router.post('/departments', (req, res) => {
  res.json({ message: 'Department saved' });
});

// Designation Routes
router.get('/designations', (req, res) => {
  res.render("designations/list", { title: "Designations" });
});

router.get('/designations/add', (req, res) => {
  res.render("designations/add", { title: "Add Designation" });
});

router.get('/designations/edit/:id', (req, res) => {
  res.render("designations/edit", { title: "Edit Designation", designation: {} });
});

router.get('/designations/view/:id', (req, res) => {
  res.render("designations/view", { title: "View Designation", designation: {} });
});

router.post('/designations', (req, res) => {
  res.json({ message: 'Designation saved' });
});

export default router;
