import { Router } from 'express';

const router = Router();

router.get('/attendance', (req, res) => {
  res.render("attendance", { title: "Attendance" });
});

router.post('/attendance', (req, res) => {
  res.json({ message: 'Attendance saved' });
});

router.get('/leave-requests', (req, res) => {
  res.render("leave-requests", { title: "Leave Requests" });
});

router.get('/leave-requests/pending', (req, res) => {
  res.render("leave-requests", { title: "Pending Leave Requests" });
});

router.get('/leave-requests/approved', (req, res) => {
  res.render("leave-requests", { title: "Approved Leave Requests" });
});

router.get('/leave-requests/all', (req, res) => {
  res.render("leave-requests", { title: "All Leave Requests" });
});

router.post('/leave-requests', (req, res) => {
  res.json({ message: 'Leave request saved' });
});

router.get('/leaves', (req, res) => {
  res.render("leave-requests", { title: "Leave Management" });
});

export default router;
