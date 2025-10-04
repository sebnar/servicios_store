#!/bin/bash
echo "🚀 Iniciando Servicios Store - Frontend + Backend"

# Iniciar backend en background
cd /app/backend
npm start &
BACKEND_PID=$!

# Esperar a que el backend esté listo
sleep 5

# Iniciar nginx
nginx -g "daemon off;" &
NGINX_PID=$!

echo "✅ Servicios iniciados correctamente!"
echo "🌐 Frontend: http://localhost"
echo "🔧 Backend API: http://localhost/api"

# Mantener el script ejecutándose
wait