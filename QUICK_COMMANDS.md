# 🚀 RBAC System - Quick Commands Reference

## ⚡ FASTEST START (Copy & Paste)

### Windows Users
```batch
:: 1. Navigate to project
cd c:\Users\88017\Desktop\RBAC

:: 2. Run auto-setup
setup-windows.bat

:: Then follow the on-screen instructions
```

### Mac/Linux Users
```bash
# 1. Navigate to project
cd ~/Desktop/RBAC

# 2. Run auto-setup
bash setup-unix.sh

# Then follow the on-screen instructions
```

---

## 📦 MANUAL SETUP COMMANDS

### Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (if not exists)
cp .env.example .env

# Start development server
npm run dev

# Alternative: Production mode
npm start
```

### Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎮 RUNNING THE APPLICATION

### Terminal 1 - Backend
```bash
cd backend
npm run dev
# Runs on: http://localhost:5000
# ✅ Watch for: "🚀 Backend server running"
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
# Runs on: http://localhost:3000
# ✅ Auto-opens in browser
```

### Browser
```
🌐 Open: http://localhost:3000
```

---

## 🔑 LOGIN CREDENTIALS

```
Username: alice    |  Password: 1234   |  Role: admin
Username: bob      |  Password: 5678   |  Role: editor
Username: charlie  |  Password: 0000   |  Role: viewer
```

---

## 🧪 API TESTING WITH CURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "pass123",
    "role": "editor"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "password": "1234"
  }'
```

### Get Current User (Replace TOKEN with actual JWT)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Verify Permission
```bash
curl -X POST http://localhost:5000/api/auth/verify-permission \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"action": "delete"}'
```

### List All Users (Admin Only)
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 🐳 DOCKER COMMANDS

### Build & Run with Docker Compose
```bash
# Build images
docker-compose build

# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

---

## 🎨 PROJECT STRUCTURE QUICK VIEW

```
RBAC/
├── README.md              ← Start here!
├── GETTING_STARTED.md     ← Setup instructions
├── API_REFERENCE.md       ← API documentation
├── PROJECT_SUMMARY.md     ← This project overview
├── backend/               ← Express API
│   ├── server.js
│   ├── config.js
│   ├── routes/
│   └── db/
├── frontend/              ← React App
│   ├── src/
│   ├── App.jsx
│   └── package.json
└── setup-windows.bat      ← Auto-setup
```

---

## 📝 KEY FILES TO MODIFY

### Change Default Users
File: `backend/seed.js`
```javascript
// Edit the defaultUsers array
```

### Change API Port
File: `backend/.env`
```env
PORT=5001  # Change from 5000
```

### Change Frontend Port
File: `frontend/vite.config.js`
```javascript
server: {
  port: 3001,  // Change from 3000
}
```

### Change JWT Secret (Production)
File: `backend/.env`
```env
JWT_SECRET=your_new_secret_key_here
```

---

## 🔧 TROUBLESHOOTING QUICK FIXES

### Port Already in Use
```bash
# Change port in .env or config
# Or kill process using port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Database Issues
```bash
# Delete old database and restart
# Windows:
del backend\db\rbac.db

# Mac/Linux:
rm backend/db/rbac.db

# Restart backend - creates fresh database
```

### Clear Browser Cache
- Chrome: Ctrl+Shift+Delete
- Firefox: Ctrl+Shift+Delete
- Safari: Cmd+Option+E

---

## 📊 PACKAGE COMMANDS

### Backend
```bash
npm run dev     # Development with nodemon
npm start       # Production mode
npm install     # Install dependencies
npm test        # Run tests (if configured)
```

### Frontend
```bash
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview production build
npm install     # Install dependencies
```

---

## 🚢 DEPLOYMENT QUICK STEPS

### Deploy Backend (Heroku)
```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Deploy Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

### Deploy with Docker
```bash
docker-compose up -d
# Services running in background
```

---

## 📚 DOCUMENTATION FILES

| File | Purpose |
|------|---------|
| README.md | Main project documentation |
| GETTING_STARTED.md | Detailed setup instructions |
| API_REFERENCE.md | Complete API endpoints |
| PROJECT_SUMMARY.md | Project overview & features |
| QUICK_COMMANDS.md | This file - quick reference |

---

## 🎯 WORKFLOW CHECKLIST

- [ ] Clone/Download project
- [ ] Run setup script (setup-windows.bat or setup-unix.sh)
- [ ] Backend: npm run dev (Terminal 1)
- [ ] Frontend: npm run dev (Terminal 2)
- [ ] Open http://localhost:3000
- [ ] Login with alice/1234
- [ ] Explore features
- [ ] Test different roles
- [ ] Review code
- [ ] Customize & extend

---

## 💡 USEFUL LINKS

- Local Frontend: http://localhost:3000
- Local Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health
- Node.js: https://nodejs.org/
- React: https://react.dev/
- Express: https://expressjs.com/
- Tailwind: https://tailwindcss.com/

---

## 🆘 NEED HELP?

1. Check GETTING_STARTED.md
2. Review API_REFERENCE.md
3. Read API_REFERENCE.md for endpoints
4. Check project structure in PROJECT_SUMMARY.md
5. Review source code comments
6. Google the error message

---

## ✅ VERIFICATION CHECKLIST

After setup, verify:

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can open http://localhost:3000
- [ ] Can login with alice/1234
- [ ] Dashboard displays correctly
- [ ] Can see user role/permissions
- [ ] Admin can see "Manage Users" button
- [ ] Non-admin users see limited buttons
- [ ] Browser console has no CORS errors

---

**All set! Happy coding! 🚀**
