@echo off
REM ==================================================================
REM  Double-click this file to open the EcoTree Logics website in your
REM  browser. It always builds your latest edits first (first run also
REM  installs libraries, a few minutes). Close this window to stop.
REM  Needs Node.js 20+ (https://nodejs.org, LTS) installed once.
REM ==================================================================
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Download the LTS version from https://nodejs.org, install it, then double-click this file again.
  start "" https://nodejs.org
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing libraries ^(first time only^)...
  call npm install || (pause & exit /b 1)
)

echo Building the website...
call npm run build || (pause & exit /b 1)

echo.
echo  The website is running at http://localhost:4000
echo  Close this window to stop it.
echo.
start "" http://localhost:4000
call npx serve out -l 4000
