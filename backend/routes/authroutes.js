import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { users } from "../data.js";

dotenv.config();
const router = express.Router();

// ✅ Register User
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ msg: "All fields are required" });

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) return res.status(400).json({ msg: "User already exists" });

  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  res.status(201).json({ msg: "User registered successfully" });
});

// ✅ Login User
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) return res.status(400).json({ msg: "User not found" });
  if (user.password !== password)
    return res.status(400).json({ msg: "Invalid password" });

  // Generate JWT Token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1h" }
  );

  console.log("🎟️ Token generated:", token);
  res.json({ msg: "Login successful", token });
});

export default router;
