#!/bin/bash

echo "🛑 Deteniendo Servicios Store..."
echo

docker stop servicios-store

if [ $? -ne 0 ]; then
    echo "❌ Error al detener el contenedor"
    exit 1
fi

echo "✅ Contenedor detenido correctamente!"
echo
echo "🧹 Para eliminar el contenedor:"
echo "   docker rm servicios-store"
echo
echo "🗑️ Para eliminar la imagen:"
echo "   docker rmi servicios-store"
echo
