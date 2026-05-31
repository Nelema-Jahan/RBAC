import express from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";
import { ROLES } from "../config.js";
import { runQuery, getQuery, allQuery } from "../db/database.js";

const router = express.Router();

// Get all users (admin only)
router.get("/", authenticateToken, authorizeRole("admin"), async (req, res) => {
  try {
    const users = await allQuery(
      "SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC"
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await getQuery(
      "SELECT id, username, email, role, created_at FROM users WHERE id = ?",
      [req.params.id]
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Users can only view their own profile unless they're admin
    if (req.user.id !== user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user (admin only)
router.put("/:id", authenticateToken, authorizeRole("admin"), async (req, res) => {
  try {
    const { role, email } = req.body;

    if (!role || !ROLES.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = await getQuery("SELECT id FROM users WHERE id = ?", [req.params.id]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const query = email
      ? "UPDATE users SET role = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      : "UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";

    const params = email ? [role, email, req.params.id] : [role, req.params.id];

    await runQuery(query, params);

    const updated = await getQuery("SELECT id, username, email, role FROM users WHERE id = ?", [
      req.params.id,
    ]);

    res.json({ message: "User updated successfully", user: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user (admin only)
router.delete("/:id", authenticateToken, authorizeRole("admin"), async (req, res) => {
  try {
    // Prevent self-deletion
    if (req.user.id === req.params.id) {
      return res.status(400).json({ error: "Cannot delete your own account" });
    }

    const user = await getQuery("SELECT username FROM users WHERE id = ?", [req.params.id]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await runQuery("DELETE FROM users WHERE id = ?", [req.params.id]);

    res.json({ message: `User '${user.username}' deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
