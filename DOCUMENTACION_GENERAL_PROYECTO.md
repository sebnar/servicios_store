# Documentación General del Proyecto - Servicios Store

## Descripción del Proyecto

Servicios Store es una aplicación web full-stack que permite a los clientes solicitar cotizaciones para servicios específicos y a los administradores gestionar estas solicitudes de manera eficiente. El sistema incluye un catálogo de servicios, sistema de cotizaciones, panel de administración y funcionalidades de gestión completa.

## Arquitectura General

### Stack Tecnológico
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Despliegue**: Docker + Render
- **UI**: Shadcn UI + Tailwind CSS

### Estructura del Proyecto
```
servicios_store/
├── backend/                 # Servidor Node.js
│   ├── src/
│   │   ├── models/         # Modelos de MongoDB
│   │   ├── routes/         # Rutas de API
│   │   ├── middleware/     # Middleware personalizado
│   │   └── utils/          # Utilidades
│   └── package.json
├── frontend/               # Cliente React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── services/       # Servicios de API
│   │   └── utils/          # Utilidades
│   └── package.json
├── Dockerfile              # Configuración Docker
├── render.yaml            # Configuración Render
└── README.md
```

## Funcionalidades Principales

### Para Clientes
- **Catálogo de Servicios**: Visualización de servicios disponibles
- **Detalles de Servicios**: Información detallada de cada servicio
- **Solicitud de Cotizaciones**: Formulario para solicitar presupuestos
- **Seguimiento**: Consulta del estado de sus cotizaciones

### Para Administradores
- **Panel de Administración**: Dashboard con estadísticas
- **Gestión de Servicios**: CRUD completo de servicios
- **Gestión de Cotizaciones**: Administración de solicitudes
- **Estadísticas**: Métricas en tiempo real
- **Asignaciones**: Asignar cotizaciones a usuarios

## Modelos de Datos

### Service (Servicios)
- Información básica del servicio
- Precios y descripciones
- Categorías y etiquetas
- Estado de disponibilidad

### Quotation (Cotizaciones)
- Información del cliente
- Servicios solicitados
- Estados de seguimiento
- Presupuestos y fechas
- Asignaciones y notas

### User (Usuarios)
- Autenticación y autorización
- Roles y permisos
- Información de perfil
- Historial de actividades

## API REST

### Endpoints Públicos
- **GET /api/services**: Listar servicios disponibles
- **GET /api/services/:id**: Obtener servicio específico
- **POST /api/quotations**: Crear nueva cotización
- **GET /api/quotations**: Obtener cotizaciones públicas

### Endpoints de Administración
- **POST /api/auth/login**: Autenticación de administradores
- **GET /api/admin/services**: Gestión de servicios
- **GET /api/admin/quotations**: Gestión de cotizaciones
- **PATCH /api/admin/quotations/:id/status**: Cambiar estado
- **PATCH /api/admin/quotations/:id/assign**: Asignar cotización

## Seguridad

### Autenticación
- Tokens JWT con expiración
- Verificación de firma
- Middleware de autenticación

### Autorización
- Roles de usuario (admin, cliente)
- Permisos por endpoint
- Validación de acceso

### Validación
- Sanitización de entradas
- Validación de tipos
- Prevención de inyección
- Límites en tamaños de datos

## Despliegue

### Configuración Docker
- Imagen unificada para frontend y backend
- Servicio de base de datos MongoDB
- Configuración de CORS
- Servicio de archivos estáticos

### Variables de Entorno
- `MONGODB_URI`: Conexión a base de datos
- `JWT_SECRET`: Clave para tokens
- `NODE_ENV`: Entorno de ejecución
- `PORT`: Puerto del servidor

### Render Deployment
- Servicio unificado con Docker
- Base de datos MongoDB gestionada
- Variables de entorno automáticas
- Health checks configurados

## Desarrollo

### Requisitos del Sistema
- Node.js 18+
- MongoDB 5+
- Docker (opcional)
- Git

### Instalación Local
1. Clonar repositorio
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno
4. Iniciar base de datos
5. Ejecutar aplicación

### Scripts Disponibles
- `npm run dev`: Modo desarrollo
- `npm run build`: Construcción para producción
- `npm start`: Iniciar aplicación
- `npm test`: Ejecutar pruebas

## Mantenimiento

### Monitoreo
- Logs de aplicación
- Métricas de rendimiento
- Estado de base de datos
- Uso de recursos

### Actualizaciones
- Actualización de dependencias
- Migraciones de base de datos
- Despliegue de nuevas versiones
- Rollback en caso de problemas

### Backup
- Respaldo de base de datos
- Configuración de entorno
- Código fuente
- Variables de entorno

## Extensibilidad

### Agregar Nuevos Servicios
1. Actualizar modelo de datos
2. Crear rutas de API
3. Implementar interfaz frontend
4. Agregar validaciones

### Agregar Nuevas Funcionalidades
1. Diseñar modelo de datos
2. Implementar backend
3. Crear componentes frontend
4. Integrar con sistema existente

### Agregar Nuevos Roles
1. Actualizar sistema de autenticación
2. Modificar permisos
3. Actualizar interfaz de usuario
4. Agregar validaciones

## Consideraciones de Rendimiento

### Base de Datos
- Índices optimizados
- Consultas eficientes
- Paginación en listas grandes
- Agregaciones para estadísticas

### Frontend
- Lazy loading de componentes
- Caché de datos
- Optimización de imágenes
- Compresión de assets

### Backend
- Middleware optimizado
- Caché de respuestas
- Compresión de datos
- Rate limiting

## Troubleshooting

### Problemas Comunes
- Errores de conexión a base de datos
- Problemas de autenticación
- Errores de CORS
- Problemas de despliegue

### Soluciones
- Verificar configuración de base de datos
- Revisar tokens JWT
- Configurar CORS correctamente
- Verificar logs de despliegue

### Logs Importantes
- Errores de aplicación
- Errores de base de datos
- Errores de autenticación
- Errores de despliegue
