# 🎓 Servicios Store - Proyecto Universitario

Aplicación web full-stack para gestión de servicios con React + Express + TypeScript.

## 🚀 Inicio Rápido

### Prerrequisitos
- **Node.js** (versión 16+)
- **MongoDB** ejecutándose en el puerto 27017

### ⚡ Inicio Automático (Recomendado)
```bash
# Windows - Ejecuta este archivo
start.bat
```

### 🔧 Inicio Manual (Si el automático falla)
```bash
# 1. Instalar dependencias (solo la primera vez)
npm run install

# 2. Inicializar usuario administrador (solo la primera vez)
cd backend
npm run init-admin
cd ..

# 3. Iniciar backend (Terminal 1)
cd backend
npm run dev

# 4. Iniciar frontend (Terminal 2)
cd frontend
npm run dev
```

## 🌐 Acceso
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

## 👤 Credenciales de Administrador
- **Email:** admin@serviciosstore.com
- **Contraseña:** admin123456

> ⚠️ **Importante:** Si es la primera vez que ejecutas el proyecto, asegúrate de ejecutar `npm run init-admin` en la carpeta backend para crear el usuario administrador.

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `start.bat` | **Inicio automático** (Windows) - Recomendado |
| `npm run install` | Instala todas las dependencias |
| `npm run init-admin` | Crea usuario administrador (backend) |
| `npm run dev` | Inicia servidor (backend o frontend) |

### Scripts por Carpeta
- **Backend:** `npm run dev` (puerto 5000)
- **Frontend:** `npm run dev` (puerto 3000)

## 🏗️ Tecnologías

### Frontend
- React + TypeScript
- Vite (dev server)
- Tailwind CSS
- Componentes UI (Radix)

### Backend
- Express + TypeScript
- MongoDB + Mongoose
- JWT Authentication
- CORS habilitado

## 📊 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil

### Contenido
- `GET /api/content` - Todo el contenido
- `GET /api/content/:type` - Por tipo
- `GET /api/content/item/:id` - Específico

### Admin (Requiere auth)
- `GET /api/admin/users` - Usuarios
- `GET /api/admin/content` - Gestionar contenido
- `POST /api/admin/content` - Crear contenido
- `PUT /api/admin/content/:id` - Actualizar
- `DELETE /api/admin/content/:id` - Eliminar

## ⚙️ Configuración

Todo está preconfigurado. Para personalizar, crea `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/servicios_store
JWT_SECRET=tu_secreto_jwt
NODE_ENV=development
```

## 🗄️ Base de Datos

### Modelos
- **User:** username, email, password, role, isActive
- **Content:** type, title, subtitle, description, images, isActive

## 🔧 Solución de Problemas

### ❌ Error: "Puerto 5000 en uso"
```bash
# Buscar y terminar proceso
netstat -ano | findstr "5000"
taskkill /PID [número_del_proceso] /F
```

### ❌ Error: "MongoDB no conecta"
- Verificar que MongoDB esté ejecutándose: `netstat -an | findstr "27017"`
- Iniciar MongoDB: `net start MongoDB` (Windows)

### ❌ Error: "ERR_CONNECTION_REFUSED"
- Verificar que ambos servidores estén ejecutándose
- Backend: http://localhost:5000/api/health
- Frontend: http://localhost:3000

### ❌ Error: "concurrently no se reconoce"
```bash
# Instalar dependencia globalmente
npm install -g concurrently
```

---

**Proyecto universitario desarrollado con ❤️**