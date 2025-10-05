@echo off
echo 🔧 Inicialización manual de la base de datos
echo.

echo Opciones disponibles:
echo 1. Crear solo usuario admin
echo 2. Crear solo servicios de ejemplo
echo 3. Crear ambos (recomendado)
echo.

set /p choice="Selecciona una opción (1-3): "

if "%choice%"=="1" (
    echo ✅ Creando usuario administrador...
    cd backend
    npm run init-admin
) else if "%choice%"=="2" (
    echo ✅ Creando servicios de ejemplo...
    cd backend
    npm run init-services
) else if "%choice%"=="3" (
    echo ✅ Creando usuario admin y servicios...
    cd backend
    npm run init-admin
    echo.
    npm run init-services
) else (
    echo ❌ Opción inválida
    exit /b 1
)

echo.
echo ✅ ¡Proceso completado!
echo.
pause
