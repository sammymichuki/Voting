import db from "../db.js";

export const vote = (req, res) => {
  const userId = req.user.id;
  const { position, candidate_id } = req.body;

  // Check if user has already voted for this position
  db.query(
    "SELECT * FROM votes WHERE user_id = ? AND position = ?",
    [userId, position],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length > 0) return res.status(400).json({ message: "Already voted for this position" });

      // Insert vote
      const sql = "INSERT INTO votes (user_id, position, candidate_id) VALUES (?, ?, ?)";
      db.query(sql, [userId, position, candidate_id], (err2) => {
        if (err2) return res.status(500).json({ error: err2 });
        res.json({ message: "Vote cast successfully!" });
      });
    }
  );
};
