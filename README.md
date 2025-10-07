# Servicios Store

Sistema web para gestión de servicios y cotizaciones con panel de administración.

## Tecnologías

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Base de datos**: MongoDB
- **Despliegue**: Docker + Render

## Funcionalidades

### Clientes
- Catálogo de servicios
- Solicitud de cotizaciones
- Seguimiento de estado

### Administradores
- Panel de administración
- Gestión de servicios
- Gestión de cotizaciones
- Estadísticas en tiempo real

## Instalación

```bash
# Clonar repositorio
git clone <url>

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar aplicación
npm run dev
```

## Variables de Entorno

```
MONGODB_URI=mongodb://localhost:27017/servicios_store
JWT_SECRET=tu_secreto_jwt
NODE_ENV=development
PORT=3000
```

## Scripts

- `npm run dev` - Modo desarrollo
- `npm run build` - Construcción para producción
- `npm start` - Iniciar aplicación

## Despliegue

El proyecto se despliega automáticamente en Render usando Docker. La configuración está en `render.yaml`.

## Estructura del Proyecto

```
├── backend/          # Servidor Node.js
├── frontend/         # Cliente React
├── Dockerfile        # Configuración Docker
└── render.yaml       # Configuración Render
```