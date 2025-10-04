#!/bin/bash

echo "🔍 Verificando configuración de MongoDB para Render..."
echo

echo "📁 Verificando archivos necesarios..."

if [ -f "backend/src/utils/database.ts" ]; then
    echo "✅ backend/src/utils/database.ts existe"
else
    echo "❌ backend/src/utils/database.ts no encontrado"
    exit 1
fi

echo
echo "🔧 Verificando configuración de la base de datos..."

if grep -q "process.env.MONGODB_URI" backend/src/utils/database.ts; then
    echo "✅ Usa variable de entorno MONGODB_URI"
else
    echo "❌ No usa variable de entorno MONGODB_URI"
    exit 1
fi

if grep -q "mongodb://localhost" backend/src/utils/database.ts; then
    echo "⚠️  Usa localhost como fallback (esto está bien para desarrollo)"
else
    echo "✅ No usa localhost como fallback"
fi

echo
echo "🚀 Próximos pasos para Render:"
echo "1. Crear base de datos MongoDB en Render Dashboard"
echo "2. Configurar variable MONGODB_URI en el servicio"
echo "3. Redesplegar el servicio"
echo
echo "📖 Para más detalles, lee CONFIGURAR_MONGODB_RENDER.md"
echo
