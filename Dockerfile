# Dockerfile unificado para Frontend + Backend
FROM node:18-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache dumb-init nginx curl

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

# Instalar dependencias del backend (mantener todas las dependencias)
WORKDIR /app/backend
RUN npm install --no-audit --no-fund
RUN npm run build

# Instalar dependencias del frontend
WORKDIR /app/frontend
RUN npm install --no-audit --no-fund

# Configurar variables de entorno para el build del frontend
ENV VITE_API_URL=https://servicios-store-middle.onrender.com/api

# Construir el frontend (solo Vite, sin TypeScript)
RUN npx vite build

# Volver al directorio raíz
WORKDIR /app

# Crear configuración de nginx mejorada
RUN echo 'events {' > /etc/nginx/nginx.conf && \
    echo '    worker_connections 1024;' >> /etc/nginx/nginx.conf && \
    echo '}' >> /etc/nginx/nginx.conf && \
    echo '' >> /etc/nginx/nginx.conf && \
    echo 'http {' >> /etc/nginx/nginx.conf && \
    echo '    include /etc/nginx/mime.types;' >> /etc/nginx/nginx.conf && \
    echo '    default_type application/octet-stream;' >> /etc/nginx/nginx.conf && \
    echo '    sendfile on;' >> /etc/nginx/nginx.conf && \
    echo '    keepalive_timeout 65;' >> /etc/nginx/nginx.conf && \
    echo '' >> /etc/nginx/nginx.conf && \
    echo '    server {' >> /etc/nginx/nginx.conf && \
    echo '        listen 80;' >> /etc/nginx/nginx.conf && \
    echo '        server_name localhost;' >> /etc/nginx/nginx.conf && \
    echo '        root /app/frontend/dist;' >> /etc/nginx/nginx.conf && \
    echo '        index index.html;' >> /etc/nginx/nginx.conf && \
    echo '' >> /etc/nginx/nginx.conf && \
    echo '        # Proxy para la API del backend' >> /etc/nginx/nginx.conf && \
    echo '        location /api/ {' >> /etc/nginx/nginx.conf && \
    echo '            proxy_pass http://127.0.0.1:5000;' >> /etc/nginx/nginx.conf && \
    echo '            proxy_http_version 1.1;' >> /etc/nginx/nginx.conf && \
    echo '            proxy_set_header Upgrade $http_upgrade;' >> /etc/nginx/nginx.conf && \
    echo '            proxy_set_header Connection "upgrade";' >> /etc/nginx/nginx.conf && \
    echo '            proxy_set_header Host $host;' >> /etc/nginx/nginx.conf && \
    echo '            proxy_set_header X-Real-IP $remote_addr;' >> /etc/nginx/nginx.conf && \
    echo '            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;' >> /etc/nginx/nginx.conf && \
    echo '            proxy_set_header X-Forwarded-Proto $scheme;' >> /etc/nginx/nginx.conf && \
    echo '            proxy_cache_bypass $http_upgrade;' >> /etc/nginx/nginx.conf && \
    echo '            proxy_redirect off;' >> /etc/nginx/nginx.conf && \
    echo '        }' >> /etc/nginx/nginx.conf && \
    echo '' >> /etc/nginx/nginx.conf && \
    echo '        # Servir archivos estáticos del frontend' >> /etc/nginx/nginx.conf && \
    echo '        location / {' >> /etc/nginx/nginx.conf && \
    echo '            try_files $uri $uri/ /index.html;' >> /etc/nginx/nginx.conf && \
    echo '        }' >> /etc/nginx/nginx.conf && \
    echo '    }' >> /etc/nginx/nginx.conf && \
    echo '}' >> /etc/nginx/nginx.conf

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=5000

# Exponer puertos
EXPOSE 80 5000

# Comando de inicio simplificado - solo backend
CMD ["dumb-init", "sh", "-c", "echo '🚀 Starting Servicios Store...' && cd /app/backend && echo '🔧 Building backend...' && npm run build && echo '🚀 Starting backend...' && npm start"]