import { Router } from 'express';

const router = Router();

// Software Management Routes
router.get('/software-management', (req, res) => {
  res.render('software/list', { title: 'Software Management' });
});

router.get('/software-management/add', (req, res) => {
  res.render('software/add', { title: 'Add Software' });
});

router.get('/software-management/edit/:id', (req, res) => {
  res.render('software/edit', { title: 'Edit Software', software: {} });
});

router.get('/software-management/view/:id', (req, res) => {
  res.render('software/view', { title: 'View Software', software: {} });
});

export default router;
