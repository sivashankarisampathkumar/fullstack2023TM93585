// backend/db.js
const { Pool } = require('pg');

// Create a new pool instance with your database configuration
const pool = new Pool({
    user: 'postgres', // Your database username
    host: 'localhost', // Database host
    database: 'book_exchange_sivashankari', // Your database name
    password: 'Shivance@123', // Your database password
    port: 5432, // Default PostgreSQL port
});

// Export the pool instance to use it in other modules
module.exports = pool;
