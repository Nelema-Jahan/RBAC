import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { runQuery } from './db/database.js';

// Seed default users
export async function seedDefaultUsers() {
  try {
    const defaultUsers = [
      {
        username: 'alice',
        email: 'alice@example.com',
        password: '1234',
        role: 'admin',
      },
      {
        username: 'bob',
        email: 'bob@example.com',
        password: '5678',
        role: 'editor',
      },
      {
        username: 'charlie',
        email: 'charlie@example.com',
        password: '0000',
        role: 'viewer',
      },
    ];

    for (const user of defaultUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const userId = uuidv4();

      try {
        await runQuery(
          'INSERT INTO users (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)',
          [userId, user.username, user.email, hashedPassword, user.role]
        );
        console.log(`✓ Created user: ${user.username} (${user.role})`);
      } catch (err) {
        // User already exists, skip
      }
    }
  } catch (error) {
    console.error('Error seeding users:', error.message);
  }
}
