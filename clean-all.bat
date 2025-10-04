@echo off
echo 🧹 Limpiando completamente Servicios Store...
echo.

echo 🛑 Deteniendo contenedor...
docker stop servicios-store 2>nul

echo 🗑️ Eliminando contenedor...
docker rm servicios-store 2>nul

echo 🗑️ Eliminando imagen...
docker rmi servicios-store 2>nul

echo 🗑️ Eliminando volúmenes...
docker volume rm servicios-store-data 2>nul
docker volume rm servicios-store-uploads 2>nul

echo 🧹 Limpiando sistema Docker...
docker system prune -f

echo.
echo ✅ Limpieza completa realizada!
echo.
echo 💡 Para volver a ejecutar la aplicación:
echo    build-and-run.bat
echo.
pause
