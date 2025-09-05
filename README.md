# 🎓 Servicios Store - Proyecto Universitario

Proyecto universitario que combina frontend (React + Vite) y backend (Express + TypeScript) para una aplicación web completa de gestión de servicios.

## 🏗️ Estructura del Proyecto

```
servicios_store/
├── frontend/          # Aplicación React con Vite + TypeScript
├── backend/           # API Express con TypeScript + MongoDB
├── start.bat          # Script automático para Windows
├── start.sh           # Script automático para Linux/Mac
├── package.json       # Scripts principales del proyecto
└── README.md         # Este archivo
```

## 🚀 Cómo Lanzar la Aplicación

### Prerrequisitos
- **Node.js** (versión 16 o superior)
- **npm** (viene incluido con Node.js)
- **MongoDB** (opcional - la aplicación funciona sin base de datos)

### Método 1: Lanzamiento Automático (Recomendado)

**Para Windows:**
```bash
# Doble clic en el archivo o ejecutar en terminal:
start.bat
```

**Para Linux/Mac:**
```bash
# Dar permisos de ejecución y ejecutar:
chmod +x start.sh
./start.sh
```

### Método 2: Lanzamiento Manual

**Paso 1: Instalar dependencias**
```bash
# Instala todas las dependencias (raíz, frontend y backend)
npm run install
```

**Paso 2: Iniciar la aplicación**
```bash
# Inicia frontend y backend simultáneamente
npm start
```

### Método 3: Lanzamiento Individual

**Solo Frontend:**
```bash
npm run frontend
# Se ejecutará en: http://localhost:3000
```

**Solo Backend:**
```bash
npm run backend
# Se ejecutará en: http://localhost:5000
```

## 🌐 URLs de Acceso

Una vez iniciada la aplicación:
- **Frontend (Interfaz de Usuario):** http://localhost:3000
- **Backend (API):** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

## 📁 Frontend
- **Tecnologías:** React, TypeScript, Vite, Tailwind CSS
- **Puerto:** 3000
- **Comando:** `npm run frontend`

## 🔧 Backend
- **Tecnologías:** Node.js, Express, TypeScript, MongoDB, JWT
- **Puerto:** 5000
- **Comando:** `npm run backend`

## 🛠️ Scripts Disponibles

| Comando | Descripción | Cuándo usar |
|---------|-------------|-------------|
| `npm start` | 🚀 Inicia frontend y backend simultáneamente | Para desarrollo completo |
| `npm run frontend` | Solo inicia el frontend (puerto 3000) | Para trabajar solo en la UI |
| `npm run backend` | Solo inicia el backend (puerto 5000) | Para trabajar solo en la API |
| `npm run install` | Instala todas las dependencias del proyecto | Primera vez o después de clonar |
| `npm run setup` | Instala dependencias + mensaje de confirmación | Configuración inicial |

## 📋 Comandos por Escenario

### Primera vez (configuración inicial):
```bash
npm run setup
npm start
```

### Desarrollo diario:
```bash
npm start
```

### Solo trabajar en frontend:
```bash
npm run frontend
```

### Solo trabajar en backend:
```bash
npm run backend
```

## 🔐 Autenticación

El backend incluye un sistema de autenticación JWT con:

- **Registro de usuarios**
- **Login/Logout**
- **Protección de rutas**
- **Roles de usuario** (admin/user)

### Endpoints de Autenticación

- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil del usuario
- `GET /api/auth/verify` - Verificar token

## 📊 API Endpoints

### Contenido Público
- `GET /api/content` - Todo el contenido
- `GET /api/content/:type` - Contenido por tipo
- `GET /api/content/item/:id` - Contenido específico

### Administración (Requiere autenticación admin)
- `GET /api/admin/users` - Lista de usuarios
- `PATCH /api/admin/users/:id/status` - Cambiar estado de usuario
- `GET /api/admin/content` - Gestionar contenido
- `POST /api/admin/content` - Crear contenido
- `PUT /api/admin/content/:id` - Actualizar contenido
- `DELETE /api/admin/content/:id` - Eliminar contenido
- `GET /api/admin/stats` - Estadísticas del dashboard

## 🗄️ Base de Datos

### Modelos

**User:**
- username, email, password
- role (admin/user)
- isActive, timestamps

**Content:**
- type (hero, services, mission, vision, about, contact)
- title, subtitle, description
- images, metadata
- isActive, order, timestamps

## ⚙️ Configuración del Proyecto

**¡Configuración automática!** Todo está preconfigurado para desarrollo:

### Configuración por Defecto:
- **Frontend:** Puerto 3000 (Vite dev server)
- **Backend:** Puerto 5000 (Express server)
- **Base de datos:** MongoDB local (opcional - funciona sin DB)
- **CORS:** Habilitado para `http://localhost:3000`
- **JWT:** Configurado automáticamente
- **Hot Reload:** Activado en ambos servicios

### Variables de Entorno (Opcional):
Si necesitas personalizar la configuración, crea un archivo `.env` en la carpeta `backend/`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/servicios_store
JWT_SECRET=tu_secreto_jwt_aqui
NODE_ENV=development
```

## 🎯 Para el Proyecto Universitario

Este proyecto está optimizado para:
- ✅ Desarrollo rápido
- ✅ Sin configuración compleja
- ✅ Funciona sin base de datos (opcional)
- ✅ Scripts automáticos
- ✅ Documentación simple

## 🎓 Información del Proyecto

**Proyecto Universitario - Servicios Store**
- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Express + TypeScript + MongoDB + JWT
- **Propósito:** Aplicación web completa para gestión de servicios
- **Arquitectura:** Full-stack con separación frontend/backend

## 🆘 Solución de Problemas

### Problemas Comunes:

**1. Error: "npm no se reconoce como comando"**
- Instala Node.js desde [nodejs.org](https://nodejs.org/)
- Reinicia la terminal después de la instalación

**2. Error: "Puerto 3000/5000 ya está en uso"**
```bash
# En Windows, encuentra y mata el proceso:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# En Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

**3. Error de dependencias**
```bash
# Limpia e instala de nuevo:
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json
npm run install
```

**4. MongoDB no funciona**
- **No te preocupes:** La aplicación funciona sin base de datos
- Los datos se almacenan en memoria durante la sesión
- Para usar MongoDB: instala y ejecuta `mongod`

**5. El frontend no se conecta al backend**
- Verifica que ambos servicios estén ejecutándose
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Revisa la consola del navegador para errores de CORS

### Verificación Rápida:
```bash
# Verifica que todo esté funcionando:
curl http://localhost:5000/api/health
# Debería devolver: {"status":"OK","message":"Servidor funcionando correctamente"}
```

---

**¡Proyecto universitario desarrollado con ❤️!**