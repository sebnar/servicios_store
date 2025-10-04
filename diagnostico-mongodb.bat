@echo off
echo 🔍 Diagnóstico de MongoDB para Render...
echo.

echo 📁 Verificando archivos necesarios...

if exist "backend/src/utils/database.ts" (
    echo ✅ backend/src/utils/database.ts existe
) else (
    echo ❌ backend/src/utils/database.ts no encontrado
    exit /b 1
)

echo.
echo 🔧 Verificando configuración de la base de datos...

findstr "process.env.MONGODB_URI" backend/src/utils/database.ts >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Usa variable de entorno MONGODB_URI
) else (
    echo ❌ No usa variable de entorno MONGODB_URI
    exit /b 1
)

echo.
echo 🚀 Próximos pasos para Render:
echo.
echo 1. Crear base de datos MongoDB en Render Dashboard
echo    - Ve a https://dashboard.render.com/
echo    - Click "New +" → "Database"
echo    - Name: servicios-store-db
echo    - Database: MongoDB
echo    - Plan: Free
echo.
echo 2. Obtener la URI de conexión
echo    - Ve a tu base de datos
echo    - Click "Connect"
echo    - Copia la "External Connection String"
echo.
echo 3. Configurar variable de entorno
echo    - Ve a tu servicio de backend
echo    - Click "Environment"
echo    - Agregar: MONGODB_URI = tu_uri_aqui
echo.
echo 4. Redesplegar el servicio
echo    - Click "Manual Deploy" → "Deploy latest commit"
echo.
echo 📖 Para más detalles, lee PASO_A_PASO_MONGODB_RENDER.md
echo.
pause
