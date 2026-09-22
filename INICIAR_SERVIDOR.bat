@echo off
chcp 65001 >nul
cls
echo ========================================
echo   SERVIDOR LOCAL - CNH RENOVAÇÃO
echo ========================================
echo.
echo Iniciando servidor...
echo.
python -m http.server 8000
pause
