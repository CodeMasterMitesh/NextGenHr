/**
 * TOAST NOTIFICATION INTEGRATION GUIDE
 * =====================================
 * 
 * Your application now has a complete toast notification system with smooth transitions!
 * 
 * FILES ADDED:
 * 1. public/js/toast.js - Toast notification engine
 * 2. public/js/crud-helper.js - CRUD operations wrapper
 * 3. public/css/transitions.css - Smooth transitions for all elements
 * 
 * UPDATES MADE:
 * 1. views/login.ejs - Updated with toast notifications
 * 2. views/layouts/header.ejs - Added transitions CSS
 * 3. views/layouts/footer.ejs - Added toast and CRUD helper scripts
 * 
 * =====================================
 * USAGE EXAMPLES
 * =====================================
 */

// ============================================================
// 1. BASIC TOAST NOTIFICATIONS
// ============================================================

// Success Toast
Toast.success('Employee added successfully!');

// Error Toast
Toast.error('Failed to add employee');

// Warning Toast
Toast.warning('Please fill all required fields');

// Info Toast
Toast.info('Processing your request...');

// Custom duration (in milliseconds)
Toast.success('Done!', 2000);
Toast.error('Error occurred', 5000);

// ============================================================
// 2. CRUD HELPER - ADD/CREATE
// ============================================================

document.getElementById('addEmployeeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  // Validate required fields
  if (!CRUDHelper.validateForm(data, ['email', 'first_name', 'last_name'])) {
    return;
  }
  
  // Create employee
  const result = await CRUDHelper.create(
    '/api/storeEmployee',
    data,
    'Employee added successfully!'
  );
  
  if (result.success) {
    this.reset();
    // Redirect after short delay
    setTimeout(() => {
      window.location.href = '/employees';
    }, 1000);
  }
});

// ============================================================
// 3. CRUD HELPER - READ/FETCH
// ============================================================

async function loadEmployees() {
  const result = await CRUDHelper.read('/api/getEmployees');
  
  if (result.success) {
    const employees = result.data;
    // Populate table or display employees
    employees.forEach(emp => {
      // Add to UI
    });
  }
}

// ============================================================
// 4. CRUD HELPER - UPDATE/EDIT
// ============================================================

document.getElementById('editEmployeeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const employeeId = document.getElementById('employeeId').value;
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  const result = await CRUDHelper.update(
    `/api/updateEmployee/${employeeId}`,
    data,
    'Employee updated successfully!'
  );
  
  if (result.success) {
    // Reload page or redirect
    setTimeout(() => {
      location.reload();
    }, 500);
  }
});

// ============================================================
// 5. CRUD HELPER - DELETE
// ============================================================

async function deleteEmployee(employeeId, employeeName) {
  const result = await CRUDHelper.delete(
    `/api/deleteEmployee/${employeeId}`,
    'Employee',
    `${employeeName} has been deleted successfully!`
  );
  
  if (result.success) {
    // Remove from table
    document.getElementById(`row-${employeeId}`).remove();
  }
  
  // Cancelled by user
  if (result.cancelled) {
    Toast.info('Delete cancelled');
  }
}

// ============================================================
// 6. BATCH DELETE
// ============================================================

async function deleteSelectedEmployees(selectedIds) {
  const urls = selectedIds.map(id => `/api/deleteEmployee/${id}`);
  const result = await CRUDHelper.batchDelete(urls, 'employees');
  
  if (result.success) {
    // Refresh list
    setTimeout(() => {
      location.reload();
    }, 500);
  }
}

// ============================================================
// 7. LOADING STATE
// ============================================================

async function processPayroll() {
  const loadingId = CRUDHelper.showLoading('Processing payroll...');
  
  try {
    // Simulate long operation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    CRUDHelper.hideLoading(loadingId);
    Toast.success('Payroll processed successfully!');
  } catch (error) {
    CRUDHelper.hideLoading(loadingId);
    Toast.error('Failed to process payroll');
  }
}

// ============================================================
// 8. COMPLETE EXAMPLE - EMPLOYEE FORM
// ============================================================

/* HTML:
<form id="employeeForm">
  <input type="text" name="first_name" placeholder="First Name" required>
  <input type="text" name="last_name" placeholder="Last Name" required>
  <input type="email" name="email" placeholder="Email" required>
  <button type="submit">Add Employee</button>
</form>
*/

// JavaScript:
const employeeForm = document.getElementById('employeeForm');
employeeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(employeeForm);
  const data = Object.fromEntries(formData);
  
  // Optional: Show loading state
  const loadingId = CRUDHelper.showLoading('Creating employee...');
  
  // Validate
  if (!CRUDHelper.validateForm(data, ['first_name', 'last_name', 'email'])) {
    CRUDHelper.hideLoading(loadingId);
    return;
  }
  
  // Create
  const result = await CRUDHelper.create('/api/storeEmployee', data);
  CRUDHelper.hideLoading(loadingId);
  
  if (result.success) {
    employeeForm.reset();
    // Refresh employees list
    setTimeout(() => location.reload(), 1000);
  }
});

// ============================================================
// 9. MODAL + TOAST EXAMPLE
// ============================================================

/* HTML:
<div class="modal fade" id="addEmployeeModal">
  <div class="modal-dialog">
    <form id="addEmployeeForm">
      <input type="text" name="first_name" placeholder="First Name">
      <input type="email" name="email" placeholder="Email">
      <button type="submit">Save</button>
    </form>
  </div>
</div>
*/

const addEmployeeForm = document.getElementById('addEmployeeForm');
addEmployeeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(addEmployeeForm);
  const data = Object.fromEntries(formData);
  
  const result = await CRUDHelper.create('/api/storeEmployee', data);
  
  if (result.success) {
    // Close modal
    const modal = new bootstrap.Modal(document.getElementById('addEmployeeModal'));
    modal.hide();
    
    // Reset form
    addEmployeeForm.reset();
    
    // Reload table
    setTimeout(() => loadEmployeesList(), 500);
  }
});

// ============================================================
// 10. TABLE ACTIONS - EDIT & DELETE
// ============================================================

function setupTableActions() {
  // Delete buttons
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const row = e.target.closest('tr');
      const employeeId = row.dataset.id;
      const employeeName = row.querySelector('td:nth-child(2)').textContent;
      
      const result = await CRUDHelper.delete(
        `/api/deleteEmployee/${employeeId}`,
        'Employee'
      );
      
      if (result.success) {
        row.remove();
      }
    });
  });
  
  // Edit buttons
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const employeeId = row.dataset.id;
      // Open modal with employee data
      openEditModal(employeeId);
    });
  });
}

// Call on page load
document.addEventListener('DOMContentLoaded', setupTableActions);

// ============================================================
// TOAST FEATURES
// ============================================================
/*
- Appears in top-right corner
- Auto-dismisses based on duration
- Click X to close manually
- Different colors for success/error/warning/info
- Smooth slide-in and slide-out animations
- Progress bar showing time remaining
- Multiple toasts can stack

TOAST TYPES:
- Toast.success(message, duration) - Green
- Toast.error(message, duration) - Red
- Toast.warning(message, duration) - Orange
- Toast.info(message, duration) - Blue

DEFAULT DURATIONS:
- success: 4000ms
- error: 5000ms (longer to read)
- warning: 4000ms
- info: 4000ms
*/

// ============================================================
// TRANSITIONS
// ============================================================
/*
Smooth transitions are now applied globally:

- Page loads with fade-in animation
- Buttons have smooth hover effects with subtle lift
- Forms focus on inputs with scale animation
- Modals slide up smoothly
- Tables have hover effects
- All state changes are smooth
- Cards lift on hover

To disable transitions for specific elements:
element.style.transition = 'none';
*/
