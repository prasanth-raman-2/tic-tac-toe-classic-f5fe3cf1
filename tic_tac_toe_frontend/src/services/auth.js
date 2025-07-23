import axios from 'axios';

const API_URL = 'http://localhost:8000';

// PUBLIC_INTERFACE
/**
 * Handles user registration with the backend
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.email - Email address
 * @param {string} userData.password - Password
 * @returns {Promise} Response from registration endpoint
 */
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Registration failed';
  }
};

// PUBLIC_INTERFACE
/**
 * Handles user login and token management
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Promise} Response containing access token
 */
export const login = async (username, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post(`${API_URL}/auth/login`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Login failed';
  }
};

// PUBLIC_INTERFACE
/**
 * Logs out the current user by removing the token
 */
export const logout = () => {
  localStorage.removeItem('token');
};

// PUBLIC_INTERFACE
/**
 * Gets the current authentication token
 * @returns {string|null} The current token or null if not authenticated
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

// PUBLIC_INTERFACE
/**
 * Checks if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};
