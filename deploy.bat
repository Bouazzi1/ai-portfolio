@echo off
echo ========================================
echo    AI Automation Studio - GitHub Deploy
echo ========================================
echo.

REM Step 1: Copy portfolio index.html to root
echo [1/5] Preparing files...
copy /Y "portfolio-site\index.html" "index.html" >nul

REM Step 2: Create .gitignore
echo portfolio-site/ > .gitignore
echo templates/ >> .gitignore

REM Step 3: Init git
echo [2/5] Initializing git...
git init

REM Step 4: Add all files
echo [3/5] Adding files...
git add index.html demos/ .gitignore

REM Step 5: Commit
echo [4/5] Committing...
git commit -m "Initial commit - AI Automation Studio Portfolio"

echo.
echo ========================================
echo  DONE! Now run these 2 commands:
echo ========================================
echo.
echo  1. Create a NEW repo on GitHub called "ai-portfolio"
echo     (go to github.com/new)
echo.
echo  2. Then paste this command:
echo     git remote add origin https://github.com/YOUR_USERNAME/ai-portfolio.git
echo     git branch -M main
echo     git push -u origin main
echo.
echo  3. Go to repo Settings ^> Pages ^> Source: main ^> Save
echo.
echo  Your site will be live at:
echo  https://YOUR_USERNAME.github.io/ai-portfolio/
echo ========================================
pause
