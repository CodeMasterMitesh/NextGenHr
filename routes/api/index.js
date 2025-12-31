import { Router } from 'express';

import compnayRoutes from './company.routes.js';
import branchRoutes from './branch.routes.js';
import auth from './auth.routes.js';
import JobApplication from './jobvacancyapplications.routes.js';
import usersApi from './user.routes.js';
import isAuth from '../../middleware/auth.js';
const router = Router();

// Protect everything below this line; login/home stay public
router.use(isAuth);
router.use(JobApplication);
router.use(compnayRoutes);
router.use(usersApi);
router.use(branchRoutes);
router.use(auth);

export default router;