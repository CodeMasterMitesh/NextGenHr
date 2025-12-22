import { Router } from 'express';

const router = Router();

router.get('/users', (req, res) => {
  res.render("users", { title: "Users" });
});

router.post('/users', (req, res) => {
  res.json({ message: 'User created' });
});

router.get('/roles', (req, res) => {
  res.render("roles", { title: "Roles & Permissions" });
});

router.post('/roles', (req, res) => {
  res.json({ message: 'Role created' });
});

router.get('/audit-logs', (req, res) => {
  res.render("audit-logs", { title: "Audit Logs" });
});

router.get('/approvals', (req, res) => {
  res.render("approvals", { title: "Approvals" });
});

router.get('/asset-issue', (req, res) => {
  res.render("asset-issue", { title: "Asset Issue" });
});

router.post('/asset-issue', (req, res) => {
  res.json({ message: 'Asset issued' });
});

router.get('/asset-return', (req, res) => {
  res.render("asset-return", { title: "Asset Return" });
});

router.post('/asset-return', (req, res) => {
  res.json({ message: 'Asset returned' });
});

router.get('/tasks', (req, res) => {
  res.render("tasks", { title: "Task Management" });
});

router.post('/tasks', (req, res) => {
  res.json({ message: 'Task created' });
});

router.get('/events', (req, res) => {
  res.render("events", { title: "Event Management" });
});

router.post('/events', (req, res) => {
  res.json({ message: 'Event created' });
});

router.get('/news', (req, res) => {
  res.render("news", { title: "News & Articles" });
});

router.post('/news', (req, res) => {
  res.json({ message: 'Article published' });
});

router.get('/notifications', (req, res) => {
  res.render("notifications", { title: "Notifications" });
});

router.post('/notifications', (req, res) => {
  res.json({ message: 'Notification sent' });
});

router.get('/holidays', (req, res) => {
  res.render("holidays", { title: "Holiday Management" });
});

router.post('/holidays', (req, res) => {
  res.json({ message: 'Holiday added' });
});

export default router;
