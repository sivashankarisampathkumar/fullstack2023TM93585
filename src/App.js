// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Authentication/Login'; 
import Register from './components/Authentication/Register';
import PasswordReset from './components/Authentication/ResetPassword';
import BookManagement from './components/Books/BookManagement';
import BookSearch from './components/Books/BookSearch'; // Importing the BookSearch component
import ExchangeRequests from './components/Exchange/ExchangeRequests'; // Corrected import for the ExchangeRequests component
import './Styles/App.css'; // Global styles

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Check for token

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Update authentication state
  };

  return (
    <Router>
      <div className="app-container"> {/* Use the new class for background */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/books-search" element={<BookSearch />} /> {/* New route for book search */}
          {isAuthenticated && (
            <>
              <Route path="/books" element={<BookManagement />} /> {/* Protected route for book management */}
              <Route path="/books/exchange-requests" element={<ExchangeRequests />} /> {/* Route for exchange requests */}
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
