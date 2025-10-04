@echo off
echo 🔍 Verificando configuración de MongoDB para Render...
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

findstr "mongodb://localhost" backend/src/utils/database.ts >nul
if %ERRORLEVEL% EQU 0 (
    echo ⚠️  Usa localhost como fallback (esto está bien para desarrollo)
) else (
    echo ✅ No usa localhost como fallback
)

echo.
echo 🚀 Próximos pasos para Render:
echo 1. Crear base de datos MongoDB en Render Dashboard
echo 2. Configurar variable MONGODB_URI en el servicio
echo 3. Redesplegar el servicio
echo.
echo 📖 Para más detalles, lee CONFIGURAR_MONGODB_RENDER.md
echo.
pause
