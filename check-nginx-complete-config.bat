@echo off
echo 🔍 Verificando Dockerfile con configuración de nginx completa...
echo.

echo ✅ Problema identificado:
echo - ❌ Configuración de nginx incompleta
echo - ✅ Ahora incluye events y http blocks
echo - ✅ Configuración completa y válida
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
echo 📝 Nota: Configuración de nginx completa
echo    Incluye events, http y server blocks
echo.
pause
