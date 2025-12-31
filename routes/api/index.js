import { Router } from 'express';

import compnayRoutes from './company.routes.js';
import branchRoutes from './branch.routes.js';
import auth from './auth.routes.js';
import JobApplication from './jobvacancyapplications.routes.js';
import usersApi from './user.routes.js';
import softwareRoutes from './software.routes.js';
import moduleRoutes from './module.routes.js';
import seedMenus from '../../seedMenus.js';
import isAuth from '../../middleware/auth.js';
const router = Router();

// Seed route for menu initialization (development only)
router.get('/seed-menus', async (req, res) => {
    try {
        await seedMenus();
        res.json({ success: true, message: 'Menus seeded successfully!' });
    } catch (error) {
        console.error('Seed error:', error);
        res.status(500).json({ success: false, message: 'Failed to seed menus', error: error.message });
    }
});

// Protect everything below this line; login/home stay public
// router.use(isAuth);

// Mount software and module routes FIRST before other routes
// This ensures specific paths like /software/management work
router.use(softwareRoutes);
router.use(moduleRoutes);

router.use(JobApplication);
router.use(compnayRoutes);
router.use(usersApi);
router.use(branchRoutes);
router.use(auth);

export default router;