@echo off
echo 🔍 Verificando Dockerfile solo Backend...
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

echo.
echo 🔧 Verificando configuración del Dockerfile...

findstr "backend" Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Incluye backend
) else (
    echo ❌ No incluye backend
    exit /b 1
)

findstr "frontend" Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo ⚠️  Incluye frontend (esto puede causar problemas)
) else (
    echo ✅ No incluye frontend (más estable)
)

findstr "nginx" Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo ⚠️  Incluye nginx (esto puede causar problemas)
) else (
    echo ✅ No incluye nginx (más simple)
)

echo.
echo ✅ Dockerfile solo Backend configurado correctamente!
echo.
echo 🚀 Próximos pasos:
echo 1. Sube tu código a GitHub
echo 2. Redespliega en Render
echo 3. Despliega frontend por separado en Vercel/Netlify
echo.
echo 🌐 URLs esperadas:
echo    Backend API: https://tu-servicio.onrender.com/api
echo    Frontend: https://tu-frontend.vercel.app (después de desplegar)
echo.
pause
