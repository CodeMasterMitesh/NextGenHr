import { Router } from 'express';

const router = Router();

router.get('/employees', (req, res) => {
  res.render("employees", { title: "Employees" });
});

router.get('/employees/new', (req, res) => {
  res.render("employee-form", { title: "Add Employee" });
});

router.get('/departments', (req, res) => {
  res.render("departments", { title: "Departments" });
});

router.post('/departments', (req, res) => {
  res.json({ message: 'Department saved' });
});

router.get('/designations', (req, res) => {
  res.render("designations", { title: "Designations" });
});

router.post('/designations', (req, res) => {
  res.json({ message: 'Designation saved' });
});

export default router;
