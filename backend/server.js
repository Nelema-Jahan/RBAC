import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { initDB } from "./db/database.js";
import { seedDefaultUsers } from "./seed.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// Initialize database and start server
async function start() {
  try {
    await initDB();
    await seedDefaultUsers();
    app.listen(PORT, () => {
      console.log(`\n🚀 Backend server running on http://localhost:${PORT}`);
      console.log(`📝 API Documentation:`);
      console.log(`   POST   /api/auth/register     - Register user`);
      console.log(`   POST   /api/auth/login        - Login user`);
      console.log(`   GET    /api/auth/me           - Get current user`);
      console.log(`   POST   /api/auth/verify-permission - Verify access`);
      console.log(`   GET    /api/users             - List all users (admin)`);
      console.log(`   PUT    /api/users/:id         - Update user (admin)`);
      console.log(`   DELETE /api/users/:id         - Delete user (admin)\n`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
