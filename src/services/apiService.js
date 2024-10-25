// src/services/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/auth'; // Adjust the URL based on your backend's port

const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Propagate the error
    }
};

const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error; // Propagate the error
    }
};

export { registerUser, loginUser };

