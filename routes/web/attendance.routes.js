import { Router } from 'express';
import isAuth from '../../middleware/auth.js';
const router = Router();

// Attendance Routes
router.get('/attendance', isAuth, (req, res) => {
  res.render("attendance/list", { title: "Attendance" });
});

router.get('/attendance/mark', isAuth, (req, res) => {
  res.render("attendance/add", { title: "Mark Attendance" });
});

router.get('/attendance/edit/:id', isAuth, (req, res) => {
  res.render("attendance/edit", { title: "Edit Attendance", attendance: {} });
});

router.get('/attendance/view/:id', isAuth, (req, res) => {
  res.render("attendance/view", { title: "View Attendance", attendance: {} });
});

router.post('/attendance', isAuth, (req, res) => {
  res.json({ message: 'Attendance saved' });
});

// Leave Request Routes
router.get('/leave-requests', isAuth, (req, res) => {
  res.render("leave-requests/list", { title: "Leave Requests" });
});

router.get('/leave-requests/add', isAuth, (req, res) => {
  res.render("leave-requests/add", { title: "New Leave Request" });
});

router.get('/leave-requests/edit/:id', isAuth, (req, res) => {
  res.render("leave-requests/edit", { title: "Edit Leave Request", leave: {} });
});

router.get('/leave-requests/view/:id', isAuth, (req, res) => {
  res.render("leave-requests/view", { title: "View Leave Request", leave: {} });
});

router.get('/leave-requests/pending', isAuth, (req, res) => {
  res.render("leave-requests/list", { title: "Pending Leave Requests", filter: 'pending' });
});

router.get('/leave-requests/approved', isAuth, (req, res) => {
  res.render("leave-requests/list", { title: "Approved Leave Requests", filter: 'approved' });
});

router.get('/leave-requests/all', isAuth, (req, res) => {
  res.render("leave-requests/list", { title: "All Leave Requests" });
});

router.post('/leave-requests', isAuth, (req, res) => {
  res.json({ message: 'Leave request saved' });
});

router.get('/leaves', isAuth, (req, res) => {
  res.render("leave-requests/list", { title: "Leave Management" });
});

export default router;
