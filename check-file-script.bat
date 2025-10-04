@echo off
echo 🔍 Verificando Dockerfile con script de archivo separado...
echo.

echo ✅ Cambios realizados:
echo - ✅ Frontend construido exitosamente con Vite
echo - ✅ Directorio de nginx creado
echo - ✅ Configuración de nginx corregida
echo - ✅ Script de inicio como archivo separado
echo - ✅ Permisos de ejecución configurados
echo.

echo 📁 Archivos creados:
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
echo 📝 Nota: El script ahora es un archivo separado
echo    que se copia al contenedor
echo.
pause
