@echo off
chcp 65001 >nul
cd /d "%~dp0"

REM Inicia o servidor Python
start python -m http.server 8000

REM Aguarda um pouco para o servidor iniciar
timeout /t 2 /nobreak

REM Abre o navegador
start http://localhost:8000

REM Mostra mensagem
echo.
echo ========================================
echo   SERVIDOR INICIADO!
echo ========================================
echo.
echo Navegador abrindo automaticamente...
echo.
echo Para PARAR o servidor, feche esta janela.
echo.
pause
