import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render("index", { title: "HomePage" });
});

router.get('/login', (req, res) => {
  res.render("login", { title: "LoginPage" });
});

export default router;
