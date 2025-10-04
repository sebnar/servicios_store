#!/bin/bash

echo "🔍 Verificando configuración para Render..."
echo

echo "📁 Verificando archivos necesarios..."

if [ -f "Dockerfile" ]; then
    echo "✅ Dockerfile existe"
else
    echo "❌ Dockerfile no encontrado"
    exit 1
fi

if [ -f "backend/package.json" ]; then
    echo "✅ backend/package.json existe"
else
    echo "❌ backend/package.json no encontrado"
    exit 1
fi

if [ -f "backend/src/index.ts" ]; then
    echo "✅ backend/src/index.ts existe"
else
    echo "❌ backend/src/index.ts no encontrado"
    exit 1
fi

echo
echo "🔧 Verificando contenido del Dockerfile..."

if grep -q "start-all.sh" Dockerfile; then
    echo "❌ Dockerfile todavía contiene start-all.sh"
    echo "💡 Necesitas usar el Dockerfile optimizado para Render"
    exit 1
else
    echo "✅ Dockerfile no contiene start-all.sh"
fi

if grep -q "mongodb" Dockerfile; then
    echo "❌ Dockerfile contiene MongoDB"
    echo "💡 Render no puede ejecutar MongoDB en el mismo contenedor"
    exit 1
else
    echo "✅ Dockerfile no contiene MongoDB"
fi

echo
echo "✅ Configuración correcta para Render!"
echo
echo "🚀 Próximos pasos:"
echo "1. Sube tu código a GitHub"
echo "2. Ve a https://dashboard.render.com/"
echo "3. Crea un nuevo Web Service"
echo "4. Conecta tu repositorio de GitHub"
echo "5. Configura:"
echo "   - Name: servicios-store-backend"
echo "   - Environment: Docker"
echo "   - Dockerfile Path: Dockerfile"
echo "   - Plan: Free"
echo "6. Crea una base de datos MongoDB"
echo "7. Configura las variables de entorno"
echo
