@echo off
echo 🔍 Verificando Dockerfile con comando file corregido...
echo.

echo ✅ Problema identificado:
echo - ❌ Comando 'file' no disponible en Alpine Linux
echo - ✅ Removido comando 'file' del Dockerfile
echo - ✅ Solo se ejecuta 'ls -la' para verificar permisos
echo.

echo 📁 Verificando archivos:
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
echo 3. Verifica que funcione
echo.
echo 🌐 URLs esperadas:
echo    Frontend: https://servicios-store.onrender.com
echo    Backend API: https://servicios-store.onrender.com/api
echo.
echo 📝 Nota: El comando 'file' no está disponible en Alpine Linux
echo    Ahora solo se ejecuta 'ls -la' para verificar permisos
echo.
pause
