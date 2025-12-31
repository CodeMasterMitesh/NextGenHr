import { Router } from 'express';

const router = Router();

// Module Management Routes
router.get('/module-management', (req, res) => {
  res.render('modules/list', { title: 'Module Management' });
});

router.get('/module-management/add', (req, res) => {
  res.render('modules/add', { title: 'Add Module' });
});

router.get('/module-management/edit/:id', (req, res) => {
  res.render('modules/edit', { title: 'Edit Module', module: {} });
});

router.get('/module-management/view/:id', (req, res) => {
  res.render('modules/view', { title: 'View Module', module: {} });
});

export default router;
