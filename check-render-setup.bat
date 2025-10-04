@echo off
echo 🔍 Verificando configuración para Render...
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

if exist "backend/src/index.ts" (
    echo ✅ backend/src/index.ts existe
) else (
    echo ❌ backend/src/index.ts no encontrado
    exit /b 1
)

echo.
echo 🔧 Verificando contenido del Dockerfile...

findstr "start-all.sh" Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo ❌ Dockerfile todavía contiene start-all.sh
    echo 💡 Necesitas usar el Dockerfile optimizado para Render
    exit /b 1
) else (
    echo ✅ Dockerfile no contiene start-all.sh
)

findstr "mongodb" Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo ❌ Dockerfile contiene MongoDB
    echo 💡 Render no puede ejecutar MongoDB en el mismo contenedor
    exit /b 1
) else (
    echo ✅ Dockerfile no contiene MongoDB
)

echo.
echo ✅ Configuración correcta para Render!
echo.
echo 🚀 Próximos pasos:
echo 1. Sube tu código a GitHub
echo 2. Ve a https://dashboard.render.com/
echo 3. Crea un nuevo Web Service
echo 4. Conecta tu repositorio de GitHub
echo 5. Configura:
echo    - Name: servicios-store-backend
echo    - Environment: Docker
echo    - Dockerfile Path: Dockerfile
echo    - Plan: Free
echo 6. Crea una base de datos MongoDB
echo 7. Configura las variables de entorno
echo.
pause
