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

export default router;
