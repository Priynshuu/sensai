@echo off
echo ========================================
echo AI Career Coach - Setup Verification
echo ========================================
echo.

echo [1/5] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
node --version
echo ✅ Node.js installed
echo.

echo [2/5] Checking PostgreSQL...
pg_isready >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL not running or not found
    echo Please start PostgreSQL service
    pause
    exit /b 1
)
echo ✅ PostgreSQL is running
echo.

echo [3/5] Checking .env file...
if not exist .env (
    echo ❌ .env file not found
    pause
    exit /b 1
)
echo ✅ .env file exists
echo.

echo [4/5] Checking database connection...
node test-db-connection.js
if %errorlevel% neq 0 (
    echo.
    echo ❌ Database connection failed
    echo Please check the error message above
    pause
    exit /b 1
)
echo.

echo [5/5] Checking if database tables exist...
npx prisma db pull >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Database tables not created yet
    echo Run: npx prisma db push
) else (
    echo ✅ Database tables exist
)
echo.

echo ========================================
echo Setup Status Summary
echo ========================================
echo ✅ Node.js: Installed
echo ✅ PostgreSQL: Running
echo ✅ .env: Configured
echo ✅ Database: Connected
echo.
echo 🎯 Ready to run: npm run dev
echo ========================================
pause
