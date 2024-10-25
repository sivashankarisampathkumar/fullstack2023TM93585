const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bookRoutes = require('./routes/bookRoutes'); // Import your book routes
const authRoutes = require('./routes/auth'); // Import your auth routes

const app = express();
const PORT = 5001;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'book_exchange_sivashankari',
    password: 'Shivance@123',
    port: 5432,
});

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// New endpoint to fetch books from other users
app.get('/api/books/other-users/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId); // Ensure userId is an integer

    try {
        // Fetch books where user_id is not equal to the logged-in userId
        const books = await pool.query(
            'SELECT id, user_id, title, author, genre, location FROM books WHERE user_id != $1',
            [userId]
        );
        res.json(books.rows); // Send back the fetched books
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/api', bookRoutes); // Book routes

// Connect to PostgreSQL
pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
