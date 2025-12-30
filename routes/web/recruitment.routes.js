import { Router } from 'express';

const router = Router();

router.get('/jobpost', (req, res) => {
  res.render("jobpost/list", { title: "Job Posts" });
});

router.get('/jobpost/add', (req, res) => {
  res.render("jobpost/add", { title: "Create Job Post" });
});

router.get('/jobpost/edit/:id', (req, res) => {
  res.render("jobpost/edit", { title: "Edit Job Post", job: {} });
});

router.get('/jobpost/view/:id', (req, res) => {
  res.render("jobpost/view", { title: "View Job Post", job: {} });
});

router.get('/viewjobpost', (req, res) => {
  res.render("viewjobpost", { title: "Job Details" });
});

router.get('/job-applications', (req, res) => {
  res.render("job-applications/list", { title: "Job Applications" });
});

router.get('/job-applications/add', (req, res) => {
  res.render("job-applications/add", { title: "New Application" });
});

router.get('/job-applications/edit/:id', (req, res) => {
  res.render("job-applications/edit", { title: "Edit Application", application: {} });
});

router.get('/job-applications/view/:id', (req, res) => {
  res.render("job-applications/view", { title: "View Application", application: {} });
});

router.get('/job-requisition', (req, res) => {
  res.render("job-requisition", { title: "Job Requisition Management" });
});

router.get('/job-posting', (req, res) => {
  res.render("job-posting", { title: "Job Posting & Advertisement" });
});

router.get('/resumes', (req, res) => {
  res.render("resumes", { title: "Resume Management" });
});

router.get('/interview-schedule', (req, res) => {
  res.render("interviews/list", { title: "Interview Schedule" });
});

router.get('/interview-schedule/add', (req, res) => {
  res.render("interviews/add", { title: "Schedule Interview" });
});

router.get('/interview-schedule/edit/:id', (req, res) => {
  res.render("interviews/edit", { title: "Edit Interview", interview: {} });
});

router.get('/interview-schedule/view/:id', (req, res) => {
  res.render("interviews/view", { title: "View Interview", interview: {} });
});

router.get('/onboarding', (req, res) => {
  res.render("onboarding/list", { title: "Employee Onboarding" });
});

router.get('/onboarding/add', (req, res) => {
  res.render("onboarding/add", { title: "New Onboarding" });
});

router.get('/onboarding/edit/:id', (req, res) => {
  res.render("onboarding/edit", { title: "Edit Onboarding", onboarding: {} });
});

router.get('/onboarding/view/:id', (req, res) => {
  res.render("onboarding/view", { title: "View Onboarding", onboarding: {} });
});

router.get('/training-schedule', (req, res) => {
  res.render("training/list", { title: "Training Schedule" });
});

router.get('/training-schedule/add', (req, res) => {
  res.render("training/add", { title: "Schedule Training" });
});

router.get('/training-schedule/edit/:id', (req, res) => {
  res.render("training/edit", { title: "Edit Training", training: {} });
});

router.get('/training-schedule/view/:id', (req, res) => {
  res.render("training/view", { title: "View Training", training: {} });
});

router.get('/exam', (req, res) => {
  res.render("exam/list", { title: "Employee Exams" });
});

router.get('/exam/add', (req, res) => {
  res.render("exam/add", { title: "Add Exam" });
});

router.get('/exam/edit/:id', (req, res) => {
  res.render("exam/add", { title: "Edit Exam" });
});

export default router;
