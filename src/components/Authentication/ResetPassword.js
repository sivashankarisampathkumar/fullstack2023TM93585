// src/components/Authentication/ResetPassword.js
import React, { useState } from 'react';
import authService from '/Users/Z003LWS/my-app-sivashankari/src/services/authService';
import '/Users/Z003LWS/my-app-sivashankari/src/Styles/FormStyles.css'; // Import the shared CSS

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.resetPassword(email, newPassword);
            alert('Password reset successfully');
        } catch (error) {
            alert('Error resetting password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="heading">Reset Password</h2> {/* Use the new class if created */}
            <label className="email-label">Email:</label>
            <input 
                className="input-field" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <label className="password-label">New Password:</label>
            <input 
                className="input-field" 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
            />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword;

