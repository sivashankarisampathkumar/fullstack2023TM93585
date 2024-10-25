import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserBooks = ({ userId }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/books/user-books/${userId}`);
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching user's books:", error);
            }
        };

        fetchUserBooks();
    }, [userId]);

    return (
        <div>
            <h2>Your Books</h2>
            {books.length > 0 ? (
                <ul>
                    {books.map(book => (
                        <li key={book.id}>
                            {book.title} by {book.author}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no books listed.</p>
            )}
        </div>
    );
};

export default UserBooks;
