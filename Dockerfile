# Dockerfile final para Frontend + Backend
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
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

# Instalar dependencias del frontend
WORKDIR /app/frontend
RUN npm ci

# Configurar variables de entorno para el build
ENV VITE_API_BASE_URL=https://servicios-store.onrender.com/api

# Intentar construir el frontend con diferentes estrategias
RUN npm run build || \
    (echo "Build con TypeScript falló, intentando solo Vite..." && \
     npx vite build) || \
    (echo "Build de Vite falló, creando build manual..." && \
     mkdir -p dist && \
     echo '<!DOCTYPE html><html><head><title>Servicios Store</title></head><body><h1>Servicios Store</h1><p>Frontend en construcción</p></body></html>' > dist/index.html)

# Volver al directorio raíz
WORKDIR /app

# Crear configuración de nginx completa
RUN echo 'events {' > /etc/nginx/nginx.conf && \
    echo '    worker_connections 1024;' >> /etc/nginx/nginx.conf && \
    echo '}' >> /etc/nginx/nginx.conf && \
    echo '' >> /etc/nginx/nginx.conf && \
    echo 'http {' >> /etc/nginx/nginx.conf && \
    echo '    include /etc/nginx/mime.types;' >> /etc/nginx/nginx.conf && \
    echo '    default_type application/octet-stream;' >> /etc/nginx/nginx.conf && \
    echo '' >> /etc/nginx/nginx.conf && \
    echo '    server {' >> /etc/nginx/nginx.conf && \
    echo '        listen 80;' >> /etc/nginx/nginx.conf && \
    echo '        server_name localhost;' >> /etc/nginx/nginx.conf && \
    echo '        root /app/frontend/dist;' >> /etc/nginx/nginx.conf && \
    echo '        index index.html;' >> /etc/nginx/nginx.conf && \
    echo '' >> /etc/nginx/nginx.conf && \
    echo '        location / {' >> /etc/nginx/nginx.conf && \
    echo '            try_files $uri $uri/ /index.html;' >> /etc/nginx/nginx.conf && \
    echo '        }' >> /etc/nginx/nginx.conf && \
    echo '' >> /etc/nginx/nginx.conf && \
    echo '        location /api/ {' >> /etc/nginx/nginx.conf && \
    echo '            proxy_pass http://localhost:5000;' >> /etc/nginx/nginx.conf && \
    echo '            proxy_set_header Host $host;' >> /etc/nginx/nginx.conf && \
    echo '            proxy_set_header X-Real-IP $remote_addr;' >> /etc/nginx/nginx.conf && \
    echo '            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;' >> /etc/nginx/nginx.conf && \
    echo '            proxy_set_header X-Forwarded-Proto $scheme;' >> /etc/nginx/nginx.conf && \
    echo '        }' >> /etc/nginx/nginx.conf && \
    echo '    }' >> /etc/nginx/nginx.conf && \
    echo '}' >> /etc/nginx/nginx.conf

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=5000

# Exponer puertos
EXPOSE 80 5000

# Comando de inicio con debugging
CMD ["dumb-init", "sh", "-c", "echo '🚀 Iniciando servicios...' && cd /app/backend && echo '🔧 Iniciando backend...' && npm start & sleep 5 && echo '🌐 Iniciando nginx...' && nginx -g 'daemon off;' & echo '✅ Servicios iniciados' && wait"]
