import { Router } from 'express';
import isAuth from '../../middleware/auth.js';
const router = Router();

router.get('/attendance', isAuth, (req, res) => {
  res.render("attendance", { title: "Attendance" });
});

router.post('/attendance', isAuth, (req, res) => {
  res.json({ message: 'Attendance saved' });
});

router.get('/leave-requests', isAuth, (req, res) => {
  res.render("leave-requests", { title: "Leave Requests" });
});

router.get('/leave-requests/pending', isAuth, (req, res) => {
  res.render("leave-requests", { title: "Pending Leave Requests" });
});

router.get('/leave-requests/approved', isAuth, (req, res) => {
  res.render("leave-requests", { title: "Approved Leave Requests" });
});

router.get('/leave-requests/all', isAuth, (req, res) => {
  res.render("leave-requests", { title: "All Leave Requests" });
});

router.post('/leave-requests', isAuth, (req, res) => {
  res.json({ message: 'Leave request saved' });
});

router.get('/leaves', isAuth, (req, res) => {
  res.render("leave-requests", { title: "Leave Management" });
});

export default router;
