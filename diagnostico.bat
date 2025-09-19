@echo off
echo ========================================
echo    DIAGNOSTICO DEL PROYECTO
echo ========================================

echo.
echo 🔍 Verificando Node.js...
node --version
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    pause
    exit /b 1
) else (
    echo ✅ Node.js está instalado
)

echo.
echo 🔍 Verificando npm...
npm --version
if errorlevel 1 (
    echo ❌ npm no está disponible
    pause
    exit /b 1
) else (
    echo ✅ npm está disponible
)

echo.
echo 🔍 Verificando estructura del proyecto...
if exist "backend" (
    echo ✅ Carpeta backend existe
) else (
    echo ❌ Carpeta backend no existe
)

if exist "frontend" (
    echo ✅ Carpeta frontend existe
) else (
    echo ❌ Carpeta frontend no existe
)

echo.
echo 🔍 Verificando dependencias del backend...
cd backend
if exist "node_modules" (
    echo ✅ Dependencias del backend instaladas
) else (
    echo ❌ Dependencias del backend NO instaladas
    echo 💡 Ejecutando npm install...
    npm install
)

echo.
echo 🔍 Verificando dependencias del frontend...
cd ../frontend
if exist "node_modules" (
    echo ✅ Dependencias del frontend instaladas
) else (
    echo ❌ Dependencias del frontend NO instaladas
    echo 💡 Ejecutando npm install...
    npm install
)

echo.
echo 🔍 Verificando MongoDB...
netstat -an | find "27017" >nul 2>&1
if errorlevel 1 (
    echo ⚠️  MongoDB no está ejecutándose en el puerto 27017
    echo 💡 Instala MongoDB desde: https://www.mongodb.com/try/download/community
) else (
    echo ✅ MongoDB está ejecutándose
)

echo.
echo 🔍 Verificando puertos...
netstat -an | find "3000" >nul 2>&1
if errorlevel 1 (
    echo ✅ Puerto 3000 (frontend) está libre
) else (
    echo ⚠️  Puerto 3000 está en uso
)

netstat -an | find "5000" >nul 2>&1
if errorlevel 1 (
    echo ✅ Puerto 5000 (backend) está libre
) else (
    echo ⚠️  Puerto 5000 está en uso
)

echo.
echo ========================================
echo    DIAGNOSTICO COMPLETADO
echo ========================================
echo.
echo 💡 Si hay errores, resuélvelos antes de continuar
echo 💡 Para iniciar el proyecto, ejecuta: start.bat
echo.
pause
