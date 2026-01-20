import { Router } from 'express';
import Department from '../../models/Department.js';

const router = Router();

// Employee Routes
router.get('/employees', (req, res) => {
  res.render("employees/list", { title: "Employees" });
});

router.get('/employees/add', (req, res) => {
  res.render("employees/add", { title: "Add Employee" });
});

router.get('/employees/edit/:id', (req, res) => {
  res.render("employees/edit", { title: "Edit Employee", employee: {} });
});

router.get('/employees/view/:id', (req, res) => {
  res.render("employees/view", { title: "View Employee", employee: {} });
});

router.post('/employees', (req, res) => {
  res.json({ message: 'Employee saved' });
});

// Department Routes
router.get('/departments', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    
    const searchQuery = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    } : {};
    
    const total = await Department.countDocuments(searchQuery);
    const departments = await Department.find(searchQuery)
      .populate('company_id', 'name')
      .populate('branch_id', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    res.render("departments/list", { 
      title: "Departments",
      departments: departments,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit)
      },
      search: search,
      partial: false
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.render("departments/list", { 
      title: "Departments",
      departments: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      search: '',
      partial: false
    });
  }
});

router.get('/departments/add', (req, res) => {
  res.render("departments/add", { title: "Add Department", partial: false });
});

router.get('/departments/edit/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('company_id', 'name')
      .populate('branch_id', 'name')
      .lean();
    
    if (!department) {
      return res.redirect('/departments');
    }
    
    res.render("departments/edit", { 
      title: "Edit Department", 
      department: department,
      partial: false
    });
  } catch (error) {
    console.error('Error fetching department:', error);
    res.redirect('/departments');
  }
});

router.get('/departments/view/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('company_id', 'name')
      .populate('branch_id', 'name')
      .lean();
    
    if (!department) {
      return res.redirect('/departments');
    }
    
    res.render("departments/view", { 
      title: "View Department", 
      department: department,
      partial: false
    });
  } catch (error) {
    console.error('Error fetching department:', error);
    res.redirect('/departments');
  }
});

// Designation Routes
router.get('/designations', (req, res) => {
  res.render("designations/list", { title: "Designations" });
});

router.get('/designations/add', (req, res) => {
  res.render("designations/add", { title: "Add Designation" });
});

router.get('/designations/edit/:id', (req, res) => {
  res.render("designations/edit", { title: "Edit Designation", designation: {} });
});

router.get('/designations/view/:id', (req, res) => {
  res.render("designations/view", { title: "View Designation", designation: {} });
});

router.post('/designations', (req, res) => {
  res.json({ message: 'Designation saved' });
});


// Holiday Routes
router.get('/holiday', (req, res) => {
  res.render("holiday/list", { title: "holiday" });
});

router.get('/holiday/add', (req, res) => {
  res.render("holiday/add", { title: "Add Holiday" });
});

router.get('/holiday/edit/:id', (req, res) => {
  res.render("holiday/edit", { title: "Edit Holiday", holiday: {} });
});

router.get('/holiday/view/:id', (req, res) => {
  res.render("holiday/view", { title: "View Holiday", holiday: {} });
});
export default router;
