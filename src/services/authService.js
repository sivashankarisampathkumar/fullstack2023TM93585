// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/auth'; // Update this as needed

const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    
    // Ensure the structure of the response matches this
    const user = {
        id: response.data.user.id, // Access user ID from the response structure
        username: response.data.user.username, // Access username from the response structure
    };
    
    // Log user data to verify it's correct
    console.log('User data stored:', user);

    // Store user data in local storage after successful login
    localStorage.setItem('user', JSON.stringify(user));

    return response.data;
};

const resetPassword = async (email, newPassword) => {
    const response = await axios.post(`${API_URL}/reset-password`, { email, newPassword });
    return response.data;
};

// Add the getCurrentUserId function
const getCurrentUserId = () => {
    const currentUser = JSON.parse(localStorage.getItem('user')); // Assuming you store user info in localStorage
    return currentUser ? currentUser.id : null; // Adjust according to your user structure
};

export default {
    register,
    login,
    resetPassword,
    getCurrentUserId, // Export the new function
};

