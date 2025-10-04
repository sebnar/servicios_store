@echo off
echo 🔍 Verificando estado de Servicios Store...
echo

REM Verificar si el contenedor está ejecutándose
docker ps | findstr "servicios-store" >nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ El contenedor no está ejecutándose
    echo 💡 Ejecuta: build-and-run.bat
    pause
    exit /b 1
)

echo ✅ Contenedor ejecutándose

REM Verificar puertos
echo 🔌 Verificando puertos...

REM Puerto 3000 (Frontend)
curl -s http://localhost:3000 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Frontend (puerto 3000) - OK
) else (
    echo ❌ Frontend (puerto 3000) - Error
)

REM Puerto 5000 (Backend)
curl -s http://localhost:5000/api/health >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Backend (puerto 5000) - OK
) else (
    echo ❌ Backend (puerto 5000) - Error
)

REM Puerto 27017 (MongoDB)
netstat -an | findstr ":27017" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ MongoDB (puerto 27017) - OK
) else (
    echo ❌ MongoDB (puerto 27017) - Error
)

echo.
echo 🌐 URLs de acceso:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:5000
echo    MongoDB: localhost:27017
echo.
echo 📝 Para ver logs: logs.bat
echo 🛑 Para detener: stop.bat
echo.
pause
