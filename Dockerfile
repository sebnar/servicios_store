# Dockerfile optimizado para Render.com
FROM node:18-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache dumb-init

# Crear directorios
RUN mkdir -p /app/uploads

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos del backend
COPY backend/package*.json ./backend/
COPY backend/ ./backend/

# Instalar dependencias del backend (incluyendo devDependencies para compilar)
WORKDIR /app/backend
RUN npm ci

# Compilar TypeScript
RUN npm run build

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Volver al directorio raíz
WORKDIR /app

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=5000

# Exponer puerto
EXPOSE 5000

# Comando de inicio
CMD ["dumb-init", "npm", "start", "--prefix", "backend"]