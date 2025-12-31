# Menu Seeding Guide

## Overview
The dynamic sidebar menu system uses the `Software` (parent menus) and `Module` (child menus) collections in MongoDB. This guide explains how to populate the menu structure.

## Quick Start

### Option 1: Using NPM Script (Recommended)
```bash
npm run seed:menus
```

### Option 2: Using Node Directly
```bash
node seedMenus.js
```

### Option 3: Using API Endpoint (Browser)
Navigate to: `http://localhost:3000/api/seed-menus`

## What Gets Seeded

The script creates the following menu structure (matching your existing header.ejs):

1. **HR Management** - Employee & organizational management
   - Employees
   - Departments
   - Designations
   - Branches
   - Company

2. **Attendance & Leave** - Time tracking & leave management
   - Attendance
   - Leave Requests
   - Leaves

3. **Payroll** - Salary & compensation
   - Payroll
   - Payslips
   - Salary
   - Shift Management
   - Weekoff
   - Earnings & Deductions

4. **Recruitment** - Hiring process
   - Job Requisition
   - Job Posting
   - Applications
   - Resumes
   - Interviews
   - Onboarding
   - Training

5. **Performance & Development** - Reviews & evaluations
   - Performance Reviews
   - Exams

6. **Asset Management** - Equipment management
   - Issue
   - Return

7. **Tasks & Events** - Work & event management
   - Task Management
   - Events

8. **Administration** - System administration
   - Users
   - Roles & Permissions
   - Audit Logs
   - Approvals

9. **Common** - Shared resources
   - News & Articles
   - Notifications
   - Holidays

## Route Validation

The system automatically validates that view files exist before displaying menu items:
- Only menus with valid EJS view files will be shown
- This prevents broken links in the sidebar
- Missing views are logged in the console

## Managing Menus

After seeding, you can manage menus through the UI:
- **Software Management**: `/software-management`
- **Module Management**: `/module-management`

Features:
- ✅ Add/Edit/Delete menus
- ✅ Toggle active/inactive status
- ✅ Change display order
- ✅ Update icons and routes
- ✅ Route validation before display

## Menu Properties

### Software (Parent Menu)
- `name` - Display name
- `icon` - Bootstrap icon class (e.g., 'bi-people-fill')
- `route` - URL path (optional, for direct links)
- `order` - Display order
- `isActive` - Show/hide menu
- `permissions` - Array of required permissions

### Module (Child Menu)
- `name` - Display name
- `icon` - Bootstrap icon class
- `route` - URL path (required)
- `order` - Display order within parent
- `isActive` - Show/hide submenu
- `softwareId` - Reference to parent Software
- `permissions` - Array of required permissions

## Resetting Menus

To reset to default structure:
```bash
npm run seed:menus
```

This will:
1. Clear all existing Software and Module records
2. Re-create the default menu structure
3. Validate all routes

## Troubleshooting

### Menus not showing
- Check database connection
- Run seed script: `npm run seed:menus`
- Verify view files exist in `/views` directory

### API endpoint not working
- Ensure server is running
- Check console for errors
- Verify MongoDB connection

### Some menus missing
- Check `isActive` status in database
- Verify view files exist at specified routes
- Check console for route validation errors

## Development Notes

The seed script:
- ✅ Uses async/await for clean error handling
- ✅ Validates connections before seeding
- ✅ Clears existing data to prevent duplicates
- ✅ Logs progress with emojis for clarity
- ✅ Provides summary statistics
- ✅ Gracefully closes database connections
