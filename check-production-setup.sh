#!/bin/bash

echo "🔍 Verificando configuración para producción..."
echo

echo "📁 Verificando archivos necesarios..."

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
echo "🔧 Verificando configuración del package.json..."

if grep -q "node dist/index.js" backend/package.json; then
    echo "✅ Script start usa node dist/index.js"
else
    echo "❌ Script start no está configurado correctamente"
    exit 1
fi

if grep -q "tsc" backend/package.json; then
    echo "✅ Script build existe"
else
    echo "❌ Script build no encontrado"
    exit 1
fi

echo
echo "🔧 Verificando configuración del Dockerfile..."

if grep -q "npm run build" Dockerfile; then
    echo "✅ Dockerfile compila TypeScript"
else
    echo "❌ Dockerfile no compila TypeScript"
    exit 1
fi

if grep -q "npm ci --only=production" Dockerfile; then
    echo "✅ Dockerfile instala solo dependencias de producción"
else
    echo "❌ Dockerfile no instala dependencias de producción"
    exit 1
fi

echo
echo "✅ Configuración correcta para producción!"
echo
echo "🚀 Próximos pasos:"
echo "1. Sube tu código a GitHub"
echo "2. Redespliega en Render"
echo "3. Verifica que el build sea exitoso"
echo
