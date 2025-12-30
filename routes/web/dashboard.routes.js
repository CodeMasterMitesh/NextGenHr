import { Router } from 'express';
import isAuth from '../../middleware/auth.js';
const router = Router();

router.get('/dashboard', isAuth, (req, res) => {
  // const UserLoggedIn = Boolean(req.cookies && req.cookies.session_id);

  res.render("dashboard", { title: "DashboardPage", pageClass: 'dashboard-page', userData: req.session.user });
});

export default router;
