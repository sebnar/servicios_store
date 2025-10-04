@echo off
echo 🔧 Seleccionar Dockerfile para Render...
echo.

echo Opciones disponibles:
echo 1. Dockerfile completo (Frontend + Backend) - Puede fallar
echo 2. Dockerfile solo Backend - Más estable
echo.

set /p choice="Selecciona una opción (1-2): "

if "%choice%"=="1" (
    echo ✅ Usando Dockerfile completo
    copy Dockerfile Dockerfile.backup
    echo.
    echo 🚀 Próximos pasos:
    echo 1. Sube tu código a GitHub
    echo 2. Redespliega en Render
    echo 3. Si falla, usa la opción 2
) else if "%choice%"=="2" (
    echo ✅ Usando Dockerfile solo Backend
    copy Dockerfile.backend-only Dockerfile
    echo.
    echo 🚀 Próximos pasos:
    echo 1. Sube tu código a GitHub
    echo 2. Redespliega en Render
    echo 3. Despliega frontend por separado en Vercel/Netlify
) else (
    echo ❌ Opción inválida
    exit /b 1
)

echo.
echo 📝 Nota: Si el build falla, usa la opción 2 para estabilidad
echo.
pause
