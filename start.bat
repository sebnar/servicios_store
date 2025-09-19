@echo off
echo ========================================
echo    SERVICIOS STORE - INICIANDO SISTEMA
echo ========================================

echo.
echo 🔍 Verificando dependencias...

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado. Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si MongoDB está ejecutándose
echo 🔍 Verificando conexión a MongoDB...
netstat -an | find "27017" >nul 2>&1
if errorlevel 1 (
    echo ⚠️  MongoDB no parece estar ejecutándose en el puerto 27017
    echo 💡 Asegúrate de tener MongoDB instalado y ejecutándose
    echo.
)

echo.
echo 📦 Instalando dependencias del Backend...
cd backend
if not exist node_modules (
    npm install
    if errorlevel 1 (
        echo ❌ Error instalando dependencias del backend
        pause
        exit /b 1
    )
)

echo.
echo 📦 Instalando dependencias del Frontend...
cd ../frontend
if not exist node_modules (
    npm install
    if errorlevel 1 (
        echo ❌ Error instalando dependencias del frontend
        pause
        exit /b 1
    )
)

echo.
echo 🚀 Iniciando Backend...
cd ../backend
start "Backend - Servicios Store" cmd /k "echo Iniciando Backend... && npm run dev"

echo.
echo ⏳ Esperando 5 segundos para que el backend se inicie...
timeout /t 5 /nobreak > nul

echo.
echo 🚀 Iniciando Frontend...
cd ../frontend
start "Frontend - Servicios Store" cmd /k "echo Iniciando Frontend... && npm run dev"

echo.
echo ✅ ¡Sistema iniciado correctamente!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🌐 Backend: http://localhost:5000
echo 🔧 Health Check: http://localhost:5000/api/health
echo.
echo 👤 Credenciales de Administrador:
echo    Email: admin@serviciosstore.com
echo    Contraseña: admin123456
echo.
echo 💡 Si es la primera vez, ejecuta: npm run init-admin
echo.
pause
