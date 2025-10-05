@echo off
echo 🔍 Verificando Dockerfile simplificado...
echo.

echo ✅ Cambios realizados:
echo - ✅ Sin scripts externos
echo - ✅ CMD directo con sh -c
echo - ✅ Inicia backend y nginx en una línea
echo - ✅ Sin dependencias de archivos externos
echo - ✅ Más simple y confiable
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
echo 📝 Nota: Dockerfile simplificado sin scripts externos
echo    Usa CMD directo para iniciar servicios
echo.
pause
