@echo off
echo 🛑 Deteniendo Servicios Store...
echo.

docker stop servicios-store

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error al detener el contenedor
    pause
    exit /b 1
)

echo ✅ Contenedor detenido correctamente!
echo.
echo 🧹 Para eliminar el contenedor:
echo    docker rm servicios-store
echo.
echo 🗑️ Para eliminar la imagen:
echo    docker rmi servicios-store
echo.
pause
