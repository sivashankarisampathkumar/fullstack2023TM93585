// SearchResults.js
import React from 'react';

const SearchResults = ({ results }) => {
    if (!results || results.length === 0) {
        return <div>No books found</div>;
    }

    return (
        <div>
            {results.map((book) => (
                <div key={book.id}>
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Location: {book.location}</p>
                    <p>Availability: {book.availability_status}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
