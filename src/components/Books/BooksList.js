// src/components/Books/BooksList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SendExchangeRequest from './SendExchangeRequest'; // Import the SendExchangeRequest component

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const userId = /* Get the current user's ID */;

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get(`http://localhost:5001/api/books/other-users/${userId}`);
            setBooks(response.data);
        };

        fetchBooks();
    }, [userId]);

    const handleExchangeInitiation = (book) => {
        setSelectedBook(book); // Set the selected book for exchange
    };

    return (
        <div>
            <h3>Available Books for Exchange</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.user_id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.location}</td>
                            <td>
                                <button onClick={() => handleExchangeInitiation(book)}>Initiate Exchange</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedBook && (
                <SendExchangeRequest
                    bookId={selectedBook.id}
                    receiverId={selectedBook.user_id} // The user who owns the book
                    onClose={() => setSelectedBook(null)} // Function to close the exchange request form
                />
            )}
        </div>
    );
};

export default BooksList;
