import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

export const register = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User registered successfully!" });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, users) => {
    if (err) return res.status(500).json({ error: err });
    if (users.length === 0) return res.status(404).json({ message: "User not found" });

    const user = users[0];
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user });
  });
};
