import { Router } from 'express';

const router = Router();

router.get('/payroll', (req, res) => {
  res.render("payroll", { title: "Payroll" });
});

router.post('/payroll', (req, res) => {
  res.json({ message: 'Payroll processed' });
});

router.get('/payslips', (req, res) => {
  res.render("payslips", { title: "Payslips" });
});

router.get('/shift-management', (req, res) => {
  res.render("shift-management", { title: "Shift Management" });
});

router.post('/shift-management', (req, res) => {
  res.json({ message: 'Shift saved' });
});

router.get('/salary', (req, res) => {
  res.render("salary", { title: "Salary Management" });
});

router.post('/salary', (req, res) => {
  res.json({ message: 'Salary saved' });
});

router.get('/weekoff', (req, res) => {
  res.render("weekoff", { title: "Week-off Management" });
});

router.post('/weekoff', (req, res) => {
  res.json({ message: 'Week-off saved' });
});

router.get('/earnings-deductions', (req, res) => {
  res.render("earnings-deductions", { title: "Earnings & Deductions" });
});

router.post('/earnings-deductions', (req, res) => {
  res.json({ message: 'Entry saved' });
});

export default router;
