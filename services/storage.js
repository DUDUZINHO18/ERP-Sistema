/**
 * Storage Service
 * Handles local storage operations with fallback to session storage
 */

class StorageService {
    /**
     * Set item in localStorage
     */
    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            console.error('Storage set error:', error);
            return false;
        }
    }

    /**
     * Get item from localStorage
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    }

    /**
     * Remove item from localStorage
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    }

    /**
     * Clear all items from localStorage
     */
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    }

    /**
     * Set item in sessionStorage
     */
    setSession(key, value) {
        try {
            const serialized = JSON.stringify(value);
            sessionStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            console.error('Session storage set error:', error);
            return false;
        }
    }

    /**
     * Get item from sessionStorage
     */
    getSession(key, defaultValue = null) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Session storage get error:', error);
            return defaultValue;
        }
    }

    /**
     * Remove item from sessionStorage
     */
    removeSession(key) {
        try {
            sessionStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Session storage remove error:', error);
            return false;
        }
    }

    /**
     * Clear all items from sessionStorage
     */
    clearSession() {
        try {
            sessionStorage.clear();
            return true;
        } catch (error) {
            console.error('Session storage clear error:', error);
            return false;
        }
    }
}

const storageService = new StorageService();
