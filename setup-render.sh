#!/bin/bash

echo "🚀 Configurando proyecto para Render.com..."
echo

echo "📁 Creando archivos necesarios..."

# Crear Dockerfile para Render
cat > Dockerfile.render << 'EOF'
FROM node:18-alpine
RUN apk add --no-cache dumb-init
WORKDIR /app
COPY backend/package*.json ./backend/
COPY backend/ ./backend/
WORKDIR /app/backend
RUN npm ci --only=production
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000
CMD ["dumb-init", "npm", "start", "--prefix", "backend"]
EOF

echo "✅ Dockerfile.render creado"

# Crear render.yaml
cat > render.yaml << 'EOF'
services:
  - type: web
    name: servicios-store-backend
    env: docker
    dockerfilePath: ./Dockerfile.render
    plan: free
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
      - key: MONGODB_URI
        fromDatabase:
          name: servicios-store-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true

databases:
  - name: servicios-store-db
    plan: free
    databaseName: servicios_store
    user: admin
EOF

echo "✅ render.yaml creado"

echo
echo "🎯 Próximos pasos:"
echo "1. Sube tu código a GitHub"
echo "2. Ve a https://dashboard.render.com/"
echo "3. Crea un nuevo Web Service"
echo "4. Conecta tu repositorio de GitHub"
echo "5. Configura:"
echo "   - Name: servicios-store-backend"
echo "   - Environment: Docker"
echo "   - Dockerfile Path: Dockerfile.render"
echo "   - Plan: Free"
echo "6. Crea una base de datos MongoDB"
echo "7. Configura las variables de entorno"
echo
echo "📖 Para más detalles, lee RENDER_DEPLOYMENT.md"
echo
