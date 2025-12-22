import { Router } from 'express';

const router = Router();

router.get('/branches', (req, res) => {
  res.render("branches", { title: "Branches" });
});

router.post('/branches', (req, res) => {
  res.json({ message: 'Branch saved' });
});

router.get('/company', (req, res) => {
  res.render("company", { title: "Company" });
});

router.post('/company', (req, res) => {
  res.json({ message: 'Company info updated' });
});

export default router;
