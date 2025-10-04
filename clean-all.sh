#!/bin/bash

echo "🧹 Limpiando completamente Servicios Store..."
echo

echo "🛑 Deteniendo contenedor..."
docker stop servicios-store 2>/dev/null

echo "🗑️ Eliminando contenedor..."
docker rm servicios-store 2>/dev/null

echo "🗑️ Eliminando imagen..."
docker rmi servicios-store 2>/dev/null

echo "🗑️ Eliminando volúmenes..."
docker volume rm servicios-store-data 2>/dev/null
docker volume rm servicios-store-uploads 2>/dev/null

echo "🧹 Limpiando sistema Docker..."
docker system prune -f

echo
echo "✅ Limpieza completa realizada!"
echo
echo "💡 Para volver a ejecutar la aplicación:"
echo "   ./build-and-run.sh"
echo
