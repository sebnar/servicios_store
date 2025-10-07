#!/bin/bash

echo "🚀 Starting Servicios Store - Frontend + Backend"

# Función para verificar si el backend está listo
check_backend() {
    echo "🔍 Checking if backend is ready..."
    for i in {1..30}; do
        if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
            echo "✅ Backend is ready!"
            return 0
        fi
        echo "⏳ Waiting for backend... (attempt $i/30)"
        sleep 2
    done
    echo "❌ Backend failed to start"
    return 1
}

# Iniciar backend
echo "🔧 Starting backend..."
cd /app/backend
npm run build
npm start &
BACKEND_PID=$!

# Esperar a que el backend esté listo
if check_backend; then
    echo "🌐 Starting Nginx..."
    nginx -g 'daemon off;' &
    NGINX_PID=$!
    
    echo "✅ All services started successfully!"
    echo "🌐 Frontend: http://localhost"
    echo "🔧 Backend API: http://localhost/api"
    
    # Mantener el script ejecutándose
    wait
else
    echo "❌ Failed to start backend"
    exit 1
fi
