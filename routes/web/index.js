import { Router } from 'express';
import authRoutes from './auth.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import employeeRoutes from './employee.routes.js';
import branchRoutes from './branch.routes.js';
import payrollRoutes from './payroll.routes.js';
import recruitmentRoutes from './recruitment.routes.js';
import attendanceRoutes from './attendance.routes.js';
import commonRoutes from './common.routes.js';

const router = Router();

router.use(authRoutes);
router.use(dashboardRoutes);
router.use(employeeRoutes);
router.use(branchRoutes);
router.use(payrollRoutes);
router.use(recruitmentRoutes);
router.use(attendanceRoutes);
router.use(commonRoutes);

export default router;