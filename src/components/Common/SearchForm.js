import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [location, setLocation] = useState('');
    const [availability, setAvailability] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ title, author, genre, location, availability });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <input
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
            >
                <option value="">Select Availability</option>
                <option value="available">Available</option>
                <option value="not available">Not Available</option>
            </select>
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
