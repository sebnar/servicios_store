# Dockerfile único para Servicios Store - Todo en Uno
FROM node:18-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache \
    mongodb \
    mongodb-tools \
    dumb-init \
    bash

# Crear directorios necesarios
RUN mkdir -p /data/db /app/backend /app/frontend /app/uploads

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos del backend
COPY backend/package*.json ./backend/
COPY backend/ ./backend/

# Copiar archivos del frontend
COPY frontend/package*.json ./frontend/
COPY frontend/ ./frontend/

# Instalar dependencias del backend
WORKDIR /app/backend
RUN npm ci --only=production

# Instalar dependencias del frontend
WORKDIR /app/frontend
RUN npm ci && npm run build

# Volver al directorio raíz
WORKDIR /app

# Copiar script de inicio
COPY start-all.sh /app/start-all.sh
RUN chmod +x /app/start-all.sh

# Copiar script de inicialización de la base de datos
COPY init-database.js /app/init-database.js

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=5000
ENV MONGODB_URI=mongodb://localhost:27017/servicios_store
ENV JWT_SECRET=servicios_store_jwt_secret_2024

# Exponer puertos
EXPOSE 3000 5000 27017

# Comando de inicio
CMD ["dumb-init", "/app/start-all.sh"]
