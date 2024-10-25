// src/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import '/Users/Z003LWS/my-app-sivashankari/src/components/Home/Home.css'; // Keep any specific styles for Home

const Home = () => {
    return (
        <div className="overlay-content"> {/* Only contain the overlay content */}
            <h1>Find, share, and exchange books easily</h1>

            {/* Buttons for navigation */}
            <div className="button-container">
                <Link to="/login">
                    <button className="login-button">Login</button>
                </Link>
                <Link to="/register">
                    <button className="signup-button">Signup</button>
                </Link>
                <Link to="/password-reset">
                    <button className="password-reset-button">Password Reset</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;

