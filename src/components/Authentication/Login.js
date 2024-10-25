//src/components/Authentication/Login.js
import React, { useState } from 'react';
import authService from '/Users/Z003LWS/my-app-sivashankari/src/services/authService'; // Import authService instead
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '/Users/Z003LWS/my-app-sivashankari/src/Styles/FormStyles.css'; // Import the shared CSS

const Login = ({ onLogin }) => { // Accept onLogin as a prop
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const userData = { username, password };

        console.log('Login attempt with:', userData); // Log the credentials being sent

        try {
            const response = await authService.login(username, password); // Call authService.login
            console.log('Login successful:', response); // Log response

            setSuccess('Login successful!'); // Set success message
            setError(''); // Clear error message

            // Call the onLogin prop to update the authentication state
            onLogin();

            // Navigate to the BookManagement page after successful login
            navigate('/books');
        } catch (error) {
            console.error('Login failed:', error.response?.data || error); // Improved logging
            setError('Login failed. Please check your credentials.'); // Handle error
            setSuccess(''); // Clear success message
        }
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
            <div>
                <label className="username-label">Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="input-field"
                />
            </div>
            <div>
                <label className="password-label">Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="input-field"
                />
            </div>
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
            {success && <p style={{ color: 'green' }}>{success}</p>} {/* Show success message */}
        </form>
    );
};

export default Login;

