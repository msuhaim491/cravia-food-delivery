@echo off
cd /d "%~dp0"
title CRAVIA MERN Food Delivery
call npm install
if errorlevel 1 (echo npm install failed & pause & exit /b 1)
call npm run dev
pause
