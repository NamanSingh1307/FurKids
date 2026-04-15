// ============================================================
// backend/config/db.js
// MySQL connection pool using mysql2
// ============================================================

const mysql = require('mysql2/promise');

// Create a connection pool (reuses connections – better for performance)
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '$h@dow280420',       // ← change in production
  database: process.env.DB_NAME     || 'furkids',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0
});

module.exports = pool;
