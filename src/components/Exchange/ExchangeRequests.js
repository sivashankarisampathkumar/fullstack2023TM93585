// src/ExchangeRequests.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '/Users/Z003LWS/my-app-sivashankari/src/components/Exchange/ExchangeRequests.css'; // Import CSS for styles

const ExchangeRequests = () => {
    const [books, setBooks] = useState([]);
    const userId = 7; // Replace this with your method of retrieving the actual logged-in user's ID
    const [selectedBook, setSelectedBook] = useState(null);
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [exchangeDuration, setExchangeDuration] = useState('');

    useEffect(() => {
        const fetchBooksFromOtherUsers = async () => {
            console.log('Fetching books for user ID:', userId); // Log userId
            try {
                const response = await axios.get(`http://localhost:5001/api/books/other-users/${userId}`);
                console.log('Books fetched:', response.data); // Log fetched books
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books from other users:', error);
            }
        };

        fetchBooksFromOtherUsers();
    }, [userId]);

    const handleExchangeClick = (book) => {
        setSelectedBook(book);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logic to send the exchange request
        const exchangeRequest = {
            bookId: selectedBook.id,
            userId,
            deliveryMethod,
            exchangeDuration,
        };

        try {
            const response = await axios.post('http://localhost:5001/api/exchange-requests', exchangeRequest);
            console.log('Exchange request sent:', response.data);
            // Optionally, reset the form or show a success message
        } catch (error) {
            console.error('Error sending exchange request:', error);
        }
    };

    return (
        <div className="exchange-requests-wrapper"> {/* Added wrapper for background */}
            <div className="exchange-requests-container">
                <h2>Exchange Requests</h2>
                <p>Here, users can view their exchange requests and manage them.</p>

                <h3>Available Books from Other Users</h3>
                {books.length > 0 ? (
                    <ul className="book-list">
                        {books.map((book) => (
                            <li key={book.id} className="book-item">
                                <div className="book-details">
                                    <strong>{book.title}</strong> by {book.author} - {book.genre} ({book.location}) [User ID: {book.user_id}]
                                </div>
                                <button className="exchange-button" onClick={() => handleExchangeClick(book)}>
                                    Exchange
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No books available for exchange.</p>
                )}

                {selectedBook && (
                    <div className="exchange-request-form">
                        <h3>Send Exchange Request for {selectedBook.title}</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Delivery Method:</label>
                                <input 
                                    type="text" 
                                    value={deliveryMethod}
                                    onChange={(e) => setDeliveryMethod(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <label>Exchange Duration:</label>
                                <input 
                                    type="text" 
                                    value={exchangeDuration}
                                    onChange={(e) => setExchangeDuration(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit">Send Request</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExchangeRequests;
