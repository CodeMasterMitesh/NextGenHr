import { Router } from 'express';

const router = Router();

router.get('/dashboard', (req, res) => {
  res.render("dashboard", { title: "DashboardPage", pageClass: 'dashboard-page' });
});

export default router;
