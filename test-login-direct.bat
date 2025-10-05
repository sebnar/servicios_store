@echo off
echo 🔍 Probando login directamente...
echo.

echo Probando con curl...
curl -X POST https://servicios-store.onrender.com/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@serviciosstore.com\",\"password\":\"admin123456\"}"

echo.
echo.
echo Probando con contraseña simple...
curl -X POST https://servicios-store.onrender.com/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@serviciosstore.com\",\"password\":\"admin123\"}"

echo.
echo.
echo Probando con usuario de prueba...
curl -X POST https://servicios-store.onrender.com/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@test.com\",\"password\":\"123456\"}"

echo.
pause
