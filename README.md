# 🔐  RBAC System

**A professional, full-stack Role-Based Access Control (RBAC) system showcasing modern web development best practices.**

![React](https://img.shields.io/badge/react-%23323330.svg?style=flat&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405e?style=flat&logo=sqlite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## 📌 Overview

This is a ** full-stack web application** demonstrating:
- ✅ Modern React + Vite frontend with Tailwind CSS
- ✅ Node.js/Express REST API backend
- ✅ JWT-based authentication & authorization
- ✅ SQLite database with proper schema
- ✅ Role-based access control with 3 tiers
- ✅ Professional UI/UX with responsive design
- ✅ Production-ready code structure
- ✅ Security best practices (password hashing, JWT tokens)

## 🎯 Features

### 🔐 Authentication & Security
- User registration and login
- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes with role verification

### 👥 User Management
- Create, read, update, delete users (admin only)
- Dynamic role assignment
- User profile viewing
- Admin can manage all users

### 🔑 Role-Based Access Control
Three distinct roles with hierarchical permissions:

| Role | Permissions | Use Case |
|------|-------------|----------|
| **👑 Admin** | create, read, update, delete, manage_users | Full system access |
| **✏️ Editor** | create, read, update | Content creators |
| **👁️ Viewer** | read | Read-only users |

### 💎 Dashboard Features
- Real-time permission display
- User statistics
- Role information
- Clean, modern interface

## 📁 Project Structure

```
RBAC/
├── backend/                    # Node.js Express API
│   ├── server.js              # Main server file
│   ├── config.js              # RBAC configuration
│   ├── package.json           # Dependencies
│   ├── .env.example           # Environment template
│   ├── db/
│   │   └── database.js        # SQLite setup & queries
│   ├── middleware/
│   │   └── auth.js            # JWT & authorization
│   └── routes/
│       ├── auth.js            # Authentication endpoints
│       └── users.js           # User management endpoints
│
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── App.jsx            # Main component
│   │   ├── main.jsx           # React entry point
│   │   ├── index.css          # Tailwind CSS
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   └── services/          # API client
│   ├── package.json           # Dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind config
│   └── index.html             # HTML entry point
│
├── src/                       # Original CLI version
├── data/                      # CLI data storage
├── setup.bat                  # Setup script (Windows)
├── setup.sh                   # Setup script (Unix)
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 14+ (Backend & Frontend)
- **npm** or **yarn** (Package manager)
- Windows/Mac/Linux

### Installation & Setup

#### 1️⃣ Clone/Download Project
```bash
cd RBAC
```

#### 2️⃣ Setup Environment
**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
bash setup.sh
```

#### 3️⃣ Install Backend Dependencies
```bash
cd backend
npm install
```

#### 4️⃣ Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

#### 5️⃣ Run Backend (in new terminal)
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

#### 6️⃣ Run Frontend (in another terminal)
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:3000`

## 🧪 Demo Credentials

Pre-loaded test accounts:

| Username | Password | Role | Access |
|----------|----------|------|--------|
| alice | 1234 | Admin | Full access + user management |
| bob | 5678 | Editor | Create, read, update |
| charlie | 0000 | Viewer | Read-only |

## 📚 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register         # Register new user
POST   /api/auth/login            # Login user
GET    /api/auth/me               # Get current user (protected)
POST   /api/auth/verify-permission # Check action permission (protected)
```

### User Management Endpoints (Admin Only)

```
GET    /api/users                 # List all users (protected)
GET    /api/users/:id             # Get user by ID (protected)
PUT    /api/users/:id             # Update user role (protected, admin)
DELETE /api/users/:id             # Delete user (protected, admin)
```

### Example Requests

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"1234"}'
```

**Verify Permission:**
```bash
curl -X POST http://localhost:5000/api/auth/verify-permission \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"action":"delete"}'
```

## 🏗️ Architecture

### Backend Architecture
```
Express Server
  ├── Middleware Layer
  │   ├── JWT Authentication
  │   └── CORS & Logging
  ├── Routes
  │   ├── /auth (public)
  │   └── /users (protected)
  └── Database Layer
      ├── SQLite Connection
      └── Query Helpers
```

### Frontend Architecture
```
React App
  ├── Auth Page (Login/Register)
  ├── Dashboard (Protected)
  │   ├── Profile Info
  │   └── Permissions Display
  ├── User Management (Admin Only)
  └── API Service Layer
```

## 🔒 Security Implementation

✅ **Password Security**
- Bcryptjs for password hashing
- 10-round salt for hashing

✅ **Authentication**
- JWT tokens with 24-hour expiry
- Secure token storage in localStorage

✅ **Authorization**
- Role-based middleware verification
- Protected API routes
- Request validation

✅ **Data Protection**
- CORS enabled
- Environment variables for secrets
- No sensitive data in responses

## 💡 Key Code Examples

### Authentication Middleware
```javascript
// backend/middleware/auth.js
export function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}
```

### Permission Checking
```javascript
// backend/config.js
export function hasPermission(role, action) {
  const PERMISSIONS = {
    admin: ['create', 'read', 'update', 'delete', 'manage_users'],
    editor: ['create', 'read', 'update'],
    viewer: ['read'],
  };
  return PERMISSIONS[role]?.includes(action) || false;
}
```

### React API Client
```javascript
// frontend/src/services/api.js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🎓 Learning Outcomes

This project demonstrates:

📚 **Backend Skills**
- Express.js REST API development
- JWT authentication & authorization
- SQLite database operations
- Middleware implementation
- Error handling & validation
- Environment configuration

🎨 **Frontend Skills**
- React functional components
- React hooks (useState, useEffect)
- API integration with axios
- Local storage management
- Responsive UI with Tailwind CSS
- Component composition

⚙️ **DevOps & Tools**
- Build tools (Vite)
- Package management (npm)
- Version control (.gitignore)
- Development vs production environments

## 🛠️ Build & Deployment

### Production Build

**Backend:**
```bash
cd backend
npm start  # Production mode
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

### Deployment Options

1. **Vercel** - Frontend (React + Vite)
2. **Heroku/Railway** - Backend (Node.js)
3. **Docker** - Containerized deployment
4. **AWS/GCP** - Cloud deployment

## 📝 Future Enhancements

- [ ] Audit logging & activity tracking
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] User profile customization
- [ ] Dark mode
- [ ] Advanced filtering & search
- [ ] Permission customization UI
- [ ] Real-time notifications
- [ ] Docker support

## 🤝 Contributing

Feel free to:
- Fork and modify
- Add new features
- Improve UI/UX
- Enhance security
- Optimize performance

## 📄 License

Open source - use freely for learning and portfolio purposes!

## 👨‍💻 About

This is a **production-ready portfolio project** showcasing:
- Full-stack development capabilities
- Modern web technologies
- Best practices in security
- Professional code structure
- Real-world application patterns

Perfect for:
- 📌 Job interviews
- 📌 Portfolio demonstrations
- 📌 Learning RBAC concepts
- 📌 Full-stack development practice

---

## 🚀 Quick Commands Cheat Sheet

```bash
# Setup
setup.bat                    # Windows setup

# Backend
cd backend && npm install    # Install deps
npm run dev                  # Development server
npm start                    # Production server

# Frontend  
cd frontend && npm install   # Install deps
npm run dev                  # Development server
npm run build                # Production build
npm run preview              # Preview build

# Database
# Auto-created on first run in backend/db/rbac.db
```

---
