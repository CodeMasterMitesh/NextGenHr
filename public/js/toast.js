/**
 * Toast Notification System
 * Creates elegant toast messages that appear in the top-right corner
 */

class ToastNotification {
  constructor() {
    this.toasts = [];
    this.containerCreated = false;
  }

  createContainer() {
    if (this.containerCreated || document.getElementById('toast-container')) {
      return;
    }
    
    // Ensure document.body exists
    if (!document.body) {
      console.warn('Toast: document.body not available yet');
      return;
    }
    
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
    this.containerCreated = true;
  }

  show(message, type = 'info', duration = 4000) {
    // Create container on first use
    this.createContainer();
    
    const container = document.getElementById('toast-container');
    if (!container) {
      console.error('Toast container could not be created');
      return;
    }
    const id = 'toast-' + Date.now() + Math.random();
    
    const toast = document.createElement('div');
    toast.id = id;
    
    const colors = {
      success: { bg: '#10b981', icon: '✓', border: '#059669' },
      error: { bg: '#ef4444', icon: '✕', border: '#dc2626' },
      warning: { bg: '#f59e0b', icon: '⚠', border: '#d97706' },
      info: { bg: '#3b82f6', icon: 'ℹ', border: '#2563eb' }
    };

    const color = colors[type] || colors.info;

    toast.style.cssText = `
      background: linear-gradient(135deg, ${color.bg} 0%, ${color.bg}ee 100%);
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      border-left: 4px solid ${color.border};
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 500;
      font-size: 14px;
      min-width: 300px;
      max-width: 400px;
      pointer-events: auto;
      animation: slideInRight 0.3s ease-out;
      overflow: hidden;
    `;

    const iconSpan = document.createElement('span');
    iconSpan.textContent = color.icon;
    iconSpan.style.cssText = `
      font-size: 18px;
      font-weight: bold;
      flex-shrink: 0;
    `;

    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    messageSpan.style.cssText = `
      flex: 1;
      word-break: break-word;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      margin-left: 8px;
      flex-shrink: 0;
      line-height: 1;
      opacity: 0.8;
      transition: opacity 0.2s;
    `;
    closeBtn.onmouseover = () => closeBtn.style.opacity = '1';
    closeBtn.onmouseout = () => closeBtn.style.opacity = '0.8';
    closeBtn.onclick = () => this.remove(id);

    toast.appendChild(iconSpan);
    toast.appendChild(messageSpan);
    toast.appendChild(closeBtn);
    container.appendChild(toast);

    this.toasts.push(id);

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.6);
      width: 100%;
      animation: shrink ${duration}ms linear;
    `;
    toast.style.position = 'relative';
    toast.appendChild(progressBar);

    setTimeout(() => this.remove(id), duration);
  }

  remove(id) {
    const toast = document.getElementById(id);
    if (toast) {
      toast.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        toast.remove();
        this.toasts = this.toasts.filter(t => t !== id);
      }, 300);
    }
  }

  success(message, duration = 4000) {
    this.show(message, 'success', duration);
  }

  error(message, duration = 5000) {
    this.show(message, 'error', duration);
  }

  warning(message, duration = 4000) {
    this.show(message, 'warning', duration);
  }

  info(message, duration = 4000) {
    this.show(message, 'info', duration);
  }
}

// Create global instance
const Toast = new ToastNotification();

// Add animations to document
if (!document.getElementById('toast-animations')) {
  const style = document.createElement('style');
  style.id = 'toast-animations';
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }

    @keyframes shrink {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }
  `;
  document.head.appendChild(style);
}
