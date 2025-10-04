#!/bin/bash

echo "🔧 Seleccionar Dockerfile para Render..."
echo

echo "Opciones disponibles:"
echo "1. Dockerfile completo (Frontend + Backend) - Puede fallar"
echo "2. Dockerfile solo Backend - Más estable"
echo

read -p "Selecciona una opción (1-2): " choice

if [ "$choice" = "1" ]; then
    echo "✅ Usando Dockerfile completo"
    cp Dockerfile Dockerfile.backup
    echo
    echo "🚀 Próximos pasos:"
    echo "1. Sube tu código a GitHub"
    echo "2. Redespliega en Render"
    echo "3. Si falla, usa la opción 2"
elif [ "$choice" = "2" ]; then
    echo "✅ Usando Dockerfile solo Backend"
    cp Dockerfile.backend-only Dockerfile
    echo
    echo "🚀 Próximos pasos:"
    echo "1. Sube tu código a GitHub"
    echo "2. Redespliega en Render"
    echo "3. Despliega frontend por separado en Vercel/Netlify"
else
    echo "❌ Opción inválida"
    exit 1
fi

echo
echo "📝 Nota: Si el build falla, usa la opción 2 para estabilidad"
echo
