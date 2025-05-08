const API_URL = 'http://localhost:5000/api';

const api = {
    auth: {
        async login(email, password) {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            
            return response.json();
        },

        async register(userData) {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            
            return response.json();
        },

        async getCurrentUser() {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await fetch(`${API_URL}/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to get user profile');
            }
            
            return response.json();
        }
    }
};

export default api;

// Google Sign-In Configuration
function initGoogleSignIn() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID'
        });
    });
}

// API Endpoints
const API_ENDPOINTS = {
    contact: '/api/contact',
    newsletter: '/api/newsletter',
    courses: '/api/courses'
};

// API Functions
export async function sendContactForm(data) {
    try {
        const response = await fetch(API_ENDPOINTS.contact, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error('Error sending contact form:', error);
        throw error;
    }
}