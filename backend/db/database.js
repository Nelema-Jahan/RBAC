import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "rbac.db");

// Initialize database
export function initDB() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("✓ Database connected");
        createTables(db)
          .then(() => resolve(db))
          .catch(reject);
      }
    });
  });
}

function createTables(db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(
        `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
        (err) => {
          if (err) reject(err);
        }
      );

      // Audit logs table
      db.run(
        `CREATE TABLE IF NOT EXISTS audit_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        action TEXT NOT NULL,
        resource TEXT,
        status TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )`,
        (err) => {
          if (err) reject(err);
          else {
            console.log("✓ Tables initialized");
            resolve();
          }
        }
      );
    });
  });
}

// Get database connection
export function getDB() {
  return new sqlite3.Database(DB_PATH);
}

// Run query helper
export function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.run(query, params, function (err) {
      db.close();
      if (err) reject(err);
      else resolve(this);
    });
  });
}

// Get query helper
export function getQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.get(query, params, (err, row) => {
      db.close();
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// All query helper
export function allQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.all(query, params, (err, rows) => {
      db.close();
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
