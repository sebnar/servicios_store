# Documentación del Sistema de Cotizaciones

## Descripción General

El sistema de cotizaciones permite a los clientes solicitar presupuestos para servicios específicos y a los administradores gestionar estas solicitudes de manera eficiente. El sistema incluye funcionalidades de creación, visualización, filtrado y gestión de estados de cotizaciones.

## Arquitectura del Sistema

### Backend (Node.js + Express + MongoDB)

#### Modelo de Datos
- **Archivo**: `backend/src/models/Quotation.ts`
- **Propósito**: Define el esquema de datos para las cotizaciones en MongoDB
- **Características principales**:
  - Validación de campos requeridos (cliente, servicios, estado)
  - Referencias a servicios y usuarios
  - Índices para búsquedas eficientes
  - Timestamps automáticos

#### Rutas de API

##### Rutas Públicas (`backend/src/routes/quotations.ts`)
- **POST /api/quotations**: Crear nueva cotización
- **GET /api/quotations**: Obtener cotizaciones públicas
- **GET /api/quotations/:id**: Obtener cotización específica
- **PUT /api/quotations/:id**: Actualizar cotización
- **DELETE /api/quotations/:id**: Eliminar cotización

##### Rutas de Administración (`backend/src/routes/admin-quotations.ts`)
- **GET /api/admin/quotations**: Obtener todas las cotizaciones (admin)
- **GET /api/admin/quotations/:id**: Obtener cotización específica (admin)
- **PUT /api/admin/quotations/:id**: Actualizar cotización (admin)
- **PATCH /api/admin/quotations/:id/status**: Cambiar estado de cotización
- **PATCH /api/admin/quotations/:id/assign**: Asignar cotización a usuario
- **GET /api/admin/quotations/stats**: Obtener estadísticas de cotizaciones

#### Middleware de Autenticación
- **Archivo**: `backend/src/middleware/auth.ts`
- **Funciones**:
  - `authenticateToken`: Verificar token JWT
  - `requireAdmin`: Verificar permisos de administrador
- **Aplicación**: Todas las rutas de administración requieren autenticación

### Frontend (React + TypeScript)

#### Servicios de API
- **Archivo**: `frontend/src/services/api.ts`
- **Clase**: `ApiService`
- **Métodos principales**:
  - `createQuotation()`: Crear nueva cotización
  - `getQuotations()`: Obtener cotizaciones públicas
  - `getAdminQuotations()`: Obtener cotizaciones para admin
  - `updateQuotation()`: Actualizar cotización
  - `deleteQuotation()`: Eliminar cotización
  - `updateQuotationStatus()`: Cambiar estado
  - `assignQuotation()`: Asignar cotización

#### Hooks Personalizados
- **Archivo**: `frontend/src/hooks/useQuotations.ts`
- **Hook**: `useQuotations`
  - Gestión de estado para cotizaciones públicas
  - Funciones de CRUD completas
  - Paginación automática
- **Hook**: `useAdminQuotations`
  - Gestión de estado para cotizaciones de administración
  - Filtros avanzados (fecha, asignación, estado)
  - Estadísticas en tiempo real

#### Componentes de Interfaz

##### Formulario de Cotización (`frontend/src/components/QuotationForm.tsx`)
- **Propósito**: Permitir a los clientes crear solicitudes de cotización
- **Funcionalidades**:
  - Selección múltiple de servicios
  - Información del cliente
  - Presupuesto estimado
  - Notas adicionales
  - Validación de campos

##### Lista de Cotizaciones (`frontend/src/components/QuotationList.tsx`)
- **Propósito**: Mostrar y gestionar cotizaciones para administradores
- **Funcionalidades**:
  - Filtrado por estado
  - Búsqueda por cliente
  - Información detallada
  - Botones de acción
  - Estados visuales

##### Panel de Administración (`frontend/src/components/AdminPanel.tsx`)
- **Propósito**: Dashboard principal para administradores
- **Secciones**:
  - Estadísticas generales
  - Cotizaciones recientes
  - Navegación a gestión completa
  - Botones de actualización

## Flujo de Datos

### Creación de Cotización
1. Cliente completa formulario en `QuotationForm`
2. Datos se envían via `apiService.createQuotation()`
3. Backend valida datos y crea registro en MongoDB
4. Respuesta confirma creación exitosa
5. Cliente recibe confirmación

### Gestión Administrativa
1. Admin accede al panel de administración
2. Sistema carga cotizaciones via `useAdminQuotations`
3. Admin puede filtrar, buscar y gestionar cotizaciones
4. Cambios se reflejan en tiempo real
5. Estadísticas se actualizan automáticamente

## Estados del Sistema

### Estados de Cotización
- **pending**: Solicitud inicial, requiere atención
- **in_progress**: En proceso de seguimiento
- **completed**: Finalizada exitosamente
- **cancelled**: Cancelada o no procede

### Estados de Carga
- **loading**: Cargando datos
- **error**: Error en la operación
- **success**: Operación exitosa
- **empty**: Sin datos disponibles

## Validaciones y Seguridad

### Backend
- Validación de campos requeridos
- Verificación de tipos de datos
- Autenticación JWT obligatoria para rutas admin
- Sanitización de entradas
- Índices de base de datos para rendimiento

### Frontend
- Validación de formularios
- Manejo de errores
- Estados de carga
- Confirmaciones de acciones críticas

## Configuración de Despliegue

### Variables de Entorno
- `MONGODB_URI`: Conexión a base de datos
- `JWT_SECRET`: Clave para tokens de autenticación
- `NODE_ENV`: Entorno de ejecución
- `PORT`: Puerto del servidor

### Docker
- Imagen unificada para frontend y backend
- Servicio de base de datos MongoDB
- Configuración de CORS
- Servicio de archivos estáticos

## Consideraciones de Rendimiento

### Base de Datos
- Índices en campos de búsqueda frecuente
- Paginación en consultas grandes
- Agregaciones para estadísticas

### Frontend
- Lazy loading de componentes
- Caché de datos en hooks
- Debounce en búsquedas
- Estados de carga optimizados

## Mantenimiento y Extensibilidad

### Agregar Nuevos Estados
1. Actualizar enum en modelo de datos
2. Agregar casos en funciones de mapeo
3. Actualizar validaciones
4. Modificar interfaz de usuario

### Agregar Nuevos Campos
1. Actualizar esquema de MongoDB
2. Modificar interfaces TypeScript
3. Actualizar formularios
4. Agregar validaciones

### Agregar Nuevas Funcionalidades
1. Crear rutas de API
2. Implementar servicios frontend
3. Crear componentes de interfaz
4. Integrar con sistema existente
