/**
 * Authentication Service
 * Prepared for integration with JWT authentication
 */

class AuthService {
    constructor() {
        this.tokenKey = 'erp_token';
        this.userKey = 'erp_user';
    }

    /**
     * Login user
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise}
     */
    async login(email, password) {
        // Simulated login - in production, this will call the backend API
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock validation
                if (email && password) {
                    const user = {
                        id: 1,
                        name: 'Admin User',
                        email: email,
                        role: 'admin',
                        avatar: 'AU'
                    };

                    const token = this.generateMockToken(user);

                    localStorage.setItem(this.tokenKey, token);
                    localStorage.setItem(this.userKey, JSON.stringify(user));

                    resolve({
                        success: true,
                        user: user,
                        token: token
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Invalid credentials'
                    });
                }
            }, 500);
        });
    }

    /**
     * Logout user
     */
    async logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        
        return {
            success: true,
            message: 'Logged out successfully'
        };
    }

    /**
     * Get current authenticated user
     */
    getCurrentUser() {
        const userStr = localStorage.getItem(this.userKey);
        return userStr ? JSON.parse(userStr) : null;
    }

    /**
     * Get authentication token
     */
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return !!this.getToken();
    }

    /**
     * Generate mock JWT token
     * In production, this will be provided by the backend
     */
    generateMockToken(user) {
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
            sub: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            exp: Date.now() + 3600000 // 1 hour
        }));
        const signature = btoa('mock_signature');
        
        return `${header}.${payload}.${signature}`;
    }

    /**
     * Validate token
     * In production, this will call the backend to validate JWT
     */
    async validateToken() {
        const token = this.getToken();
        if (!token) return false;

        try {
            const parts = token.split('.');
            if (parts.length !== 3) return false;

            const payload = JSON.parse(atob(parts[1]));
            return payload.exp > Date.now();
        } catch {
            return false;
        }
    }
}

const authService = new AuthService();
