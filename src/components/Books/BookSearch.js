import React, { useState } from 'react';
import axios from 'axios';
import '/Users/Z003LWS/my-app-sivashankari/src/components/Books/BookStyles.css'; // Importing the updated styles for consistent layout

const BookSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        title: '',
        author: '',
        genre: '',
        location: '',
        availability: '',
    });
    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5001/api/books-search', { params: searchQuery });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results', error);
        }
    };

    return (
        <div className="book-search-container"> {/* Container for search section */}
            <h2 className="book-search-title">Search Books</h2>
            <form onSubmit={handleSearch} className="book-search-form"> {/* Styled form */}
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={searchQuery.title}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={searchQuery.author}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={searchQuery.genre}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={searchQuery.location}
                    onChange={handleChange}
                    className="input-field"
                />
                <select name="availability" value={searchQuery.availability} onChange={handleChange} className="input-field">
                    <option value="">Select Availability</option>
                    <option value="1">Available</option>
                    <option value="0">Not Available</option>
                </select>
                <button type="submit" className="search-button">Search</button>
            </form>
            <div className="book-search-results"> {/* Styled results section */}
                {results.length > 0 ? (
                    results.map((book) => (
                        <div key={book.id} className="book-card"> {/* Styled card for each book */}
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-author">by {book.author}</p>
                            <p className="book-genre">Genre: {book.genre}</p>
                            <p className="book-location">Location: {book.location}</p>
                            <p className="book-availability">{book.availability ? 'Available' : 'Not Available'}</p>
                        </div>
                    ))
                ) : (
                    <p>No books found.</p>
                )}
            </div>
        </div>
    );
};

export default BookSearch;
