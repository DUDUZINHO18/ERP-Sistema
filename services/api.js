/**
 * API Service - Simulated Backend Layer
 * Prepared for integration with Java Spring Boot + PostgreSQL + JWT
 */

class ApiService {
    constructor() {
        this.baseUrl = '/api'; // Will be replaced with actual backend URL
        this.delay = 300; // Simulated network delay
    }

    /**
     * Simulates HTTP GET request
     */
    async get(endpoint) {
        await this.simulateDelay();
        return this.mockResponse(endpoint, 'GET');
    }

    /**
     * Simulates HTTP POST request
     */
    async post(endpoint, data) {
        await this.simulateDelay();
        return this.mockResponse(endpoint, 'POST', data);
    }

    /**
     * Simulates HTTP PUT request
     */
    async put(endpoint, data) {
        await this.simulateDelay();
        return this.mockResponse(endpoint, 'PUT', data);
    }

    /**
     * Simulates HTTP DELETE request
     */
    async delete(endpoint) {
        await this.simulateDelay();
        return this.mockResponse(endpoint, 'DELETE');
    }

    /**
     * Simulates network delay
     */
    async simulateDelay() {
        return new Promise(resolve => setTimeout(resolve, this.delay));
    }

    /**
     * Mock response generator
     * In production, this will be replaced with actual fetch/axios calls
     */
    mockResponse(endpoint, method, data = null) {
        // This is a simplified mock - in production, actual API calls will be made
        console.log(`[API] ${method} ${endpoint}`, data);
        
        return {
            success: true,
            data: data || {},
            message: 'Operation successful'
        };
    }
}

const apiService = new ApiService();
