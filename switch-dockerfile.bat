@echo off
echo 🔧 Cambiar Dockerfile para incluir Frontend + Backend...
echo.

echo ⚠️  ADVERTENCIA: El Dockerfile completo puede fallar por errores de TypeScript
echo.

set /p choice="¿Quieres usar el Dockerfile completo? (y/n): "

if /i "%choice%"=="y" (
    echo ✅ Cambiando a Dockerfile completo...
    copy Dockerfile.complete Dockerfile
    echo.
    echo 🚀 Próximos pasos:
    echo 1. Sube tu código a GitHub
    echo 2. Redespliega en Render
    echo 3. Si falla, vuelve al Dockerfile solo backend
    echo.
    echo 💡 Para volver al Dockerfile solo backend:
    echo    copy Dockerfile.backend-only.backup Dockerfile
) else (
    echo ✅ Manteniendo Dockerfile solo backend
    echo.
    echo 🚀 Próximos pasos:
    echo 1. Despliega frontend por separado en Vercel/Netlify
    echo 2. Configura VITE_API_URL=https://servicios-store.onrender.com/api
)

echo.
pause
