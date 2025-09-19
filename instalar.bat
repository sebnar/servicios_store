@echo off
echo ========================================
echo    INSTALACION LIMPIA DEL PROYECTO
echo ========================================

echo.
echo 🧹 Limpiando instalaciones anteriores...

REM Limpiar node_modules del backend
if exist "backend\node_modules" (
    echo 🗑️  Eliminando node_modules del backend...
    rmdir /s /q "backend\node_modules"
)

REM Limpiar node_modules del frontend
if exist "frontend\node_modules" (
    echo 🗑️  Eliminando node_modules del frontend...
    rmdir /s /q "frontend\node_modules"
)

REM Limpiar package-lock.json
if exist "backend\package-lock.json" (
    echo 🗑️  Eliminando package-lock.json del backend...
    del "backend\package-lock.json"
)

if exist "frontend\package-lock.json" (
    echo 🗑️  Eliminando package-lock.json del frontend...
    del "frontend\package-lock.json"
)

echo.
echo 📦 Instalando dependencias del backend...
cd backend
npm install
if errorlevel 1 (
    echo ❌ Error instalando dependencias del backend
    pause
    exit /b 1
)

echo.
echo 📦 Instalando dependencias del frontend...
cd ../frontend
npm install
if errorlevel 1 (
    echo ❌ Error instalando dependencias del frontend
    pause
    exit /b 1
)

echo.
echo ✅ Instalación completada exitosamente!
echo.
echo 💡 Ahora puedes ejecutar: start.bat
echo.
pause
