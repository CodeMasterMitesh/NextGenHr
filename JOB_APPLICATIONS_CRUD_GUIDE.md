# Job Applications CRUD Testing Guide

## Overview
Complete CRUD implementation with pagination for Job Applications module has been successfully implemented.

## Features Implemented

### 1. **Create (Add New Application)**
- **Route**: `/job-applications/add`
- **Features**:
  - Upload resume (PDF, DOC, DOCX)
  - Required fields: Name, Position, Email, Phone
  - File validation (10MB limit)
  - Toast notifications for success/error
  - Auto-redirect to list after success

### 2. **Read (List with Pagination)**
- **Route**: `/job-applications`
- **Features**:
  - Display all applications in a table
  - Pagination (10 items per page)
  - Search functionality (name, email, position, phone)
  - Show total count
  - Resume download link
  - Action buttons (View, Edit, Delete)
  - Empty state handling

### 3. **Read (View Single Application)**
- **Route**: `/job-applications/view/:id`
- **Features**:
  - Display complete application details
  - Download resume
  - Show application tracking timeline
  - Edit and Delete buttons
  - Navigate back to list

### 4. **Update (Edit Application)**
- **Route**: `/job-applications/edit/:id`
- **Features**:
  - Pre-filled form with existing data
  - Update all fields including resume
  - Optional resume replacement
  - Show current resume
  - Delete button
  - Form validation

### 5. **Delete**
- **Available in**:
  - List page (trash icon)
  - View page (delete button)
  - Edit page (delete button)
- **Features**:
  - Confirmation dialog
  - Deletes resume file from server
  - Toast notification
  - Auto-redirect after deletion

## API Endpoints

### Create
- `POST /api/storeJobVacancy` - Create new application (with file upload)

### Read
- `GET /api/getApplications?page=1&limit=10&search=keyword` - Get all with pagination
- `GET /api/getSingleJobAppData/:id` - Get single application by ID

### Update
- `PUT /api/updateJobApplication/:id` - Update application (with optional file upload)

### Delete
- `DELETE /api/deleteJobApplication/:id` - Delete application

## Database Schema

```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  position: String (required),
  resume: String (file path),
  department: ObjectId (ref: Departments),
  designation: ObjectId (ref: Designations),
  appliedAt: Date (default: now),
  approved_by: ObjectId (ref: Employee),
  status: String (enum: applied, shortlisted, rejected, selected),
  timestamps: true (createdAt, updatedAt)
}
```

## File Upload
- **Directory**: `public/uploads/`
- **Max Size**: 10MB
- **Allowed Types**: PDF, DOC, DOCX
- **Naming**: `timestamp-originalfilename.ext`
- **Storage**: Files stored in public folder, accessible via `/uploads/filename`

## Testing Steps

### 1. Test Create
1. Navigate to `/job-applications/add`
2. Fill in all required fields
3. Upload a resume file
4. Click "Create Application"
5. Verify toast notification
6. Check redirect to list page
7. Verify new entry appears in list

### 2. Test List & Pagination
1. Navigate to `/job-applications`
2. Verify all applications are displayed
3. Check pagination controls appear (if > 10 items)
4. Click next/previous page buttons
5. Verify page navigation works correctly
6. Check total count is accurate

### 3. Test Search
1. On list page, enter search term
2. Click search button
3. Verify filtered results
4. Test with different fields (name, email, position)
5. Click "Clear" to reset

### 4. Test View
1. Click "View" (eye icon) on any application
2. Verify all details are displayed correctly
3. Click resume link to download
4. Test navigation buttons (Back, Edit)

### 5. Test Edit
1. Click "Edit" (pencil icon) on any application
2. Verify form is pre-filled with current data
3. Modify some fields
4. Optionally upload new resume
5. Click "Update Application"
6. Verify toast notification
7. Check changes are reflected in list/view

### 6. Test Delete
1. Click "Delete" (trash icon) on any application
2. Confirm deletion in dialog
3. Verify toast notification
4. Check application is removed from list
5. Verify resume file is deleted from server

## Error Handling

All operations include:
- Try-catch blocks
- Proper error messages
- User-friendly toast notifications
- Console logging for debugging
- HTTP status codes
- Validation on both client and server

## Files Modified/Created

1. **Controller**: `controller/JobVacancyApplications.js` - Complete rewrite with pagination
2. **API Routes**: `routes/api/jobvacancyapplications.routes.js` - Updated with multer support
3. **Web Routes**: `routes/web/recruitment.routes.js` - Added data fetching
4. **Schema**: `schemas/JobVacancyApplications.js` - Added phone and status fields
5. **Views**:
   - `views/job-applications/list.ejs` - Dynamic data + pagination
   - `views/job-applications/view.ejs` - Dynamic display
   - `views/job-applications/edit.ejs` - Form with AJAX submission
   - `views/job-applications/add.ejs` - Form with AJAX submission
6. **Directory**: `public/uploads/` - Created for file storage
7. **Git**: `.gitignore` - Updated to ignore uploads but keep directory

## Security Features
- File type validation
- File size limits
- Server-side validation
- XSS protection (EJS escaping)
- Proper error handling
- No sensitive data exposure

## Next Steps (Optional Enhancements)
1. Add status change workflow
2. Email notifications
3. Interview scheduling integration
4. Advanced filters (by status, date range)
5. Export to CSV/PDF
6. Bulk actions
7. Application comments/notes
8. Document preview (PDF viewer)
