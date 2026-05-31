#!/bin/bash

echo ""
echo "===================================="
echo " RBAC System - Project Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[OK] Node.js is installed"

# Setup Backend
echo ""
echo "===================================="
echo "Setting up BACKEND..."
echo "===================================="
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] Failed to install backend dependencies"
        exit 1
    fi
else
    echo "[OK] Backend dependencies already installed"
fi

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "[OK] .env created"
else
    echo "[OK] .env already exists"
fi

cd ..

# Setup Frontend
echo ""
echo "===================================="
echo "Setting up FRONTEND..."
echo "===================================="
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] Failed to install frontend dependencies"
        exit 1
    fi
else
    echo "[OK] Frontend dependencies already installed"
fi

cd ..

echo ""
echo "===================================="
echo " SETUP COMPLETE! ✅"
echo "===================================="
echo ""
echo "Next steps:"
echo "1. Open TWO terminal windows"
echo "2. In Terminal 1:"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "3. In Terminal 2:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "Demo Credentials:"
echo "- alice / 1234 (Admin)"
echo "- bob / 5678 (Editor)"
echo "- charlie / 0000 (Viewer)"
echo ""
