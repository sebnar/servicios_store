@echo off
echo 🔍 Verificando configuración para producción...
echo.

echo 📁 Verificando archivos necesarios...

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
echo 🔧 Verificando configuración del package.json...

findstr "node dist/index.js" backend/package.json >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Script start usa node dist/index.js
) else (
    echo ❌ Script start no está configurado correctamente
    echo 💡 Verificando contenido del package.json...
    type backend/package.json | findstr "start"
    exit /b 1
)

findstr "tsc" backend/package.json >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Script build existe
) else (
    echo ❌ Script build no encontrado
    exit /b 1
)

echo.
echo 🔧 Verificando configuración del Dockerfile...

findstr "npm run build" Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Dockerfile compila TypeScript
) else (
    echo ❌ Dockerfile no compila TypeScript
    exit /b 1
)

findstr "npm ci --only=production" Dockerfile >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Dockerfile instala solo dependencias de producción
) else (
    echo ❌ Dockerfile no instala dependencias de producción
    exit /b 1
)

echo.
echo ✅ Configuración correcta para producción!
echo.
echo 🚀 Próximos pasos:
echo 1. Sube tu código a GitHub
echo 2. Redespliega en Render
echo 3. Verifica que el build sea exitoso
echo.
pause
