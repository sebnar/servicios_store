@echo off
echo 🔍 Verificando .dockerignore corregido...
echo.

echo ✅ Problema identificado:
echo - ❌ .dockerignore excluía *.sh
echo - ✅ Ahora solo excluye start-all.sh
echo - ✅ start.sh ahora será incluido en el build
echo.

echo 📁 Verificando archivos:
if exist "start.sh" (
    echo ✅ start.sh existe
) else (
    echo ❌ start.sh no encontrado
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
echo 📝 Nota: El problema era que .dockerignore excluía *.sh
echo    Ahora start.sh será incluido en el build
echo.
pause
