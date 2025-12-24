import { Router } from 'express';

const router = Router();

router.get('/dashboard', (req, res) => {
  const UserLoggedIn = req.cookies.LoggedIn;
  res.render("dashboard", { title: "DashboardPage", pageClass: 'dashboard-page', UserLoggedIn });
});

export default router;
