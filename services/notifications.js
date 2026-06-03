/**
 * Notifications Service
 * Handles toast notifications and alerts
 */

class NotificationsService {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.init();
    }

    /**
     * Initialize notification container
     */
    init() {
        // Create container if it doesn't exist
        if (!document.getElementById('notifications-container')) {
            this.container = document.createElement('div');
            this.container.id = 'notifications-container';
            this.container.style.cssText = `
                position: fixed;
                top: 24px;
                right: 24px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 12px;
            `;
            document.body.appendChild(this.container);
        } else {
            this.container = document.getElementById('notifications-container');
        }
    }

    /**
     * Show success notification
     */
    success(message, duration = 4000) {
        return this.show(message, 'success', duration);
    }

    /**
     * Show error notification
     */
    error(message, duration = 5000) {
        return this.show(message, 'error', duration);
    }

    /**
     * Show warning notification
     */
    warning(message, duration = 4000) {
        return this.show(message, 'warning', duration);
    }

    /**
     * Show info notification
     */
    info(message, duration = 4000) {
        return this.show(message, 'info', duration);
    }

    /**
     * Show notification
     */
    show(message, type = 'info', duration = 4000) {
        const id = Date.now();
        const notification = this.createNotification(message, type, id);
        
        this.container.appendChild(notification);
        this.notifications.push({ id, element: notification });

        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                this.remove(id);
            }, duration);
        }

        return id;
    }

    /**
     * Create notification element
     */
    createNotification(message, type, id) {
        const colors = {
            success: { bg: '#22C55E', icon: '✓' },
            error: { bg: '#EF4444', icon: '✕' },
            warning: { bg: '#F59E0B', icon: '⚠' },
            info: { bg: '#2563EB', icon: 'ℹ' }
        };

        const color = colors[type] || colors.info;

        const notification = document.createElement('div');
        notification.id = `notification-${id}`;
        notification.style.cssText = `
            min-width: 320px;
            max-width: 400px;
            padding: 16px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-left: 4px solid ${color.bg};
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            gap: 12px;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
            cursor: pointer;
        `;

        notification.innerHTML = `
            <div style="width: 24px; height: 24px; background: ${color.bg}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: 600;">
                ${color.icon}
            </div>
            <div style="flex: 1; font-size: 14px; color: var(--text-primary);">
                ${message}
            </div>
            <button style="width: 20px; height: 20px; background: transparent; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center;">
                ✕
            </button>
        `;

        // Close button
        const closeBtn = notification.querySelector('button');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.remove(id);
        });

        // Click to dismiss
        notification.addEventListener('click', () => {
            this.remove(id);
        });

        return notification;
    }

    /**
     * Remove notification
     */
    remove(id) {
        const index = this.notifications.findIndex(n => n.id === id);
        if (index === -1) return;

        const notification = this.notifications[index].element;
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';

        setTimeout(() => {
            notification.remove();
            this.notifications.splice(index, 1);
        }, 300);
    }

    /**
     * Clear all notifications
     */
    clear() {
        this.notifications.forEach(n => {
            n.element.remove();
        });
        this.notifications = [];
    }
}

const notificationsService = new NotificationsService();
