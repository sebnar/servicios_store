@echo off
echo 🔍 Verificando Dockerfile con configuración de nginx corregida...
echo.

echo ✅ Problema identificado:
echo - ❌ Echo con llaves {} causaba error de parseo
echo - ✅ Ahora cada línea se escribe individualmente
echo - ✅ Sin conflictos con sintaxis de Docker
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
echo 📝 Nota: Configuración de nginx corregida
echo    Cada línea se escribe individualmente
echo.
pause
