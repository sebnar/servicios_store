# 🎓 Servicios Store - Proyecto Universitario

Aplicación web full-stack para gestión de servicios con React + Express + TypeScript.

## 🚀 Inicio Rápido

### Prerrequisitos
- **Node.js** (versión 16+)
- **MongoDB** (opcional)

### Lanzamiento Automático
```bash
# Windows
start.bat

# Linux/Mac
chmod +x start.sh && ./start.sh
```

### Lanzamiento Manual
```bash
npm run install  # Instalar dependencias
npm start        # Iniciar aplicación
```

## 🌐 Acceso
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia frontend y backend |
| `npm run frontend` | Solo frontend (puerto 3000) |
| `npm run backend` | Solo backend (puerto 5000) |
| `npm run install` | Instala todas las dependencias |

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

---

**Proyecto universitario desarrollado con ❤️**