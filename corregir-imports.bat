@echo off
echo ========================================
echo    CORRIGIENDO IMPORTS DE DEPENDENCIAS
echo ========================================

echo.
echo 🔧 Corrigiendo imports en archivos UI...

cd frontend\src\components\ui

REM Corregir todos los imports de @radix-ui
for %%f in (*.tsx) do (
    echo Corrigiendo %%f...
    powershell -Command "(Get-Content '%%f') -replace '@radix-ui/react-([^@]+)@[0-9.]+', '@radix-ui/react-$1' | Set-Content '%%f'"
    powershell -Command "(Get-Content '%%f') -replace 'class-variance-authority@[0-9.]+', 'class-variance-authority' | Set-Content '%%f'"
    powershell -Command "(Get-Content '%%f') -replace 'clsx@[0-9.]+', 'clsx' | Set-Content '%%f'"
    powershell -Command "(Get-Content '%%f') -replace 'tailwind-merge@[0-9.]+', 'tailwind-merge' | Set-Content '%%f'"
)

echo.
echo ✅ Imports corregidos exitosamente!
echo.
pause
