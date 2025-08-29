@echo off
echo ========================================
echo DEPLOYING GERIATRICS PLATFORM TO NETLIFY
echo ========================================

:: Navigate to project directory (already in Desktop)
cd /d C:\Users\User\Desktop

:: Install dependencies
echo.
echo Installing dependencies...
call npm install

:: Build the project
echo.
echo Building production version...
call npm run build

:: Login to Netlify (will open browser if not logged in)
echo.
echo Logging into Netlify...
call netlify login

:: Deploy to production
echo.
echo Deploying to geriatrics.netlify.app...
call netlify deploy --prod --dir=build --site geriatrics

:: Notify completion
echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo Platform live at: https://geriatrics.netlify.app
echo ========================================
echo.
echo SHUTTING DOWN IN 30 SECONDS...
timeout /t 30

:: SHUTDOWN WINDOWS
shutdown /s /t 0