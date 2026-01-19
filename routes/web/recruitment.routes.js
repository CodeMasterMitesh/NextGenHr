import { Router } from 'express';
import JobVacancyApplications from '../../models/JobVacancyApplications.js';

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

router.get('/job-applications', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    console.log('Requested page:', page);
    const limit = 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    
    const searchQuery = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } }
      ]
    } : {};
    
    const total = await JobVacancyApplications.countDocuments(searchQuery);
    const applications = await JobVacancyApplications.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    res.render("job-applications/list", { 
      title: "Job Applications",
      applications: applications,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit)
      },
      search: search
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.render("job-applications/list", { 
      title: "Job Applications",
      applications: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      search: ''
    });
  }
});

router.get('/job-applications/add', (req, res) => {
  res.render("job-applications/add", { title: "New Application", partial: false });
});

router.get('/job-applications/edit/:id', async (req, res) => {
  try {
    const application = await JobVacancyApplications.findById(req.params.id)
      .populate('department', 'name')
      .populate('designation', 'name')
      .lean();
    
    if (!application) {
      return res.redirect('/job-applications');
    }
    
    res.render("job-applications/edit", { 
      title: "Edit Application", 
      application: application,
      partial: false 
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.redirect('/job-applications');
  }
});

router.get('/job-applications/view/:id', async (req, res) => {
  try {
    const application = await JobVacancyApplications.findById(req.params.id)
      .populate('department', 'name')
      .populate('designation', 'name')
      .lean();
    
    if (!application) {
      return res.redirect('/job-applications');
    }
    
    res.render("job-applications/view", { 
      title: "View Application", 
      application: application,
      partial: false 
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.redirect('/job-applications');
  }
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
