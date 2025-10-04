@echo off
echo 🔍 Verificando Dockerfile completo (Frontend + Backend)...
echo.

echo 📁 Verificando archivos necesarios...

if exist "Dockerfile" (
    echo ✅ Dockerfile existe
) else (
    echo ❌ Dockerfile no encontrado
    exit /b 1
)

if exist "backend/package.json" (
    echo ✅ backend/package.json existe
) else (
    echo ❌ backend/package.json no encontrado
    exit /b 1
)

if exist "frontend/package.json" (
    echo ✅ frontend/package.json existe
) else (
    echo ❌ frontend/package.json no encontrado
    exit /b 1
)

echo.
echo 🔧 Verificando configuración del Dockerfile...

findstr "nginx" Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Incluye nginx para frontend
) else (
    echo ❌ No incluye nginx
    exit /b 1
)

findstr "frontend" Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Incluye frontend
) else (
    echo ❌ No incluye frontend
    exit /b 1
)

findstr "backend" Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Incluye backend
) else (
    echo ❌ No incluye backend
    exit /b 1
)

echo.
echo ✅ Dockerfile completo configurado correctamente!
echo.
echo 🚀 Próximos pasos:
echo 1. Sube tu código a GitHub
echo 2. Redespliega en Render
echo 3. Verifica que tanto frontend como backend funcionen
echo.
echo 🌐 URLs esperadas:
echo    Frontend: https://servicios-store.onrender.com
echo    Backend API: https://servicios-store.onrender.com/api
echo.
echo ⚠️  Si el build falla, vuelve al Dockerfile solo backend:
echo    copy Dockerfile.backend-only.backup Dockerfile
echo.
pause
