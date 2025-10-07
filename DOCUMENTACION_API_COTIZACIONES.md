# Documentación de API - Sistema de Cotizaciones

## Endpoints Públicos

### POST /api/quotations
**Descripción**: Crear una nueva cotización
**Autenticación**: No requerida
**Body**:
```json
{
  "clientName": "string (requerido)",
  "clientEmail": "string (requerido, formato email)",
  "clientPhone": "string (opcional)",
  "clientCompany": "string (opcional)",
  "requestedServices": [
    {
      "serviceId": "ObjectId (requerido)",
      "quantity": "number (opcional, default: 1)",
      "notes": "string (opcional)"
    }
  ],
  "estimatedBudget": "number (opcional)",
  "currency": "string (opcional, default: USD)",
  "clientNotes": "string (opcional)",
  "estimatedDelivery": "string (opcional, formato ISO8601)"
}
```
**Respuesta**: 201 Created
```json
{
  "message": "Cotización creada exitosamente",
  "quotation": { /* objeto cotización completo */ }
}
```

### GET /api/quotations
**Descripción**: Obtener cotizaciones públicas
**Autenticación**: No requerida
**Query Parameters**:
- `status`: string (opcional) - Filtrar por estado
- `clientEmail`: string (opcional) - Filtrar por email
- `limit`: number (opcional, default: 20) - Límite de resultados
- `page`: number (opcional, default: 1) - Página actual

**Respuesta**: 200 OK
```json
{
  "quotations": [ /* array de cotizaciones */ ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 100,
    "itemsPerPage": 20
  }
}
```

### GET /api/quotations/:id
**Descripción**: Obtener cotización específica
**Autenticación**: No requerida
**Parámetros**: id (ObjectId de la cotización)
**Respuesta**: 200 OK con objeto cotización completo

### PUT /api/quotations/:id
**Descripción**: Actualizar cotización existente
**Autenticación**: No requerida
**Body**: Mismo formato que POST
**Respuesta**: 200 OK con cotización actualizada

### DELETE /api/quotations/:id
**Descripción**: Eliminar cotización
**Autenticación**: No requerida
**Respuesta**: 200 OK con mensaje de confirmación

## Endpoints de Administración

### GET /api/admin/quotations
**Descripción**: Obtener todas las cotizaciones para administradores
**Autenticación**: JWT requerido + permisos de admin
**Query Parameters**:
- `status`: string (opcional) - Filtrar por estado
- `assignedTo`: ObjectId (opcional) - Filtrar por usuario asignado
- `clientEmail`: string (opcional) - Filtrar por email
- `dateFrom`: string (opcional) - Fecha de inicio (ISO8601)
- `dateTo`: string (opcional) - Fecha de fin (ISO8601)
- `limit`: number (opcional, default: 20)
- `page`: number (opcional, default: 1)

**Respuesta**: 200 OK con array de cotizaciones y paginación

### PATCH /api/admin/quotations/:id/status
**Descripción**: Cambiar estado de cotización
**Autenticación**: JWT requerido + permisos de admin
**Body**:
```json
{
  "status": "pending|in_progress|completed|cancelled"
}
```
**Respuesta**: 200 OK con cotización actualizada

### PATCH /api/admin/quotations/:id/assign
**Descripción**: Asignar cotización a usuario
**Autenticación**: JWT requerido + permisos de admin
**Body**:
```json
{
  "assignedTo": "ObjectId del usuario"
}
```
**Respuesta**: 200 OK con cotización actualizada

### GET /api/admin/quotations/stats
**Descripción**: Obtener estadísticas de cotizaciones
**Autenticación**: JWT requerido + permisos de admin
**Respuesta**: 200 OK
```json
{
  "total": 100,
  "pending": 25,
  "inProgress": 30,
  "completed": 40,
  "cancelled": 5
}
```

## Códigos de Error

### 400 Bad Request
- Datos de entrada inválidos
- Validación fallida
- Parámetros requeridos faltantes

### 401 Unauthorized
- Token JWT inválido o expirado
- Usuario no autenticado

### 403 Forbidden
- Usuario sin permisos de administrador
- Acceso denegado a recurso

### 404 Not Found
- Cotización no encontrada
- Recurso no existe

### 500 Internal Server Error
- Error interno del servidor
- Problemas de base de datos

## Validaciones

### Campos Requeridos
- `clientName`: Debe ser string no vacío
- `clientEmail`: Debe ser email válido
- `requestedServices`: Array con al menos un servicio

### Validaciones de Servicios
- `serviceId`: Debe ser ObjectId válido
- `quantity`: Debe ser número entero positivo
- Servicio debe existir en la base de datos

### Validaciones de Fechas
- `estimatedDelivery`: Debe ser fecha ISO8601 válida
- `dateFrom`/`dateTo`: Deben ser fechas válidas para filtros

### Validaciones de Estado
- `status`: Debe ser uno de los valores permitidos
- Transiciones de estado válidas

## Consideraciones de Seguridad

### Autenticación
- Tokens JWT con expiración
- Verificación de firma
- Middleware de autenticación en rutas protegidas

### Autorización
- Verificación de roles de usuario
- Acceso restringido a funciones administrativas
- Validación de permisos por endpoint

### Validación de Datos
- Sanitización de entradas
- Validación de tipos
- Prevención de inyección
- Límites en tamaños de datos

### CORS
- Configuración de orígenes permitidos
- Headers de seguridad
- Métodos HTTP permitidos
