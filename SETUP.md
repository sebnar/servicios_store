# Configuración del Proyecto Servicios Store

## Requisitos Previos

1. **Node.js** (versión 16 o superior)
2. **MongoDB** (versión 4.4 o superior)
3. **npm** o **yarn**

## Instalación y Configuración

### 1. Instalar Dependencias

```bash
# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```

### 2. Configurar Base de Datos

#### Opción A: MongoDB Local
1. Instalar MongoDB en tu sistema
2. Iniciar el servicio de MongoDB:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

#### Opción B: MongoDB Atlas (Cloud)
1. Crear una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crear un cluster gratuito
3. Obtener la cadena de conexión
4. Actualizar la variable `MONGODB_URI` en el archivo de configuración

### 3. Configurar Variables de Entorno

Crear un archivo `.env` en la carpeta `backend`:

```env
# Configuración del servidor
PORT=5000
NODE_ENV=development

# Base de datos MongoDB
MONGODB_URI=mongodb://localhost:27017/servicios_store

# JWT Secret Key (cambiar en producción)
JWT_SECRET=servicios_store_secret_key_2024_secure

# Configuración CORS
FRONTEND_URL=http://localhost:3000
```

### 4. Inicializar Usuario Administrador

```bash
cd backend
npm run init-admin
```

Esto creará un usuario administrador con las siguientes credenciales:
- **Email:** admin@serviciosstore.com
- **Contraseña:** admin123456
- **Rol:** admin

### 5. Ejecutar el Proyecto

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

## Acceso al Sistema

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

## Credenciales de Administrador

- **Email:** admin@serviciosstore.com
- **Contraseña:** admin123456

## Estructura de la API

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registro de usuario
- `GET /api/auth/profile` - Obtener perfil del usuario
- `GET /api/auth/verify` - Verificar token

### Administración
- `GET /api/admin/*` - Rutas protegidas para administradores

### Contenido
- `GET /api/content/*` - Gestión de contenido

## Solución de Problemas

### Error de Conexión a MongoDB
```
❌ Error conectando a MongoDB: connect ECONNREFUSED 127.0.0.1:27017
```

**Solución:**
1. Verificar que MongoDB esté ejecutándose
2. Verificar la URL de conexión en el archivo `.env`
3. Verificar que el puerto 27017 esté disponible

### Error de CORS
```
Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solución:**
1. Verificar que el backend esté ejecutándose en el puerto 5000
2. Verificar la configuración de CORS en `backend/src/index.ts`

### Token Expirado
```
Token expirado
```

**Solución:**
1. Hacer logout y login nuevamente
2. Verificar que el token JWT no haya expirado (24 horas por defecto)

## Desarrollo

### Agregar Nuevas Rutas
1. Crear el controlador en `backend/src/routes/`
2. Importar y usar en `backend/src/index.ts`
3. Actualizar el servicio de API en `frontend/src/services/api.ts`

### Agregar Nuevos Modelos
1. Crear el modelo en `backend/src/models/`
2. Definir la interfaz TypeScript
3. Configurar validaciones y middleware

## Producción

### Variables de Entorno de Producción
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/servicios_store
JWT_SECRET=clave_super_secreta_y_larga_para_produccion
FRONTEND_URL=https://tu-dominio.com
```

### Seguridad
- Cambiar `JWT_SECRET` por una clave segura
- Usar HTTPS en producción
- Configurar CORS para el dominio de producción
- Implementar rate limiting
- Usar variables de entorno para datos sensibles
