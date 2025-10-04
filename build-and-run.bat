@echo off
echo 🐳 Construyendo y ejecutando Servicios Store - Todo en Uno
echo.

echo 📦 Construyendo imagen Docker...
docker build -t servicios-store .

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error al construir la imagen
    pause
    exit /b 1
)

echo.
echo 🚀 Ejecutando contenedor...
docker run -d \
    --name servicios-store \
    -p 3000:3000 \
    -p 5000:5000 \
    -p 27017:27017 \
    -v servicios-store-data:/data/db \
    -v servicios-store-uploads:/app/uploads \
    servicios-store

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error al ejecutar el contenedor
    pause
    exit /b 1
)

echo.
echo ✅ ¡Aplicación ejecutándose correctamente!
echo.
echo 🌐 URLs de acceso:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:5000
echo    MongoDB: localhost:27017
echo.
echo 📊 Para ver el estado:
echo    docker ps
echo.
echo 📝 Para ver los logs:
echo    docker logs -f servicios-store
echo.
echo 🛑 Para detener:
echo    docker stop servicios-store
echo.
pause
