import { Router } from 'express';

const router = Router();

// User Routes
router.get('/users', (req, res) => {
  res.render("users/list", { title: "Users" });
});

router.get('/users/add', (req, res) => {
  res.render("users/add", { title: "Add User" });
});

router.get('/users/edit/:id', (req, res) => {
  res.render("users/edit", { title: "Edit User", user: {} });
});

router.get('/users/view/:id', (req, res) => {
  res.render("users/view", { title: "View User", user: {} });
});

router.post('/users', (req, res) => {
  res.json({ message: 'User created' });
});

router.get('/performance-reviews', (req, res) => {
  res.render("performance-reviews/list", { title: "Performance Reviews" });
});

router.get('/performance-reviews/add', (req, res) => {
  res.render("performance-reviews/add", { title: "New Review" });
});

router.get('/performance-reviews/edit/:id', (req, res) => {
  res.render("performance-reviews/edit", { title: "Edit Review", review: {} });
});

router.get('/performance-reviews/view/:id', (req, res) => {
  res.render("performance-reviews/view", { title: "View Review", review: {} });
});

router.get('/roles', (req, res) => {
  res.render("roles/list", { title: "Roles & Permissions" });
});

router.get('/roles/add', (req, res) => {
  res.render("roles/add", { title: "Add Role" });
});

router.get('/roles/edit/:id', (req, res) => {
  res.render("roles/edit", { title: "Edit Role", role: {} });
});

router.get('/roles/view/:id', (req, res) => {
  res.render("roles/view", { title: "View Role", role: {} });
});

router.post('/roles', (req, res) => {
  res.json({ message: 'Role created' });
});

router.get('/audit-logs', (req, res) => {
  res.render("audit-logs/list", { title: "Audit Logs" });
});

router.get('/approvals', (req, res) => {
  res.render("approvals/list", { title: "Approvals" });
});

router.get('/approvals/add', (req, res) => {
  res.render("approvals/add", { title: "Add Approval" });
});

router.get('/approvals/edit/:id', (req, res) => {
  res.render("approvals/edit", { title: "Edit Approval", approval: {} });
});

router.get('/approvals/view/:id', (req, res) => {
  res.render("approvals/view", { title: "View Approval", approval: {} });
});

router.get('/assets', (req, res) => {
  res.render("assets/list", { title: "Asset Management" });
});

router.get('/assets/issue', (req, res) => {
  res.render("assets/add", { title: "Issue Asset" });
});

router.get('/assets/view/:id', (req, res) => {
  res.render("assets/view", { title: "View Asset", asset: {} });
});

router.get('/assets/return/:id', (req, res) => {
  res.render("assets/return", { title: "Return Asset", asset: {} });
});

router.get('/asset-issue', (req, res) => {
  res.redirect('/assets/issue');
});

router.post('/asset-issue', (req, res) => {
  res.json({ message: 'Asset issued' });
});

router.get('/tasks', (req, res) => {
  res.render("tasks/list", { title: "Task Management" });
});

router.get('/tasks/add', (req, res) => {
  res.render("tasks/add", { title: "New Task" });
});

router.get('/tasks/edit/:id', (req, res) => {
  res.render("tasks/edit", { title: "Edit Task", task: {} });
});

router.get('/tasks/view/:id', (req, res) => {
  res.render("tasks/view", { title: "View Task", task: {} });
});

router.post('/tasks', (req, res) => {
  res.json({ message: 'Task created' });
});

router.get('/events', (req, res) => {
  res.render("events/list", { title: "Event Management" });
});

router.get('/events/add', (req, res) => {
  res.render("events/add", { title: "New Event" });
});

router.get('/events/edit/:id', (req, res) => {
  res.render("events/edit", { title: "Edit Event", event: {} });
});

router.get('/events/view/:id', (req, res) => {
  res.render("events/view", { title: "View Event", event: {} });
});

router.post('/events', (req, res) => {
  res.json({ message: 'Event created' });
});

router.get('/news', (req, res) => {
  res.render("news/list", { title: "News & Articles" });
});

router.get('/news/add', (req, res) => {
  res.render("news/add", { title: "Publish News" });
});

router.get('/news/edit/:id', (req, res) => {
  res.render("news/edit", { title: "Edit News", news: {} });
});

router.get('/news/view/:id', (req, res) => {
  res.render("news/view", { title: "View News", news: {} });
});

router.post('/news', (req, res) => {
  res.json({ message: 'Article published' });
});

router.get('/notifications', (req, res) => {
  res.render("notifications/list", { title: "Notifications" });
});

router.get('/notifications/add', (req, res) => {
  res.render("notifications/add", { title: "Send Notification" });
});

router.get('/notifications/edit/:id', (req, res) => {
  res.render("notifications/edit", { title: "Edit Notification", notification: {} });
});

router.get('/notifications/view/:id', (req, res) => {
  res.render("notifications/view", { title: "View Notification", notification: {} });
});

router.post('/notifications', (req, res) => {
  res.json({ message: 'Notification sent' });
});

router.get('/holidays', (req, res) => {
  res.render("holidays/list", { title: "Holiday Management" });
});

router.get('/holidays/add', (req, res) => {
  res.render("holidays/add", { title: "Add Holiday" });
});

router.get('/holidays/edit/:id', (req, res) => {
  res.render("holidays/edit", { title: "Edit Holiday", holiday: {} });
});

router.get('/holidays/view/:id', (req, res) => {
  res.render("holidays/view", { title: "View Holiday", holiday: {} });
});

router.post('/holidays', (req, res) => {
  res.json({ message: 'Holiday added' });
});

export default router;
