#!/bin/bash

echo "🔍 Verificando estado de Servicios Store..."
echo

# Verificar si el contenedor está ejecutándose
if ! docker ps | grep -q "servicios-store"; then
    echo "❌ El contenedor no está ejecutándose"
    echo "💡 Ejecuta: ./build-and-run.sh"
    exit 1
fi

echo "✅ Contenedor ejecutándose"

# Verificar puertos
echo "🔌 Verificando puertos..."

# Puerto 3000 (Frontend)
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend (puerto 3000) - OK"
else
    echo "❌ Frontend (puerto 3000) - Error"
fi

# Puerto 5000 (Backend)
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Backend (puerto 5000) - OK"
else
    echo "❌ Backend (puerto 5000) - Error"
fi

# Puerto 27017 (MongoDB)
if nc -z localhost 27017 2>/dev/null; then
    echo "✅ MongoDB (puerto 27017) - OK"
else
    echo "❌ MongoDB (puerto 27017) - Error"
fi

echo
echo "🌐 URLs de acceso:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo "   MongoDB: localhost:27017"
echo
echo "📝 Para ver logs: ./logs.sh"
echo "🛑 Para detener: ./stop.sh"
