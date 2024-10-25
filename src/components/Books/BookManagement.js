// src/components/Books/BookManagement.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '/Users/Z003LWS/my-app-sivashankari/src/services/authService';
import axios from 'axios';
import '/Users/Z003LWS/my-app-sivashankari/src/components/Books/BookManagement.css'; // Import the CSS file for styling
import BookSearch from '/Users/Z003LWS/my-app-sivashankari/src/components/Books/BookSearch'; // Import BookSearch component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const BookManagement = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [location, setLocation] = useState('');
    const [availability, setAvailability] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editBookId, setEditBookId] = useState(null); // For editing mode

    const navigate = useNavigate(); // For navigation

    // Fetch books for the logged-in user
    useEffect(() => {
        const fetchBooks = async () => {
            const user_id = authService.getCurrentUserId();
            try {
                const response = await axios.get(`http://localhost:5001/api/books/${user_id}`);
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Error fetching books.');
            }
        };

        fetchBooks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = authService.getCurrentUserId();

        if (!user_id) {
            setError('User ID is not available. Please log in again.');
            return;
        }

        const bookData = { user_id, title, author, genre, location, availability };

        try {
            let response;
            if (editBookId) {
                // Edit book
                response = await axios.put(`http://localhost:5001/api/books/${editBookId}`, bookData);
                setSuccess('Book updated successfully!');
            } else {
                // Add new book
                response = await axios.post('http://localhost:5001/api/books', bookData);
                setSuccess('Book added successfully!');
            }

            // Reset form and refresh book list
            setTitle('');
            setAuthor('');
            setGenre('');
            setLocation('');
            setAvailability(true);
            setEditBookId(null);
            setBooks(prevBooks => editBookId ? 
                prevBooks.map(book => book.id === editBookId ? response.data : book) : 
                [...prevBooks, response.data]
            );
        } catch (error) {
            console.error('Error saving book:', error.response?.data || error);
            setError('Error saving book. Please try again.');
        }
    };

    const handleEdit = (book) => {
        setEditBookId(book.id);
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setLocation(book.location);
        setAvailability(book.availability);
        setSuccess('');
        setError('');
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/books/${id}`);
            setBooks(books.filter(book => book.id !== id));
            setSuccess('Book deleted successfully!');
        } catch (error) {
            console.error('Error deleting book:', error.response?.data || error);
            setError('Error deleting book.');
        }
    };

    // Navigate to the exchange requests page
    const handleExchangeRequestsClick = () => {
        navigate('/books/exchange-requests');
    };

    return (
        <div className="book-management-container">
            <div className="header">
                <h2>Book Management</h2>
                <div className="notification-bell" onClick={handleExchangeRequestsClick}>
                    <FontAwesomeIcon 
                        icon={faBell} 
                        className="bell-icon" 
                        size="3x" 
                        title="View Exchange Requests" 
                    />
                    <p className="exchange-requests-text">Exchange Requests</p>
                </div>
            </div>

            <BookSearch /> {/* Include BookSearch component here */}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Author:</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div>
                    <label>Genre:</label>
                    <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div>
                    <label>Availability:</label>
                    <input type="checkbox" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
                </div>
                <button type="submit">{editBookId ? 'Update Book' : 'Add Book'}</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>

            <h3>Your Books</h3>
            {books.length > 0 ? (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            {book.title} by {book.author} ({book.genre}) - {book.location} - 
                            {book.availability ? 'Available' : 'Not Available'}
                            <button onClick={() => handleEdit(book)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(book.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books found.</p>
            )}
        </div>
    );
};

export default BookManagement;
