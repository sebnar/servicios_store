#!/bin/bash
set -e

echo "🚀 Iniciando Servicios Store - Frontend + Backend"

# Verificar que estamos en el directorio correcto
echo "📁 Directorio actual: $(pwd)"
echo "📁 Contenido de /app:"
ls -la /app/

# Verificar que el script existe
if [ -f "/app/start.sh" ]; then
    echo "✅ Script encontrado"
else
    echo "❌ Script no encontrado"
    exit 1
fi

# Iniciar backend en background
echo "🔧 Iniciando backend..."
cd /app/backend
npm start &
BACKEND_PID=$!

# Esperar a que el backend esté listo
echo "⏳ Esperando backend..."
sleep 5

# Verificar que nginx esté instalado
if command -v nginx >/dev/null 2>&1; then
    echo "✅ Nginx encontrado"
else
    echo "❌ Nginx no encontrado"
    exit 1
fi

# Iniciar nginx
echo "🌐 Iniciando nginx..."
nginx -g "daemon off;" &
NGINX_PID=$!

echo "✅ Servicios iniciados correctamente!"
echo "🌐 Frontend: http://localhost"
echo "🔧 Backend API: http://localhost/api"

# Mantener el script ejecutándose
wait
