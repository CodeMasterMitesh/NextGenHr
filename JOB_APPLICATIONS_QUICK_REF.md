# Job Applications CRUD - Quick Reference

## 🎯 Summary
Complete CRUD implementation with pagination for managing job applications including file upload support.

## 📋 Features
✅ Create new applications with resume upload  
✅ List all applications with pagination (10 per page)  
✅ Search by name, email, position, or phone  
✅ View complete application details  
✅ Edit applications with optional resume replacement  
✅ Delete applications with confirmation  
✅ File management (auto-delete old files on update/delete)  
✅ Toast notifications for all actions  
✅ Responsive UI with Bootstrap 5  

## 🔗 Routes

### Web Routes
| Method | Path | Description |
|--------|------|-------------|
| GET | `/job-applications` | List with pagination & search |
| GET | `/job-applications/add` | Add new application form |
| GET | `/job-applications/view/:id` | View application details |
| GET | `/job-applications/edit/:id` | Edit application form |

### API Routes
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/storeJobVacancy` | Create application (with file) |
| GET | `/api/getApplications` | Get all (with ?page=1&limit=10&search=keyword) |
| GET | `/api/getSingleJobAppData/:id` | Get one by ID |
| PUT | `/api/updateJobApplication/:id` | Update (with optional file) |
| DELETE | `/api/deleteJobApplication/:id` | Delete application |

## 📁 Files Changed
1. ✅ `controller/JobVacancyApplications.js` - Rewrote with pagination & file handling
2. ✅ `routes/api/jobvacancyapplications.routes.js` - Added multer support for updates
3. ✅ `routes/web/recruitment.routes.js` - Fetch real data from database
4. ✅ `schemas/JobVacancyApplications.js` - Added phone & status fields
5. ✅ `views/job-applications/list.ejs` - Dynamic table + pagination + search
6. ✅ `views/job-applications/view.ejs` - Display real data
7. ✅ `views/job-applications/edit.ejs` - Form with AJAX + file upload
8. ✅ `views/job-applications/add.ejs` - Form with AJAX + file upload
9. ✅ `public/uploads/` - Directory created for file storage
10. ✅ `.gitignore` - Updated to ignore uploads but keep directory

## 🗄️ Schema Fields
```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  position: String (required),
  resume: String,
  department: ObjectId,
  designation: ObjectId,
  appliedAt: Date,
  approved_by: ObjectId,
  status: String (enum),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 How to Test

### Test Create:
1. Go to `/job-applications/add`
2. Fill form + upload resume
3. Submit → Should show success toast
4. Redirects to list page

### Test List & Pagination:
1. Go to `/job-applications`
2. See all applications in table
3. Use pagination if > 10 items
4. Try search functionality

### Test View:
1. Click eye icon on any row
2. See all details
3. Download resume
4. Navigate to edit/back

### Test Edit:
1. Click pencil icon on any row
2. Modify fields
3. Optionally upload new resume
4. Submit → Should show success toast

### Test Delete:
1. Click trash icon on any row
2. Confirm deletion
3. Application removed + file deleted

## 🎨 UI Components
- Bootstrap 5 cards and tables
- Bootstrap Icons
- Pagination controls
- Search bar
- Toast notifications
- Loading spinners
- Empty states

## 🔒 Security
- File type validation (.pdf, .doc, .docx)
- File size limit (10MB)
- Server-side validation
- XSS protection (EJS auto-escaping)
- Confirmation dialogs for delete
- Error handling everywhere

## 📦 Dependencies Used
- `express` - Web framework
- `multer` - File upload handling
- `mongoose` - MongoDB ODM
- `ejs` - Templating engine
- Bootstrap 5 - UI framework
- Bootstrap Icons - Icons

## 💡 Key Implementation Details

**Pagination Logic:**
- Default: 10 items per page
- Query params: `?page=1&limit=10&search=keyword`
- Shows page numbers with ellipsis for many pages
- Maintains search term across pages

**File Upload:**
- Stored in `public/uploads/`
- Filename: `timestamp-originalname.ext`
- Old files deleted on update/delete
- Accessible via `/uploads/filename`

**AJAX Forms:**
- All forms submit via fetch API
- Show loading states
- Toast notifications
- Auto-redirect on success
- Error handling with user feedback

## ✨ Next Enhancements (Optional)
- [ ] Status workflow management
- [ ] Email notifications
- [ ] Advanced filters (date range, status)
- [ ] Export to CSV/Excel
- [ ] Bulk operations
- [ ] Interview scheduling
- [ ] Document preview
- [ ] Application notes/comments
