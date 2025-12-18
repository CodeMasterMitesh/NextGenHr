# NextGenHR - Complete Routes & Pages Documentation

## Overview
This document provides a complete list of all views/pages and their corresponding routes in the NextGenHR application.

---

## Routes & Pages Summary

### 1. **Public Routes**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/` | GET | `index.ejs` | Home Page |
| `/login` | GET | `login.ejs` | Login Page |

---

### 2. **Dashboard**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/dashboard` | GET | `dashboard.ejs` | Main Dashboard with KPI cards and analytics |

---

### 3. **Employee Management**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/employees` | GET | `employees.ejs` | List all employees |
| `/employees/new` | GET | `employee-form.ejs` | Add new employee form |
| `/employees` | POST | - | Create/Update employee (API) |

---

### 4. **Departments**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/departments` | GET | `departments.ejs` | List departments with modal add form |
| `/departments` | POST | - | Create/Update department |

---

### 5. **Designations**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/designations` | GET | `designations.ejs` | List designations with modal add form |
| `/designations` | POST | - | Create/Update designation |

---

### 6. **Branches**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/branches` | GET | `branches.ejs` | List branches with modal add form |
| `/branches` | POST | - | Create/Update branch |

---

### 7. **Company**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/company` | GET | `company.ejs` | Company information and settings |
| `/company` | POST | - | Update company information |

---

### 8. **Attendance**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/attendance` | GET | `attendance.ejs` | View attendance records with modal marking |
| `/attendance` | POST | - | Mark attendance |

---

### 9. **Leave Requests**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/leave-requests` | GET | `leave-requests.ejs` | All leave requests with filters |
| `/leave-requests/pending` | GET | `leave-requests.ejs` | Pending leave requests |
| `/leave-requests/approved` | GET | `leave-requests.ejs` | Approved leave requests |
| `/leave-requests/all` | GET | `leave-requests.ejs` | All leave requests (alternative) |
| `/leave-requests` | POST | - | Submit new leave request |

---

### 10. **Payroll**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/payroll` | GET | `payroll.ejs` | Payroll management with processing modal |
| `/payroll` | POST | - | Process payroll |

---

### 11. **Payslips**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/payslips` | GET | `payslips.ejs` | View and download payslips |

---

### 12. **Performance Reviews**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/performance-reviews` | GET | `performance-reviews.ejs` | List performance reviews with modal form |
| `/performance-reviews` | POST | - | Submit performance review |

---

### 13. **Users Management**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/users` | GET | `users.ejs` | List system users with modal add form |
| `/users` | POST | - | Create new user |

---

### 14. **Roles & Permissions**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/roles` | GET | `roles.ejs` | List roles with modal add/edit form |
| `/roles` | POST | - | Create/Update role |

---

### 15. **Audit Logs**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/audit-logs` | GET | `audit-logs.ejs` | System activity logs with filters |

---

### 16. **Approvals**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/approvals` | GET | `approvals.ejs` | Pending approvals with approval stats |

---

### 17. **Job Portal**
| Route | Method | View File | Purpose |
|-------|--------|-----------|---------|
| `/jobpost` | GET | `jobpost.ejs` | List all job posts |
| `/jobpost/new` | GET | `jobpost-form.ejs` | Create new job post form |
| `/jobpost` | POST | - | Submit new job post (API) |
| `/viewjobpost` | GET | `viewjobpost.ejs` | View job post details |
| `/job-applications` | GET | `job-applications.ejs` | List job applications |

---

## View Files Created (15 total)

1. ✅ `employees.ejs` - Employee list with table
2. ✅ `employee-form.ejs` - Add/Edit employee form
3. ✅ `departments.ejs` - Department management with modal
4. ✅ `designations.ejs` - Designation management with modal
5. ✅ `branches.ejs` - Branch management with modal
6. ✅ `company.ejs` - Company settings form
7. ✅ `attendance.ejs` - Attendance tracking
8. ✅ `leave-requests.ejs` - Leave request management
9. ✅ `payroll.ejs` - Payroll processing
10. ✅ `payslips.ejs` - Payslip view/download
11. ✅ `performance-reviews.ejs` - Performance review management
12. ✅ `users.ejs` - User management
13. ✅ `roles.ejs` - Role & permission management
14. ✅ `audit-logs.ejs` - Audit logs viewer
15. ✅ `approvals.ejs` - Approval dashboard
16. ✅ `jobpost.ejs` - Job post listing
17. ✅ `jobpost-form.ejs` - Create job post form
18. ✅ `job-applications.ejs` - Job applications viewer

---

## Server.js Route Structure

All routes are organized with clear sections:
- Public Routes (/, /login)
- Dashboard (/dashboard)
- Employee Management
- Departments
- Designations
- Branches
- Company
- Attendance
- Leave Requests
- Payroll
- Payslips
- Performance Reviews
- Users
- Roles & Permissions
- Audit Logs
- Approvals
- Job Portal

---

## Navigation Map

### Main Menu (Sidebar)
```
├── Dashboard
├── HR Management
│   ├── Employees
│   ├── Departments
│   ├── Designations
│   ├── Branches
│   └── Company
├── Attendance & Leave
│   ├── Attendance
│   └── Leave Requests
├── Payroll & Performance
│   ├── Payroll
│   ├── Payslips
│   └── Performance Reviews
├── Administration
│   ├── Users
│   ├── Roles & Permissions
│   ├── Audit Logs
│   └── Approvals
└── Job Portal
    ├── Job Posts
    └── Applications
```

---

## Key Features

### Dashboard
- 8 KPI Cards showing key metrics
- Pending Approvals widget
- Recent Activities timeline
- Quick Actions buttons

### Forms & Modals
- Employee add/edit form (full form)
- Department modal (quick add)
- Designation modal (quick add)
- Branch modal (quick add)
- Company settings form
- Attendance marking modal
- Leave request modal
- Payroll processing modal
- Performance review modal
- User management modal
- Role creation modal
- Job post creation form

### Features Per Page
- **Employees**: Table with search, view, edit, delete actions
- **Departments/Designations/Branches**: Modal-based quick add forms
- **Attendance**: Filter by date/employee/status
- **Leave Requests**: Filter by status and type, approve/reject actions
- **Payroll**: Month filter, status tracking
- **Performance Reviews**: Rating system (1-5) for 4 categories
- **Users**: User list with role assignment
- **Roles**: Permission checkboxes for granular control
- **Audit Logs**: Comprehensive activity tracking
- **Approvals**: Approval stats with progress bars
- **Job Portal**: Job listing and application management

---

## Implementation Notes

1. All routes are integrated in `server.js`
2. All views use the same layout structure (`layouts/header.ejs` and `layouts/footer.ejs`)
3. Dashboard has custom CSS class for styling (`pageClass: 'dashboard-page'`)
4. Forms use Bootstrap modals for quick add operations
5. All tables are responsive with Bootstrap classes
6. API endpoints can be further developed in corresponding API files
7. Database operations need to be implemented in respective API route handlers

---

## Next Steps

1. Connect MongoDB collections to each route
2. Implement CRUD operations in API files
3. Add authentication/authorization middleware
4. Add form validation
5. Implement search and filtering on backend
6. Add data export features (CSV/PDF)
7. Add notifications/alerts system
8. Implement user session management
9. Add error handling and logging
10. Deploy to production

