@echo off
echo 🚀 Configurando proyecto para Render.com...
echo.

echo 📁 Creando archivos necesarios...

REM Crear Dockerfile para Render
echo FROM node:18-alpine > Dockerfile.render
echo RUN apk add --no-cache dumb-init >> Dockerfile.render
echo WORKDIR /app >> Dockerfile.render
echo COPY backend/package*.json ./backend/ >> Dockerfile.render
echo COPY backend/ ./backend/ >> Dockerfile.render
echo WORKDIR /app/backend >> Dockerfile.render
echo RUN npm ci --only=production >> Dockerfile.render
echo WORKDIR /app >> Dockerfile.render
echo ENV NODE_ENV=production >> Dockerfile.render
echo ENV PORT=5000 >> Dockerfile.render
echo EXPOSE 5000 >> Dockerfile.render
echo CMD ["dumb-init", "npm", "start", "--prefix", "backend"] >> Dockerfile.render

echo ✅ Dockerfile.render creado

REM Crear render.yaml
echo services: > render.yaml
echo   - type: web >> render.yaml
echo     name: servicios-store-backend >> render.yaml
echo     env: docker >> render.yaml
echo     dockerfilePath: ./Dockerfile.render >> render.yaml
echo     plan: free >> render.yaml
echo     envVars: >> render.yaml
echo       - key: NODE_ENV >> render.yaml
echo         value: production >> render.yaml
echo       - key: PORT >> render.yaml
echo         value: 5000 >> render.yaml
echo       - key: MONGODB_URI >> render.yaml
echo         fromDatabase: >> render.yaml
echo           name: servicios-store-db >> render.yaml
echo           property: connectionString >> render.yaml
echo       - key: JWT_SECRET >> render.yaml
echo         generateValue: true >> render.yaml
echo. >> render.yaml
echo databases: >> render.yaml
echo   - name: servicios-store-db >> render.yaml
echo     plan: free >> render.yaml
echo     databaseName: servicios_store >> render.yaml
echo     user: admin >> render.yaml

echo ✅ render.yaml creado

echo.
echo 🎯 Próximos pasos:
echo 1. Sube tu código a GitHub
echo 2. Ve a https://dashboard.render.com/
echo 3. Crea un nuevo Web Service
echo 4. Conecta tu repositorio de GitHub
echo 5. Configura:
echo    - Name: servicios-store-backend
echo    - Environment: Docker
echo    - Dockerfile Path: Dockerfile.render
echo    - Plan: Free
echo 6. Crea una base de datos MongoDB
echo 7. Configura las variables de entorno
echo.
echo 📖 Para más detalles, lee RENDER_DEPLOYMENT.md
echo.
pause
