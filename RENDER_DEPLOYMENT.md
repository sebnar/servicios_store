# 🚀 Despliegue en Render.com - Servicios Store

## 📋 Configuración para Render

Render.com tiene limitaciones específicas que requieren un enfoque diferente al Docker local. Aquí te explico cómo desplegar correctamente.

## 🔧 Solución al Error

El error que estás viendo:
```
error: failed to solve: failed to compute cache key: failed to calculate checksum of ref tjwciiga3n0iyapnl2fkskpzu::mzpi2mt2qf4q26sj5q04vs01s: "/start-all.sh": not found
```

Se debe a que Render no puede ejecutar múltiples servicios (MongoDB + Backend + Frontend) en un solo contenedor.

## 🚀 Despliegue Correcto en Render

### Opción 1: Solo Backend en Render (Recomendado)

1. **Crear servicio de Backend:**
   - Tipo: Web Service
   - Entorno: Docker
   - Dockerfile: `Dockerfile.render.simple`
   - Puerto: 5000

2. **Crear base de datos MongoDB:**
   - Tipo: Database
   - Plan: Free
   - Nombre: `servicios-store-db`

3. **Configurar variables de entorno:**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb://admin:password@dpg-xxxxx-a/servicios_store
   JWT_SECRET=tu_jwt_secret_aqui
   ```

4. **Desplegar Frontend por separado:**
   - Usar Vercel, Netlify, o GitHub Pages
   - Configurar `VITE_API_URL` apuntando a tu backend de Render

### Opción 2: Usar render.yaml

1. **Crear archivo `render.yaml` en la raíz del proyecto**
2. **Configurar servicios separados**
3. **Desplegar desde GitHub**

## 📁 Archivos Necesarios para Render

### Dockerfile.render.simple
```dockerfile
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
```

### render.yaml
```yaml
services:
  - type: web
    name: servicios-store-backend
    env: docker
    dockerfilePath: ./Dockerfile.render.simple
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
```

## 🔧 Pasos para Desplegar

### 1. Preparar el Proyecto
```bash
# Asegúrate de que estos archivos existan:
# - Dockerfile.render.simple
# - render.yaml
# - backend/package.json
# - backend/src/
```

### 2. Crear Servicio en Render
1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Name**: `servicios-store-backend`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `Dockerfile.render.simple`
   - **Plan**: `Free`

### 3. Crear Base de Datos
1. Click "New +" → "Database"
2. Configura:
   - **Name**: `servicios-store-db`
   - **Plan**: `Free`
   - **Database**: `MongoDB`

### 4. Configurar Variables de Entorno
En el servicio de backend, agregar:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://admin:password@dpg-xxxxx-a/servicios_store
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
```

### 5. Desplegar Frontend
1. **Opción A - Vercel:**
   ```bash
   npm install -g vercel
   cd frontend
   vercel
   ```

2. **Opción B - Netlify:**
   - Conecta tu repositorio
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`

3. **Opción C - GitHub Pages:**
   ```bash
   cd frontend
   npm run build
   # Subir dist/ a GitHub Pages
   ```

## 🌐 URLs Finales

- **Backend API**: `https://servicios-store-backend.onrender.com`
- **Frontend**: `https://tu-frontend.vercel.app` (o tu dominio)
- **Base de datos**: MongoDB en Render

## 🔧 Configuración del Frontend

En `frontend/src/services/api.ts`, cambiar:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://servicios-store-backend.onrender.com';
```

## 🐛 Solución de Problemas

### Error: "start-all.sh not found"
- **Causa**: Render no puede ejecutar múltiples servicios
- **Solución**: Usar `Dockerfile.render.simple` que solo ejecuta el backend

### Error: "MongoDB connection failed"
- **Causa**: Variable `MONGODB_URI` incorrecta
- **Solución**: Verificar la URI de la base de datos en Render

### Error: "Frontend can't connect to backend"
- **Causa**: CORS o URL incorrecta
- **Solución**: Configurar CORS en backend y URL correcta en frontend

## 📝 Notas Importantes

1. **Render Free Plan** tiene limitaciones:
   - Servicios se duermen después de 15 minutos de inactividad
   - Límite de 750 horas/mes
   - Solo 1 base de datos gratuita

2. **Para producción** considera:
   - Planes pagos de Render
   - MongoDB Atlas para base de datos
   - CDN para archivos estáticos

3. **Monitoreo**:
   - Usar logs de Render para debug
   - Configurar health checks
   - Monitorear uso de recursos

## 🚀 Despliegue Rápido

1. **Sube tu código a GitHub**
2. **Crea servicio en Render** con `Dockerfile.render.simple`
3. **Crea base de datos MongoDB** en Render
4. **Configura variables de entorno**
5. **Despliega frontend** en Vercel/Netlify
6. **¡Listo!** 🎉

¿Necesitas ayuda con algún paso específico?
