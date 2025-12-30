import { Router } from 'express';

const router = Router();

router.get('/payroll', (req, res) => {
  res.render("payroll/list", { title: "Payroll" });
});

router.get('/payroll/add', (req, res) => {
  res.render("payroll/add", { title: "Process Payroll" });
});

router.get('/payroll/view/:id', (req, res) => {
  res.render("payroll/view", { title: "View Payroll", payroll: {} });
});

router.post('/payroll', (req, res) => {
  res.json({ message: 'Payroll processed' });
});

router.get('/payslips', (req, res) => {
  res.render("payslips/list", { title: "Payslips" });
});

router.get('/payslips/add', (req, res) => {
  res.render("payslips/add", { title: "Generate Payslip" });
});

router.get('/payslips/edit/:id', (req, res) => {
  res.render("payslips/edit", { title: "Edit Payslip", payslip: {} });
});

router.get('/payslips/view/:id', (req, res) => {
  res.render("payslips/view", { title: "View Payslip", payslip: {} });
});

router.get('/shift-management', (req, res) => {
  res.render("shifts/list", { title: "Shift Management" });
});

router.get('/shift-management/add', (req, res) => {
  res.render("shifts/add", { title: "Add Shift" });
});

router.get('/shift-management/edit/:id', (req, res) => {
  res.render("shifts/edit", { title: "Edit Shift", shift: {} });
});

router.get('/shift-management/view/:id', (req, res) => {
  res.render("shifts/view", { title: "View Shift", shift: {} });
});

router.post('/shift-management', (req, res) => {
  res.json({ message: 'Shift saved' });
});

router.get('/salary', (req, res) => {
  res.render("salary/list", { title: "Salary Management" });
});

router.get('/salary/add', (req, res) => {
  res.render("salary/add", { title: "Add Salary" });
});

router.get('/salary/edit/:id', (req, res) => {
  res.render("salary/edit", { title: "Edit Salary", salary: {} });
});

router.get('/salary/view/:id', (req, res) => {
  res.render("salary/view", { title: "View Salary", salary: {} });
});

router.post('/salary', (req, res) => {
  res.json({ message: 'Salary saved' });
});

router.get('/weekoff', (req, res) => {
  res.render("weekoff/list", { title: "Week-off Management" });
});

router.get('/weekoff/add', (req, res) => {
  res.render("weekoff/add", { title: "Add Week-off" });
});

router.get('/weekoff/edit/:id', (req, res) => {
  res.render("weekoff/edit", { title: "Edit Week-off", weekoff: {} });
});

router.get('/weekoff/view/:id', (req, res) => {
  res.render("weekoff/view", { title: "View Week-off", weekoff: {} });
});

router.post('/weekoff', (req, res) => {
  res.json({ message: 'Week-off saved' });
});

router.get('/earnings-deductions', (req, res) => {
  res.render("earnings-deductions/list", { title: "Earnings & Deductions" });
});

router.get('/earnings-deductions/add', (req, res) => {
  res.render("earnings-deductions/add", { title: "Add Earnings/Deductions" });
});

router.get('/earnings-deductions/edit/:id', (req, res) => {
  res.render("earnings-deductions/edit", { title: "Edit Entry", entry: {} });
});

router.get('/earnings-deductions/view/:id', (req, res) => {
  res.render("earnings-deductions/view", { title: "View Entry", entry: {} });
});

router.post('/earnings-deductions', (req, res) => {
  res.json({ message: 'Entry saved' });
});

export default router;
