import { Router } from 'express';

import compnayRoutes from './company.routes.js';
import branchRoutes from './branch.routes.js';
import auth from './auth.routes.js';
import JobApplication from './jobvacancyapplications.routes.js';
import usersApi from './user.routes.js';

const router = Router();

router.use(JobApplication);
router.use(compnayRoutes);
router.use(usersApi);
router.use(branchRoutes);
router.use(auth);

export default router;