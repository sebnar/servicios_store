@echo off
echo 🚀 Inicializando base de datos...
echo.

echo 1️⃣ Creando usuario administrador...
cd backend
npm run init-admin
echo.

echo 2️⃣ Creando servicios de ejemplo...
npm run init-services
echo.

echo ✅ ¡Base de datos inicializada correctamente!
echo.
echo 📋 Datos creados:
echo    - Usuario admin: admin@serviciosstore.com / admin123456
echo    - 6 servicios de ejemplo
echo    - Colecciones: users, services, contents
echo.
echo 🌐 Puedes acceder a:
echo    - Frontend: https://servicios-store.onrender.com
echo    - Admin: https://servicios-store.onrender.com/api/admin
echo.
pause
