/**
 * CRUD Helper with Toast Notifications
 * Simplifies CRUD operations with automatic toast messages
 */

class CRUDHelper {
  /**
   * Generic fetch wrapper with toast notifications
   * @param {string} url - API endpoint
   * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
   * @param {object} data - Request body data
   * @param {object} options - Additional options
   * @returns {Promise<object>} Response data
   */
  static async request(url, method = 'GET', data = null, options = {}) {
    const { 
      successMessage = 'Operation successful', 
      errorMessage = 'Operation failed', 
      showToast = true,
      toastDuration = 4000
    } = options;

    try {
      const config = {
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (data && (method === 'POST' || method === 'PUT')) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);
      const result = await response.json();

      if (response.ok) {
        if (showToast) {
          Toast.success(result.message || successMessage, toastDuration);
        }
        return { success: true, data: result, status: response.status };
      } else {
        if (showToast) {
          Toast.error(result.message || errorMessage, toastDuration);
        }
        return { success: false, data: result, status: response.status };
      }
    } catch (error) {
      if (showToast) {
        Toast.error(error.message || errorMessage, toastDuration);
      }
      console.error('CRUD Error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create operation
   */
  static async create(url, data, customMessage = null) {
    return this.request(url, 'POST', data, {
      successMessage: customMessage || `${data.name || 'Item'} created successfully!`
    });
  }

  /**
   * Read operation
   */
  static async read(url, options = {}) {
    return this.request(url, 'GET', null, {
      showToast: false,
      ...options
    });
  }

  /**
   * Update operation
   */
  static async update(url, data, customMessage = null) {
    return this.request(url, 'PUT', data, {
      successMessage: customMessage || `${data.name || 'Item'} updated successfully!`
    });
  }

  /**
   * Delete operation with confirmation
   */
  static async delete(url, itemName = 'Item', customMessage = null) {
    if (!confirm(`Are you sure you want to delete this ${itemName}?`)) {
      return { success: false, cancelled: true };
    }

    return this.request(url, 'DELETE', null, {
      successMessage: customMessage || `${itemName} deleted successfully!`
    });
  }

  /**
   * Batch delete with confirmation
   */
  static async batchDelete(urls, itemName = 'Items') {
    if (!confirm(`Are you sure you want to delete ${urls.length} ${itemName}?`)) {
      return { success: false, cancelled: true };
    }

    const results = await Promise.all(
      urls.map(url => this.request(url, 'DELETE', null, { showToast: false }))
    );

    const successCount = results.filter(r => r.success).length;
    const failCount = results.length - successCount;

    if (successCount === results.length) {
      Toast.success(`All ${itemName} deleted successfully!`);
    } else if (successCount > 0) {
      Toast.warning(`${successCount} deleted, ${failCount} failed`);
    } else {
      Toast.error(`Failed to delete ${itemName}`);
    }

    return { success: successCount === results.length, successCount, failCount };
  }

  /**
   * Validate form data
   */
  static validateForm(data, requiredFields = []) {
    for (const field of requiredFields) {
      if (!data[field] || data[field].trim() === '') {
        Toast.warning(`Please fill in all required fields`);
        return false;
      }
    }
    return true;
  }

  /**
   * Show loading toast (never auto-hides)
   */
  static showLoading(message = 'Processing...') {
    const container = document.getElementById('toast-container');
    const id = 'toast-loading-' + Date.now();
    
    const toast = document.createElement('div');
    toast.id = id;
    toast.style.cssText = `
      background: linear-gradient(135deg, #3b82f6 0%, #3b82f6ee 100%);
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      border-left: 4px solid #2563eb;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 500;
      font-size: 14px;
      min-width: 300px;
      pointer-events: auto;
      animation: slideInRight 0.3s ease-out;
    `;

    const spinner = document.createElement('div');
    spinner.style.cssText = `
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      flex-shrink: 0;
    `;

    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    messageSpan.style.flexGrow = '1';

    toast.appendChild(spinner);
    toast.appendChild(messageSpan);
    container.appendChild(toast);

    return id;
  }

  /**
   * Hide loading toast
   */
  static hideLoading(loadingId) {
    const toast = document.getElementById(loadingId);
    if (toast) {
      Toast.remove(loadingId);
    }
  }
}

/**
 * Example usage in your forms:
 * 
 * // Add employee
 * const form = document.getElementById('employeeForm');
 * form.addEventListener('submit', async (e) => {
 *   e.preventDefault();
 *   
 *   const formData = new FormData(form);
 *   const data = Object.fromEntries(formData);
 *   
 *   // Validate
 *   if (!CRUDHelper.validateForm(data, ['name', 'email', 'department'])) {
 *     return;
 *   }
 *   
 *   // Create
 *   const result = await CRUDHelper.create('/api/storeEmployee', data, 'Employee added successfully!');
 *   
 *   if (result.success) {
 *     form.reset();
 *     // Refresh list or redirect
 *     setTimeout(() => {
 *       location.href = '/employees';
 *     }, 1000);
 *   }
 * });
 * 
 * // Delete employee
 * deleteBtn.addEventListener('click', async () => {
 *   const result = await CRUDHelper.delete(`/api/deleteEmployee/${employeeId}`, 'Employee');
 *   if (result.success) {
 *     // Remove from UI or refresh
 *     location.reload();
 *   }
 * });
 * 
 * // Update employee
 * const result = await CRUDHelper.update(`/api/updateEmployee/${employeeId}`, updatedData);
 * 
 * // Read employees
 * const result = await CRUDHelper.read('/api/getEmployees');
 * if (result.success) {
 *   const employees = result.data;
 * }
 */
