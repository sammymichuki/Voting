// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Samy@2248',
  database: process.env.DB_NAME || 'evoting_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  connection.release();
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, voterId } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !voterId) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Check if email already exists
    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ 
            success: false, 
            message: 'Database error' 
          });
        }

        if (results.length > 0) {
          return res.status(400).json({ 
            success: false, 
            message: 'Email already registered' 
          });
        }

        // Check if voter ID already exists
        db.query(
          'SELECT * FROM users WHERE voter_id = ?',
          [voterId],
          async (err, results) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ 
                success: false, 
                message: 'Database error' 
              });
            }

            if (results.length > 0) {
              return res.status(400).json({ 
                success: false, 
                message: 'Voter ID already registered' 
              });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user
            const query = `
              INSERT INTO users (first_name, last_name, email, password, voter_id, created_at)
              VALUES (?, ?, ?, ?, ?, NOW())
            `;

            db.query(
              query,
              [firstName, lastName, email, hashedPassword, voterId],
              (err, result) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ 
                    success: false, 
                    message: 'Error creating account' 
                  });
                }

                // Generate JWT token
                const token = jwt.sign(
                  { 
                    id: result.insertId, 
                    email: email 
                  },
                  process.env.JWT_SECRET || 'your-secret-key',
                  { expiresIn: '24h' }
                );

                res.status(201).json({
                  success: true,
                  message: 'Account created successfully',
                  token: token,
                  user: {
                    id: result.insertId,
                    firstName,
                    lastName,
                    email
                  }
                });
              }
            );
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ 
            success: false, 
            message: 'Database error' 
          });
        }

        if (results.length === 0) {
          return res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials' 
          });
        }

        const user = results[0];

        // Compare password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return res.status(401).json({ 
            success: false, 
            message: 'Invalid credentials' 
          });
        }

        // Generate JWT token
        const token = jwt.sign(
          { 
            id: user.id, 
            email: user.email 
          },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '24h' }
        );

        res.json({
          success: true,
          message: 'Login successful',
          token: token,
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
          }
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});