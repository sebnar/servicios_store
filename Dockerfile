# Dockerfile completo para Frontend + Backend
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

# Construir el frontend
RUN npm run build

# Volver al directorio raíz
WORKDIR /app

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

# Crear script de inicio
RUN echo '#!/bin/bash\n\
echo "🚀 Iniciando Servicios Store - Frontend + Backend"\n\
\n\
# Iniciar backend en background\n\
cd /app/backend\n\
npm start &\n\
BACKEND_PID=$!\n\
\n\
# Esperar a que el backend esté listo\n\
sleep 5\n\
\n\
# Iniciar nginx\n\
nginx -g "daemon off;" &\n\
NGINX_PID=$!\n\
\n\
echo "✅ Servicios iniciados correctamente!"\n\
echo "🌐 Frontend: http://localhost"\n\
echo "🔧 Backend API: http://localhost/api"\n\
\n\
# Mantener el script ejecutándose\n\
wait\n\
' > /app/start.sh && chmod +x /app/start.sh

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=5000

# Exponer puertos
EXPOSE 80 5000

# Comando de inicio
CMD ["dumb-init", "/app/start.sh"]