// src/components/Authentication/Register.js
import React, { useState } from 'react';
import authService from '/Users/Z003LWS/my-app-sivashankari/src/services/authService'; // Import your authService
import '/Users/Z003LWS/my-app-sivashankari/src/Styles/FormStyles.css'; // Import the shared CSS

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const userData = { username, password, email }; // No change here

        try {
            const response = await authService.register(userData); // Pass the object directly
            console.log('Registration successful:', response.data);
            setSuccess('Registration successful! Please log in.'); // Success message
            setError(''); // Clear error message
            setUsername('');
            setPassword('');
            setEmail('');
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.'); // Error message
            setSuccess(''); // Clear success message
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <div>
                    <label className="username-label">Username:</label>
                    <input 
                        className="input-field" // Apply the input class
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label className="password-label">Password:</label>
                    <input 
                        className="input-field" // Apply the input class
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label className="email-label">Email:</label>
                    <input 
                        className="input-field" // Apply the input class
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <div>
                {error && <p className="error-message">{error}</p>} {/* Updated to use class */}
                {success && <p className="success-message">{success}</p>} {/* Updated to use class */}
            </div>
        </div>
    );
};

export default Register;
