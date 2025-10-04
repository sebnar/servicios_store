@echo off
echo 🔧 Cambiando a Dockerfile robusto para Frontend + Backend...
echo.

echo ✅ Copiando Dockerfile robusto...
copy Dockerfile.robust Dockerfile

echo.
echo ✅ Dockerfile robusto configurado!
echo.
echo 🚀 Características del Dockerfile robusto:
echo - ✅ Incluye frontend + backend
echo - ✅ Manejo de errores de TypeScript
echo - ✅ Fallback si el build falla
echo - ✅ Nginx para servir frontend
echo - ✅ Proxy para API del backend
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
pause
