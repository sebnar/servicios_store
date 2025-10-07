# Documentación del Modelo de Datos - Sistema de Cotizaciones

## Esquema de Base de Datos

### Colección: quotations

#### Campos Principales

##### Información del Cliente
- **clientName** (String, requerido)
  - Descripción: Nombre completo del cliente
  - Validación: Trim aplicado, no puede estar vacío
  - Ejemplo: "Juan Pérez García"

- **clientEmail** (String, requerido)
  - Descripción: Email del cliente
  - Validación: Formato de email válido, convertido a lowercase
  - Ejemplo: "juan.perez@empresa.com"

- **clientPhone** (String, opcional)
  - Descripción: Teléfono de contacto del cliente
  - Validación: Trim aplicado
  - Ejemplo: "+1-555-123-4567"

- **clientCompany** (String, opcional)
  - Descripción: Empresa del cliente
  - Validación: Trim aplicado
  - Ejemplo: "Empresa ABC S.A."

##### Servicios Solicitados
- **requestedServices** (Array, requerido)
  - Descripción: Lista de servicios solicitados
  - Estructura de cada elemento:
    - **serviceId** (ObjectId, requerido)
      - Referencia al documento Service
      - Validación: Debe existir en la colección services
    - **serviceName** (String, requerido)
      - Nombre del servicio al momento de la solicitud
      - Se almacena para mantener historial
    - **quantity** (Number, opcional)
      - Cantidad solicitada del servicio
      - Valor por defecto: 1
      - Validación: Mínimo 1
    - **notes** (String, opcional)
      - Notas específicas del cliente para este servicio
      - Trim aplicado

##### Estado y Seguimiento
- **status** (String, requerido)
  - Descripción: Estado actual de la cotización
  - Valores permitidos: 'pending', 'in_progress', 'completed', 'cancelled'
  - Valor por defecto: 'pending'
  - Validación: Enum estricto

- **assignedTo** (ObjectId, opcional)
  - Referencia al usuario asignado para seguimiento
  - Relación con colección users
  - Se usa para asignar responsabilidades

- **createdBy** (ObjectId, opcional)
  - Referencia al usuario que creó la cotización
  - Relación con colección users
  - Se usa para auditoría

##### Información Financiera
- **estimatedBudget** (Number, opcional)
  - Descripción: Presupuesto estimado por el cliente
  - Validación: Mínimo 0
  - Ejemplo: 5000.00

- **finalBudget** (Number, opcional)
  - Descripción: Presupuesto final aprobado
  - Validación: Mínimo 0
  - Se establece cuando se completa la cotización

- **currency** (String, requerido)
  - Descripción: Moneda utilizada
  - Valor por defecto: 'USD'
  - Validación: Trim aplicado
  - Ejemplo: "USD", "EUR", "MXN"

##### Fechas Importantes
- **requestedDate** (Date, requerido)
  - Descripción: Fecha de solicitud de la cotización
  - Valor por defecto: Fecha actual
  - Se usa para ordenamiento y reportes

- **estimatedDelivery** (Date, opcional)
  - Descripción: Fecha estimada de entrega
  - Se establece por el cliente o administrador
  - Se usa para planificación

- **completedDate** (Date, opcional)
  - Descripción: Fecha de finalización
  - Se establece automáticamente cuando status = 'completed'
  - Se usa para reportes de finalización

##### Notas y Comentarios
- **clientNotes** (String, opcional)
  - Descripción: Notas adicionales del cliente
  - Trim aplicado
  - Se usa para información adicional del cliente

- **adminNotes** (String, opcional)
  - Descripción: Notas internas del administrador
  - Trim aplicado
  - Se usa para seguimiento interno

##### Timestamps Automáticos
- **createdAt** (Date, automático)
  - Descripción: Fecha de creación del documento
  - Se establece automáticamente por MongoDB

- **updatedAt** (Date, automático)
  - Descripción: Fecha de última actualización
  - Se actualiza automáticamente en cada modificación

## Índices de Base de Datos

### Índices para Búsquedas Eficientes
- **clientEmail** (1)
  - Propósito: Búsquedas por email del cliente
  - Tipo: Ascendente
  - Uso: Filtros y búsquedas de cliente

- **status** (1)
  - Propósito: Filtros por estado
  - Tipo: Ascendente
  - Uso: Dashboard y reportes por estado

- **requestedDate** (-1)
  - Propósito: Ordenamiento por fecha de solicitud
  - Tipo: Descendente
  - Uso: Listados ordenados por fecha

- **createdBy** (1)
  - Propósito: Filtros por usuario creador
  - Tipo: Ascendente
  - Uso: Reportes por usuario

- **assignedTo** (1)
  - Propósito: Filtros por usuario asignado
  - Tipo: Ascendente
  - Uso: Gestión de asignaciones

### Índices Compuestos
- **status + requestedDate** (-1)
  - Propósito: Filtros por estado con ordenamiento
  - Uso: Listados filtrados por estado

- **assignedTo + status** (1)
  - Propósito: Cotizaciones asignadas por estado
  - Uso: Dashboard de usuario asignado

## Relaciones con Otras Colecciones

### Relación con Services
- **Campo**: `requestedServices.serviceId`
- **Tipo**: Referencia (ObjectId)
- **Colección**: services
- **Propósito**: Validar que los servicios existan
- **Comportamiento**: Se mantiene el nombre del servicio para historial

### Relación con Users
- **Campo**: `createdBy`
- **Tipo**: Referencia (ObjectId)
- **Colección**: users
- **Propósito**: Auditoría de creación
- **Comportamiento**: Opcional, se establece si hay usuario autenticado

- **Campo**: `assignedTo`
- **Tipo**: Referencia (ObjectId)
- **Colección**: users
- **Propósito**: Asignación de responsabilidades
- **Comportamiento**: Se establece por administradores

## Validaciones de Negocio

### Reglas de Estado
- **pending**: Estado inicial, puede cambiar a cualquier otro
- **in_progress**: Solo desde 'pending', puede cambiar a 'completed' o 'cancelled'
- **completed**: Estado final, no puede cambiar
- **cancelled**: Estado final, no puede cambiar

### Reglas de Fechas
- **estimatedDelivery**: Debe ser posterior a requestedDate
- **completedDate**: Se establece automáticamente al cambiar a 'completed'
- **requestedDate**: No puede ser modificada después de la creación

### Reglas de Presupuesto
- **estimatedBudget**: Puede ser establecido por cliente o calculado automáticamente
- **finalBudget**: Solo puede ser establecido por administradores
- **currency**: Debe ser consistente en toda la cotización

## Consideraciones de Rendimiento

### Consultas Optimizadas
- Uso de índices para filtros comunes
- Paginación en consultas grandes
- Proyección de campos para reducir transferencia de datos

### Agregaciones
- Estadísticas por estado
- Reportes por período
- Métricas de rendimiento

### Mantenimiento
- Limpieza de documentos antiguos
- Optimización de índices
- Monitoreo de rendimiento de consultas
