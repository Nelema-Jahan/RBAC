import express from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { generateToken, authenticateToken } from "../middleware/auth.js";
import { DEFAULT_ROLE, ROLES, hasPermission } from "../config.js";
import { runQuery, getQuery, allQuery } from "../db/database.js";

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role = DEFAULT_ROLE } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!ROLES.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Check if user exists
    const existing = await getQuery(
      "SELECT id FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = uuidv4();
    await runQuery(
      "INSERT INTO users (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [userId, username, email, hashedPassword, role]
    );

    // Generate token
    const token = generateToken({
      id: userId,
      username,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: userId, username, email, role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    // Find user
    const user = await getQuery("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await getQuery("SELECT id, username, email, role FROM users WHERE id = ?", [
      req.user.id,
    ]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify permission
router.post("/verify-permission", authenticateToken, (req, res) => {
  try {
    const { action } = req.body;

    if (!action) {
      return res.status(400).json({ error: "Action required" });
    }

    const hasAccess = hasPermission(req.user.role, action);

    res.json({
      action,
      role: req.user.role,
      hasAccess,
      permissions: {
        admin: ["create", "read", "update", "delete", "manage_users"],
        editor: ["create", "read", "update"],
        viewer: ["read"],
      }[req.user.role],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
