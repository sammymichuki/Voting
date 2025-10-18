// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

// Example usage in server.js:
// const authenticateToken = require('./middleware/auth');
// 
// app.get('/api/auth/profile', authenticateToken, (req, res) => {
//   db.query(
//     'SELECT id, first_name, last_name, email, voter_id FROM users WHERE id = ?',
//     [req.user.id],
//     (err, results) => {
//       if (err) {
//         return res.status(500).json({ success: false, message: 'Database error' });
//       }
//       if (results.length === 0) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }
//       res.json({ success: true, user: results[0] });
//     }
//   );
// });