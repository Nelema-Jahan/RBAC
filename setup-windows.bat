::===============================================
:: RBAC System - Setup Script (Windows)
::===============================================

@echo off
setlocal enabledelayedexpansion

echo.
echo ====================================
echo  RBAC System - Project Setup
echo ====================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed

:: Setup Backend
echo.
echo ====================================
echo Setting up BACKEND...
echo ====================================
cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo [OK] Backend dependencies already installed
)

if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env >nul
    echo [OK] .env created
) else (
    echo [OK] .env already exists
)

cd ..

:: Setup Frontend
echo.
echo ====================================
echo Setting up FRONTEND...
echo ====================================
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo [OK] Frontend dependencies already installed
)

cd ..

echo.
echo ====================================
echo  SETUP COMPLETE! ✅
echo ====================================
echo.
echo Next steps:
echo 1. Open TWO terminal windows
echo 2. In Terminal 1:
echo    cd backend
echo    npm run dev
echo.
echo 3. In Terminal 2:
echo    cd frontend
echo    npm run dev
echo.
echo Then open: http://localhost:3000
echo.
echo Demo Credentials:
echo - alice / 1234 (Admin)
echo - bob / 5678 (Editor)
echo - charlie / 0000 (Viewer)
echo.
pause
