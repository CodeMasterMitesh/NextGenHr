import { Router } from 'express';
import authRoutes from './auth.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import employeeRoutes from './employee.routes.js';
import branchRoutes from './branch.routes.js';
import payrollRoutes from './payroll.routes.js';
import recruitmentRoutes from './recruitment.routes.js';
import attendanceRoutes from './attendance.routes.js';
import commonRoutes from './common.routes.js';
import isAuth from '../../middleware/auth.js';

const router = Router();

router.use(authRoutes);

// Protect everything below this line; login/home stay public
router.use(isAuth);
router.use(dashboardRoutes);
router.use(employeeRoutes);
router.use(branchRoutes);
router.use(payrollRoutes);
router.use(recruitmentRoutes);
router.use(attendanceRoutes);
router.use(commonRoutes);

export default router;