import { Router } from 'express';

const router = Router();

// Branch Routes
router.get('/attendancereport', (req, res) => {
  res.render("reports/attendancereport/list", { title: "Attendance Report" });
});

export default router;