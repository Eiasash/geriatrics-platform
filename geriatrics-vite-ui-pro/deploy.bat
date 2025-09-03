@echo off
echo ========================================
echo   Deploying to GitHub Pages
echo ========================================
echo.
echo Building production version...
call npm run build
echo.
echo Deploying to GitHub Pages...
call npx gh-pages -d dist
echo.
echo ========================================
echo Deployment complete!
echo Your site will be available at:
echo https://Eiasash.github.io/geriatrics-platform
echo.
echo Note: It may take a few minutes to go live
echo ========================================
pause