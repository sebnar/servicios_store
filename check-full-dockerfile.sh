#!/bin/bash

echo "🔍 Verificando Dockerfile completo (Frontend + Backend)..."
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

if [ -f "frontend/package.json" ]; then
    echo "✅ frontend/package.json existe"
else
    echo "❌ frontend/package.json no encontrado"
    exit 1
fi

echo
echo "🔧 Verificando configuración del Dockerfile..."

if grep -q "nginx" Dockerfile; then
    echo "✅ Incluye nginx para frontend"
else
    echo "❌ No incluye nginx"
    exit 1
fi

if grep -q "frontend" Dockerfile; then
    echo "✅ Incluye frontend"
else
    echo "❌ No incluye frontend"
    exit 1
fi

if grep -q "backend" Dockerfile; then
    echo "✅ Incluye backend"
else
    echo "❌ No incluye backend"
    exit 1
fi

echo
echo "✅ Dockerfile completo configurado correctamente!"
echo
echo "🚀 Próximos pasos:"
echo "1. Sube tu código a GitHub"
echo "2. Redespliega en Render"
echo "3. Verifica que tanto frontend como backend funcionen"
echo
echo "🌐 URLs esperadas:"
echo "   Frontend: https://tu-servicio.onrender.com"
echo "   Backend API: https://tu-servicio.onrender.com/api"
echo
