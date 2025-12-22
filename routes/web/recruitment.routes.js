import { Router } from 'express';

const router = Router();

router.get('/jobpost', (req, res) => {
  res.render("jobpost", { title: "Job Posts" });
});

router.get('/jobpost/new', (req, res) => {
  res.render("jobpost-form", { title: "Create Job Post" });
});

router.get('/viewjobpost', (req, res) => {
  res.render("viewjobpost", { title: "Job Details" });
});

router.get('/job-applications', (req, res) => {
  res.render("job-applications", { title: "Job Applications" });
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
  res.render("interview-schedule", { title: "Interview Schedule" });
});

router.get('/onboarding', (req, res) => {
  res.render("onboarding", { title: "Employee Onboarding" });
});

router.get('/training-schedule', (req, res) => {
  res.render("training-schedule", { title: "Training Schedule" });
});

router.get('/exam', (req, res) => {
  res.render("exam", { title: "Employee Exams" });
});

export default router;
