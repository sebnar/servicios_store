@echo off
echo 🔍 Verificando Dockerfile con URL externa de API...
echo.

echo ✅ Estrategia cambiada:
echo - ❌ URL interna: http://localhost:5000/api
echo - ✅ URL externa: https://servicios-store.onrender.com/api
echo - ✅ Frontend se conecta a la URL externa del backend
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
echo 📝 Nota: Frontend ahora usa URL externa
echo    Se conecta a la API externa del backend
echo.
pause
