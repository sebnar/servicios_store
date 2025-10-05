@echo off
echo 🔍 Probando login con logs detallados...
echo.

echo 📧 Probando con admin@serviciosstore.com...
echo.
curl -X POST https://servicios-store.onrender.com/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@serviciosstore.com\",\"password\":\"admin123456\"}" ^
  -v

echo.
echo.
echo 📧 Probando con usuario de prueba...
echo.
curl -X POST https://servicios-store.onrender.com/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@test.com\",\"password\":\"123456\"}" ^
  -v

echo.
echo.
echo 📊 Verificando servicios...
echo.
curl -X GET https://servicios-store.onrender.com/api/services

echo.
echo.
echo 📊 Verificando health...
echo.
curl -X GET https://servicios-store.onrender.com/api/health

echo.
echo.
echo ✅ Pruebas completadas. Revisa los logs en Render Dashboard.
echo.
pause
