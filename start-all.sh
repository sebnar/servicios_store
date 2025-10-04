#!/bin/bash

# Script para iniciar todos los servicios en un solo contenedor
echo "🚀 Iniciando Servicios Store - Todo en Uno"

# Función para matar procesos al salir
cleanup() {
    echo "🛑 Deteniendo servicios..."
    kill $MONGO_PID $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Configurar trap para cleanup
trap cleanup SIGINT SIGTERM

# Variables de entorno
export NODE_ENV=production
export PORT=5000
export MONGODB_URI=mongodb://localhost:27017/servicios_store
export JWT_SECRET=servicios_store_jwt_secret_2024

# Iniciar MongoDB
echo "📊 Iniciando MongoDB..."
mongod --dbpath /data/db --bind_ip_all --port 27017 &
MONGO_PID=$!

# Esperar a que MongoDB esté listo
echo "⏳ Esperando a que MongoDB esté listo..."
sleep 5

# Iniciar Backend
echo "🔧 Iniciando Backend..."
cd /app/backend
npm start &
BACKEND_PID=$!

# Esperar a que el backend esté listo
echo "⏳ Esperando a que Backend esté listo..."
sleep 3

# Iniciar Frontend
echo "🌐 Iniciando Frontend..."
cd /app/frontend
npm run preview -- --host 0.0.0.0 --port 3000 &
FRONTEND_PID=$!

# Esperar a que el frontend esté listo
echo "⏳ Esperando a que Frontend esté listo..."
sleep 3

# Inicializar base de datos
echo "🔧 Inicializando base de datos..."
cd /app/backend
node /app/init-database.js &
INIT_PID=$!

echo "✅ Todos los servicios iniciados correctamente!"
echo "🌐 URLs de acceso:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo "   MongoDB: localhost:27017"
echo ""
echo "📝 Para detener todos los servicios, presiona Ctrl+C"

# Mantener el script ejecutándose
wait
