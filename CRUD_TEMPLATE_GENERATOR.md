# CRUD Template Generator - Apply to All Modules

This document provides complete templates for implementing CRUD with pagination for ANY module in NextGenHR.

## 📋 Quick Implementation Checklist

For each module, you need to create/update:
1. ✅ Controller (with pagination)
2. ✅ API Routes
3. ✅ Web Routes (with data fetching)
4. ✅ List View (with pagination & search)
5. ✅ Add View (with form)
6. ✅ Edit View (with pre-filled form)
7. ✅ View View (display details)
8. ✅ Model/Schema (ES6 format)

---

## 1️⃣ CONTROLLER TEMPLATE

Create: `controller/ModuleName.js`

```javascript
import ModuleName from '../models/ModuleName.js';

// Create
const storeModuleName = async (req, res) => {
    try {
        const item = await ModuleName.create(req.body);
        res.status(200).json({ 
            message: 'Item created successfully', 
            success: true, 
            data: item 
        });
    } catch (err) {
        console.error('storeModuleName error:', err);
        res.status(500).json({ 
            message: err.message || 'Failed to create item', 
            success: false 
        });
    }
};

// Read (with pagination)
const getModuleNames = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';
        
        // Customize search fields based on your schema
        const searchQuery = search ? {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
                // Add more searchable fields here
            ]
        } : {};
        
        const total = await ModuleName.countDocuments(searchQuery);
        const items = await ModuleName.find(searchQuery)
            .populate('related_field', 'name') // Add populate if needed
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
        
        res.status(200).json({
            success: true,
            data: items,
            pagination: {
                total: total,
                page: page,
                limit: limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        console.error('getModuleNames error:', err);
        res.status(500).json({ 
            message: 'Failed to fetch items', 
            success: false 
        });
    }
};

// Read Single
const getModuleNameById = async (req, res) => {
    try {
        const item = await ModuleName.findById(req.params.id)
            .populate('related_field', 'name')
            .lean();
        if (!item) {
            return res.status(404).json({ 
                message: 'Item not found', 
                success: false 
            });
        }
        res.status(200).json({ success: true, data: item });
    } catch (err) {
        console.error('getModuleNameById error:', err);
        res.status(500).json({ 
            message: 'Failed to fetch item', 
            success: false 
        });
    }
};

// Update
const updateModuleName = async (req, res) => {
    try {
        const item = await ModuleName.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        
        if (!item) {
            return res.status(404).json({ 
                message: 'Item not found', 
                success: false 
            });
        }
        
        res.status(200).json({ 
            message: 'Item updated successfully', 
            success: true,
            data: item
        });
    } catch (err) {
        console.error('updateModuleName error:', err);
        res.status(500).json({ 
            message: 'Failed to update item', 
            success: false 
        });
    }
};

// Delete
const deleteModuleName = async (req, res) => {
    try {
        const item = await ModuleName.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ 
                message: 'Item not found', 
                success: false 
            });
        }
        res.status(200).json({ 
            message: 'Item deleted successfully', 
            success: true 
        });
    } catch (err) {
        console.error('deleteModuleName error:', err);
        res.status(500).json({ 
            message: 'Failed to delete item', 
            success: false 
        });
    }
};

export {
    storeModuleName,
    getModuleNames,
    getModuleNameById,
    updateModuleName,
    deleteModuleName
};
```

---

## 2️⃣ API ROUTES TEMPLATE

Create: `routes/api/modulename.routes.js`

```javascript
import express from 'express';
import {
    storeModuleName,
    getModuleNames,
    getModuleNameById,
    updateModuleName,
    deleteModuleName
} from '../../controller/ModuleName.js';

const router = express.Router();

// Create
router.post('/modulenames', storeModuleName);

// Read
router.get('/modulenames', getModuleNames);
router.get('/modulenames/:id', getModuleNameById);

// Update
router.put('/modulenames/:id', updateModuleName);

// Delete
router.delete('/modulenames/:id', deleteModuleName);

export default router;
```

Then add to `routes/api/index.js`:
```javascript
import moduleNameRoutes from './modulename.routes.js';
// ... in the routes section
router.use(moduleNameRoutes);
```

---

## 3️⃣ WEB ROUTES TEMPLATE

Add to existing web routes file or create new:

```javascript
import ModuleName from '../../models/ModuleName.js';

// List with pagination
router.get('/modulenames', async (req, res) => {
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
    
    const total = await ModuleName.countDocuments(searchQuery);
    const items = await ModuleName.find(searchQuery)
      .populate('related_field', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    res.render("modulenames/list", { 
      title: "Module Names",
      items: items,
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
    console.error('Error fetching items:', error);
    res.render("modulenames/list", { 
      title: "Module Names",
      items: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      search: '',
      partial: false
    });
  }
});

// Add form
router.get('/modulenames/add', (req, res) => {
  res.render("modulenames/add", { title: "Add Item", partial: false });
});

// Edit form
router.get('/modulenames/edit/:id', async (req, res) => {
  try {
    const item = await ModuleName.findById(req.params.id)
      .populate('related_field', 'name')
      .lean();
    
    if (!item) {
      return res.redirect('/modulenames');
    }
    
    res.render("modulenames/edit", { 
      title: "Edit Item", 
      item: item,
      partial: false
    });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.redirect('/modulenames');
  }
});

// View details
router.get('/modulenames/view/:id', async (req, res) => {
  try {
    const item = await ModuleName.findById(req.params.id)
      .populate('related_field', 'name')
      .lean();
    
    if (!item) {
      return res.redirect('/modulenames');
    }
    
    res.render("modulenames/view", { 
      title: "View Item", 
      item: item,
      partial: false
    });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.redirect('/modulenames');
  }
});
```

---

## 4️⃣ LIST VIEW TEMPLATE

Create: `views/modulenames/list.ejs`

```html
<% if (!partial) { %>
<%- include ('../layouts/header'); %>
<% } %>
    <div class="main-content">
        <div class="topbar">
            <div>
                <h5 class="mb-1">Module Names</h5>
                <small class="text-muted">Manage items</small>
            </div>
            <a href="/modulenames/add" class="btn btn-primary" data-spa>
                <i class="bi bi-plus-circle"></i> Add Item
            </a>
        </div>

        <div class="container-fluid mt-4">
            <div class="card">
                <div class="card-body">
                    <!-- Search Bar -->
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <form method="GET" action="/modulenames">
                                <div class="input-group">
                                    <input type="text" class="form-control" name="search" placeholder="Search..." value="<%= search %>">
                                    <button class="btn btn-outline-secondary" type="submit">
                                        <i class="bi bi-search"></i> Search
                                    </button>
                                    <% if (search) { %>
                                    <a href="/modulenames" class="btn btn-outline-danger">
                                        <i class="bi bi-x"></i> Clear
                                    </a>
                                    <% } %>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-6 text-end">
                            <small class="text-muted">Total: <%= pagination.total %> items</small>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <% if (items && items.length > 0) { %>
                                    <% items.forEach(item => { %>
                                        <tr>
                                            <td><%= item.name || 'N/A' %></td>
                                            <td><%= item.description || 'N/A' %></td>
                                            <td><%= item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB') : 'N/A' %></td>
                                            <td>
                                                <a href="/modulenames/view/<%= item._id %>" class="btn btn-sm btn-info" title="View" data-spa>
                                                    <i class="bi bi-eye"></i>
                                                </a>
                                                <a href="/modulenames/edit/<%= item._id %>" class="btn btn-sm btn-warning" title="Edit" data-spa>
                                                    <i class="bi bi-pencil"></i>
                                                </a>
                                                <button class="btn btn-sm btn-danger" title="Delete" onclick="deleteItem('<%= item._id %>')">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    <% }) %>
                                <% } else { %>
                                    <tr>
                                        <td colspan="4" class="text-center text-muted py-4">
                                            <i class="bi bi-inbox" style="font-size: 2rem;"></i>
                                            <p class="mt-2">No items found</p>
                                            <% if (search) { %>
                                                <a href="/modulenames" class="btn btn-sm btn-primary">Clear Search</a>
                                            <% } %>
                                        </td>
                                    </tr>
                                <% } %>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <% if (pagination.totalPages > 1) { %>
                    <nav aria-label="Page navigation" class="mt-3">
                        <ul class="pagination justify-content-center">
                            <li class="page-item <%= pagination.page === 1 ? 'disabled' : '' %>">
                                <a class="page-link" href="?page=<%= pagination.page - 1 %><%= search ? '&search=' + search : '' %>">
                                    <i class="bi bi-chevron-left"></i> Previous
                                </a>
                            </li>
                            
                            <% 
                            let startPage = Math.max(1, pagination.page - 2);
                            let endPage = Math.min(pagination.totalPages, pagination.page + 2);
                            %>
                            
                            <% if (startPage > 1) { %>
                                <li class="page-item">
                                    <a class="page-link" href="?page=1<%= search ? '&search=' + search : '' %>">1</a>
                                </li>
                                <% if (startPage > 2) { %>
                                    <li class="page-item disabled"><span class="page-link">...</span></li>
                                <% } %>
                            <% } %>
                            
                            <% for (let i = startPage; i <= endPage; i++) { %>
                                <li class="page-item <%= i === pagination.page ? 'active' : '' %>">
                                    <a class="page-link" href="?page=<%= i %><%= search ? '&search=' + search : '' %>"><%= i %></a>
                                </li>
                            <% } %>
                            
                            <% if (endPage < pagination.totalPages) { %>
                                <% if (endPage < pagination.totalPages - 1) { %>
                                    <li class="page-item disabled"><span class="page-link">...</span></li>
                                <% } %>
                                <li class="page-item">
                                    <a class="page-link" href="?page=<%= pagination.totalPages %><%= search ? '&search=' + search : '' %>"><%= pagination.totalPages %></a>
                                </li>
                            <% } %>
                            
                            <li class="page-item <%= pagination.page === pagination.totalPages ? 'disabled' : '' %>">
                                <a class="page-link" href="?page=<%= pagination.page + 1 %><%= search ? '&search=' + search : '' %>">
                                    Next <i class="bi bi-chevron-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <% } %>
                </div>
            </div>
        </div>
    </div>

<script>
function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        fetch(`/api/modulenames/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast('Item deleted successfully', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                showToast(data.message || 'Failed to delete item', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('An error occurred while deleting', 'error');
        });
    }
}
</script>

<% if (!partial) { %>
<%- include ('../layouts/footer'); %>
<% } %>
```

---

## 5️⃣ ADD VIEW TEMPLATE

Create: `views/modulenames/add.ejs`

```html
<% if (!partial) { %>
<%- include ('../layouts/header'); %>
<% } %>

<div class="main-content">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2><i class="bi bi-plus-circle me-2"></i>Add New Item</h2>
    <a href="/modulenames" class="btn btn-secondary" data-spa>
      <i class="bi bi-arrow-left me-2"></i>Back to List
    </a>
  </div>

  <div class="card">
    <div class="card-body">
      <form id="addForm">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="name" class="form-label">Name *</label>
            <input type="text" name="name" class="form-control" id="name" placeholder="Enter name" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" name="description" class="form-control" id="description" placeholder="Enter description">
          </div>
        </div>

        <!-- Add more fields as needed -->

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-primary">
            <i class="bi bi-check-circle me-2"></i>Create Item
          </button>
          <a href="/modulenames" class="btn btn-secondary" data-spa>
            <i class="bi bi-x-circle me-2"></i>Cancel
          </a>
        </div>
      </form>
    </div>
  </div>
</div>

<script>
document.getElementById('addForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creating...';
    
    try {
        const response = await fetch('/api/modulenames', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Item created successfully', 'success');
            setTimeout(() => {
                window.location.href = '/modulenames';
            }, 1000);
        } else {
            showToast(result.message || 'Failed to create item', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('An error occurred while creating item', 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});
</script>

<% if (!partial) { %>
<%- include ('../layouts/footer'); %>
<% } %>
```

---

## 6️⃣ EDIT VIEW TEMPLATE

Create: `views/modulenames/edit.ejs`

```html
<% if (!partial) { %>
<%- include ('../layouts/header'); %>
<% } %>

<div class="main-content">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2><i class="bi bi-pencil me-2"></i>Edit Item</h2>
    <a href="/modulenames" class="btn btn-secondary" data-spa>
      <i class="bi bi-arrow-left me-2"></i>Back to List
    </a>
  </div>

  <div class="card">
    <div class="card-body">
      <form id="editForm">
        <input type="hidden" id="itemId" value="<%= item._id %>">
        
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="name" class="form-label">Name *</label>
            <input type="text" name="name" class="form-control" id="name" value="<%= item.name || '' %>" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" name="description" class="form-control" id="description" value="<%= item.description || '' %>">
          </div>
        </div>

        <!-- Add more fields as needed -->

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-primary">
            <i class="bi bi-check-circle me-2"></i>Update Item
          </button>
          <a href="/modulenames" class="btn btn-secondary" data-spa>
            <i class="bi bi-x-circle me-2"></i>Cancel
          </a>
          <button type="button" class="btn btn-danger ms-auto" onclick="deleteItem('<%= item._id %>')">
            <i class="bi bi-trash me-2"></i>Delete
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<script>
document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const itemId = document.getElementById('itemId').value;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Updating...';
    
    try {
        const response = await fetch(`/api/modulenames/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Item updated successfully', 'success');
            setTimeout(() => {
                window.location.href = '/modulenames';
            }, 1000);
        } else {
            showToast(result.message || 'Failed to update item', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('An error occurred while updating', 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});

function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
        fetch(`/api/modulenames/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast('Item deleted successfully', 'success');
                setTimeout(() => {
                    window.location.href = '/modulenames';
                }, 1000);
            } else {
                showToast(data.message || 'Failed to delete item', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('An error occurred while deleting', 'error');
        });
    }
}
</script>

<% if (!partial) { %>
<%- include ('../layouts/footer'); %>
<% } %>
```

---

## 7️⃣ VIEW TEMPLATE

Create: `views/modulenames/view.ejs`

```html
<% if (!partial) { %>
<%- include ('../layouts/header'); %>
<% } %>

<div class="main-content">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2><i class="bi bi-eye me-2"></i>Item Details</h2>
    <div>
      <a href="/modulenames/edit/<%= item._id %>" class="btn btn-warning me-2" data-spa>
        <i class="bi bi-pencil me-2"></i>Edit
      </a>
      <a href="/modulenames" class="btn btn-secondary" data-spa>
        <i class="bi bi-arrow-left me-2"></i>Back to List
      </a>
    </div>
  </div>

  <div class="card">
    <div class="card-header bg-primary text-white">
      <h5 class="mb-0"><%= item.name || 'N/A' %></h5>
    </div>
    <div class="card-body">
      <div class="row mb-4">
        <div class="col-md-6">
          <h6 class="text-muted mb-3">Basic Information</h6>
          <p class="mb-2"><strong>Name:</strong> <%= item.name || 'N/A' %></p>
          <p class="mb-2"><strong>Description:</strong> <%= item.description || 'N/A' %></p>
        </div>
        <div class="col-md-6">
          <h6 class="text-muted mb-3">Timestamps</h6>
          <p class="mb-2"><strong>Created:</strong> <%= item.createdAt ? new Date(item.createdAt).toLocaleString('en-GB') : 'N/A' %></p>
          <p class="mb-2"><strong>Updated:</strong> <%= item.updatedAt ? new Date(item.updatedAt).toLocaleString('en-GB') : 'N/A' %></p>
        </div>
      </div>

      <hr>

      <div class="d-flex gap-2 mt-4">
        <a href="/modulenames/edit/<%= item._id %>" class="btn btn-warning" data-spa>
          <i class="bi bi-pencil me-2"></i>Edit Item
        </a>
        <button class="btn btn-danger" onclick="deleteItem('<%= item._id %>')">
          <i class="bi bi-trash me-2"></i>Delete Item
        </button>
      </div>
    </div>
  </div>
</div>

<script>
function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
        fetch(`/api/modulenames/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast('Item deleted successfully', 'success');
                setTimeout(() => {
                    window.location.href = '/modulenames';
                }, 1000);
            } else {
                showToast(data.message || 'Failed to delete item', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('An error occurred while deleting', 'error');
        });
    }
}
</script>

<% if (!partial) { %>
<%- include ('../layouts/footer'); %>
<% } %>
```

---

## 8️⃣ MODEL/SCHEMA TEMPLATE

Ensure your schema is in ES6 format:

`schemas/ModuleName.js`:
```javascript
import mongoose from 'mongoose';

const moduleNameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  // Add your fields here
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true });

export default mongoose.model('ModuleName', moduleNameSchema);
```

`models/ModuleName.js`:
```javascript
import ModuleName from '../schemas/ModuleName.js';
export default ModuleName;
```

---

## 🔄 MODULES TO IMPLEMENT

Based on existing schemas, here are the modules that need CRUD implementation:

### Priority 1 (Has Schema + No/Partial Controller):
1. ✅ **Departments** - IMPLEMENTED AS EXAMPLE
2. **Designations**
3. **Leave Requests**
4. **Performance Reviews**
5. **Roles**
6. **Attendance**
7. **Payroll**
8. **Payslips**
9. **Audit Logs**
10. **Notifications**

### Priority 2 (Has Schema + Has Controller - Needs Update):
1. **Branches** - Has controller, needs views update
2. **Company** - Has controller, needs views update
3. **Users** - Has controller, needs views update
4. **Software** - Has controller, needs views update
5. **Module** - Has controller, needs views update

---

## 📝 QUICK IMPLEMENTATION STEPS

For each module:

1. **Replace placeholders** in templates:
   - `ModuleName` → Actual module name (PascalCase)
   - `modulenames` → Route path (lowercase plural)
   - `items` → Contextual name (e.g., departments, users)
   - Field names in schemas and forms

2. **Customize search fields** in controller:
   ```javascript
   { name: { $regex: search, $options: 'i' } },
   { email: { $regex: search, $options: 'i' } }
   ```

3. **Add populate** if needed:
   ```javascript
   .populate('company_id', 'name')
   .populate('branch_id', 'name')
   ```

4. **Customize table columns** in list view
5. **Customize form fields** in add/edit views
6. **Customize detail fields** in view page

---

## ✅ VERIFICATION CHECKLIST

After implementing each module, verify:

- [ ] Can create new items
- [ ] List shows all items with pagination
- [ ] Search works correctly
- [ ] Can view item details
- [ ] Can edit existing items
- [ ] Can delete items
- [ ] Pagination works (if > 10 items)
- [ ] Toast notifications appear
- [ ] No console errors
- [ ] Proper redirects after actions

---

## 🎯 COMPLETED EXAMPLES

1. ✅ **Job Applications** - Full implementation with file upload
2. ✅ **Departments** - Full implementation (basic CRUD)

Use these as reference for implementing other modules!
