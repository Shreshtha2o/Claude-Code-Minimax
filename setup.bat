@echo off
REM Social Media Design AI - Windows Setup Script
REM This script automates the setup process for Windows

echo.
echo Social Media Design AI - Setup Script
echo =====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% detected

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed!
    echo npm should come with Node.js
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm %NPM_VERSION% detected

echo.
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ npm install failed!
    pause
    exit /b 1
)

echo.
echo 📝 Setting up environment configuration...

REM Create .env file if it doesn't exist
if not exist .env (
    copy .env.example .env
    echo ✅ Created .env file from template
    echo.
    echo 🔑 IMPORTANT: Add your CLAUDE_API_KEY to .env file
    echo    Edit .env and replace: CLAUDE_API_KEY=your-api-key-here
) else (
    echo ✅ .env file already exists
)

echo.
echo =====================================
echo ✅ Setup Complete!
echo =====================================
echo.
echo 📝 Next Steps:
echo.
echo 1. Edit .env file and add your CLAUDE_API_KEY
echo    notepad .env
echo.
echo 2. Start the backend server:
echo    npm start
echo.
echo 3. In another terminal, start the frontend:
echo    npm run frontend
echo.
echo 4. Open your browser and visit:
echo    http://localhost:8000
echo.
echo For detailed instructions, see QUICKSTART.md
echo.
echo Happy designing! 🎨
echo.
pause
