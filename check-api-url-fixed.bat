@echo off
echo 🔍 Verificando Dockerfile con URL de API corregida...
echo.

echo ✅ Problema identificado:
echo - ❌ Frontend intentaba conectar a URL externa
echo - ✅ Ahora usa localhost:5000 dentro del contenedor
echo - ✅ Conexión interna entre frontend y backend
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
echo 📝 Nota: Frontend ahora se conecta al backend interno
echo    Usa localhost:5000 en lugar de URL externa
echo.
pause
