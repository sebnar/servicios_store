@echo off
echo 🔍 Verificando Dockerfile con variable de entorno correcta...
echo.

echo ✅ Problema identificado:
echo - ❌ Variable incorrecta: VITE_API_URL
echo - ✅ Variable correcta: VITE_API_BASE_URL
echo - ✅ Frontend ahora usará la URL correcta
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
echo 📝 Nota: Variable de entorno corregida
echo    VITE_API_BASE_URL en lugar de VITE_API_URL
echo.
pause
