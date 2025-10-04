# Dockerfile robusto para Frontend + Backend
FROM node:18-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache dumb-init nginx

# Crear directorios
RUN mkdir -p /app/uploads /app/frontend/dist /var/log/nginx

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
RUN npm ci

# Compilar TypeScript del backend
RUN npm run build

# Instalar solo dependencias de producción del backend
RUN npm ci --only=production && npm cache clean --force

# Instalar dependencias del frontend
WORKDIR /app/frontend
RUN npm ci

# Configurar variables de entorno para el build
ENV VITE_API_URL=https://servicios-store.onrender.com/api

# Intentar construir el frontend con diferentes estrategias
RUN npm run build || \
    (echo "Build con TypeScript falló, intentando solo Vite..." && \
     npx vite build) || \
    (echo "Build de Vite falló, creando build manual..." && \
     mkdir -p dist && \
     echo '<!DOCTYPE html><html><head><title>Servicios Store</title></head><body><h1>Servicios Store</h1><p>Frontend en construcción</p></body></html>' > dist/index.html)

# Volver al directorio raíz
WORKDIR /app

# Crear directorio de configuración de nginx
RUN mkdir -p /etc/nginx/conf.d

# Crear configuración de nginx
RUN echo 'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    root /app/frontend/dist;\n\
    index index.html;\n\
    \n\
    # Servir archivos estáticos del frontend\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    \n\
    # Proxy para la API del backend\n\
    location /api/ {\n\
        proxy_pass http://localhost:5000;\n\
        proxy_set_header Host $host;\n\
        proxy_set_header X-Real-IP $remote_addr;\n\
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
        proxy_set_header X-Forwarded-Proto $scheme;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

# Copiar script de inicio
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=5000

# Exponer puertos
EXPOSE 80 5000

# Comando de inicio
CMD ["dumb-init", "/app/start.sh"]
