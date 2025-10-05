@echo off
echo 🔍 Verificando Dockerfile con script robusto...
echo.

echo ✅ Cambios realizados:
echo - ✅ Script robusto con verificaciones
echo - ✅ Debug de archivos y directorios
echo - ✅ Verificación de nginx instalado
echo - ✅ Manejo de errores mejorado
echo - ✅ Logs detallados para debugging
echo.

echo 📁 Archivos creados:
if exist "start-robust.sh" (
    echo ✅ start-robust.sh existe
) else (
    echo ❌ start-robust.sh no encontrado
    exit /b 1
)

echo.
echo 🚀 Próximos pasos:
echo 1. Sube tu código a GitHub
echo 2. Redespliega en Render
echo 3. Verifica los logs detallados
echo.
echo 🌐 URLs esperadas:
echo    Frontend: https://servicios-store.onrender.com
echo    Backend API: https://servicios-store.onrender.com/api
echo.
echo 📝 Nota: El script robusto incluye verificaciones
echo    y logs detallados para debugging
echo.
pause
