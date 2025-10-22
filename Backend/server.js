// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/auth');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection (Promise-based)
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'evoting_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

// ==================== AUTH ROUTES ====================

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, voterId } = req.body;

    if (!firstName || !lastName || !email || !password || !voterId) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const [emailCheck] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (emailCheck.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const [voterCheck] = await db.execute('SELECT * FROM users WHERE voter_id = ?', [voterId]);
    if (voterCheck.length > 0) {
      return res.status(400).json({ success: false, message: 'Voter ID already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `INSERT INTO users (first_name, last_name, email, password, voter_id, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [firstName, lastName, email, hashedPassword, voterId]
    );

    const token = jwt.sign(
      { userId: result.insertId, email: email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: { id: result.insertId, firstName, lastName, email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Protected profile route
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, first_name, last_name, email FROM users WHERE id = ?',
      [req.user.userId] // userId from JWT
    );

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user: users[0] });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// ==================== CANDIDATE ROUTES ====================

// Get all positions
app.get('/api/positions', authenticateToken, async (req, res) => {
  try {
    const [positions] = await db.execute('SELECT * FROM positions ORDER BY display_order');
    res.json(positions);
  } catch {
    res.status(500).json({ error: 'Failed to fetch positions' });
  }
});

// Get candidates by position
app.get('/api/candidates/:positionKey', authenticateToken, async (req, res) => {
  try {
    const { positionKey } = req.params;
    const [candidates] = await db.execute(
      `SELECT c.* FROM candidates c
       JOIN positions p ON c.position_id = p.id
       WHERE p.position_key = ?`,
      [positionKey]
    );
    res.json(candidates);
  } catch {
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// Get all candidates grouped by position
app.get('/api/candidates', authenticateToken, async (req, res) => {
  try {
    const [positions] = await db.execute('SELECT * FROM positions ORDER BY display_order');
    const candidatesByPosition = {};

    for (const position of positions) {
      const [candidates] = await db.execute('SELECT * FROM candidates WHERE position_id = ?', [position.id]);
      candidatesByPosition[position.position_key] = candidates;
    }

    res.json(candidatesByPosition);
  } catch {
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// ==================== VOTING ROUTES ====================

// Submit a vote
app.post('/api/votes', authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { positionId, candidateId } = req.body;
    const userId = req.user.userId;

    await connection.beginTransaction();

    const [existingVotes] = await connection.execute(
      'SELECT * FROM votes WHERE user_id = ? AND position_id = ?',
      [userId, positionId]
    );

    if (existingVotes.length > 0) {
      await connection.rollback();
      return res.status(400).json({ error: 'You have already voted for this position' });
    }

    const [result] = await connection.execute(
      'INSERT INTO votes (user_id, position_id, candidate_id) VALUES (?, ?, ?)',
      [userId, positionId, candidateId]
    );

    await connection.commit();
    res.status(201).json({ message: 'Vote submitted successfully' });

  } catch {
    await connection.rollback();
    res.status(500).json({ error: 'Failed to submit vote' });
  } finally {
    connection.release();
  }
});

// Get user's votes
app.get('/api/votes/my-votes', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const [votes] = await db.execute(
      `SELECT v.*, c.name as candidate_name, c.party, p.position_name, p.position_key
       FROM votes v
       JOIN candidates c ON v.candidate_id = c.id
       JOIN positions p ON v.position_id = p.id
       WHERE v.user_id = ?
       ORDER BY v.voted_at DESC`,
      [userId]
    );
    res.json(votes);
  } catch {
    res.status(500).json({ error: 'Failed to fetch votes' });
  }
});

// Check which positions user has voted for
app.get('/api/votes/status', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const [votedPositions] = await db.execute(
      'SELECT position_id FROM votes WHERE user_id = ?',
      [userId]
    );
    res.json(votedPositions.map(v => v.position_id));
  } catch {
    res.status(500).json({ error: 'Failed to fetch vote status' });
  }
});

// ==================== RESULTS ROUTES ====================

app.get('/api/results', authenticateToken, async (req, res) => {
  try {
    const [results] = await db.execute(
      `SELECT 
        p.position_name,
        p.position_key,
        c.name as candidate_name,
        c.party,
        COUNT(v.id) as vote_count
       FROM positions p
       LEFT JOIN candidates c ON c.position_id = p.id
       LEFT JOIN votes v ON v.candidate_id = c.id
       GROUP BY p.id, c.id
       ORDER BY p.display_order, vote_count DESC`
    );
    res.json(results);
  } catch {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
