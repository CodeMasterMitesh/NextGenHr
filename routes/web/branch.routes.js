import { Router } from 'express';

const router = Router();

// Branch Routes
router.get('/branches', (req, res) => {
  res.render("branches/list", { title: "Branches" });
});

router.get('/branches/add', (req, res) => {
  res.render("branches/add", { title: "Add Branch" });
});

router.get('/branches/edit/:id', (req, res) => {
  res.render("branches/edit", { title: "Edit Branch", branch: {} });
});

router.get('/branches/view/:id', (req, res) => {
  res.render("branches/view", { title: "View Branch", branch: {} });
});

router.post('/branches', (req, res) => {
  res.json({ message: 'Branch saved' });
});

// Company Routes
router.get('/company', (req, res) => {
  res.render("company", { title: "Company" });
});

router.get('/company/add', (req, res) => {
  res.render("company/add", { title: "Add Company" });
});

router.post('/company', (req, res) => {
  res.json({ message: 'Company info updated' });
});

export default router;
