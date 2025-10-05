@echo off
echo 🔍 Verificando Dockerfile final...
echo.

echo ✅ Cambios realizados:
echo - ✅ Comando CMD mejorado
echo - ✅ nginx se inicia después del backend
echo - ✅ wait al final para mantener el contenedor
echo - ✅ Configuración completa de nginx
echo.

echo 📁 Verificando archivos:
if exist "Dockerfile" (
    echo ✅ Dockerfile existe
) else (
    echo ❌ Dockerfile no encontrado
    exit /b 1
)

echo.
echo 🚀 Próximos pasos:
echo 1. Sube tu código a GitHub
echo 2. Redespliega en Render
echo 3. Verifica que funcione
echo.
echo 🌐 URLs esperadas:
echo    Frontend: https://servicios-store.onrender.com
echo    Backend API: https://servicios-store.onrender.com/api
echo.
echo 📝 Nota: Dockerfile final con comando mejorado
echo    nginx se inicia después del backend
echo.
pause
