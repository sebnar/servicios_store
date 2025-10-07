# Documentación de Componentes Frontend - Sistema de Cotizaciones

## Componentes Principales

### QuotationForm
**Archivo**: `frontend/src/components/QuotationForm.tsx`
**Propósito**: Formulario para que los clientes soliciten cotizaciones
**Props**:
- `onSave`: Función callback al guardar cotización
- `onCancel`: Función callback al cancelar

**Funcionalidades**:
- Selección múltiple de servicios
- Información del cliente (nombre, email, teléfono, empresa)
- Presupuesto estimado opcional
- Notas adicionales del cliente
- Fecha de entrega estimada
- Validación de campos requeridos

**Estados Internos**:
- `selectedServices`: Array de servicios seleccionados
- `formData`: Datos del formulario
- `loading`: Estado de carga durante envío
- `errors`: Errores de validación

### QuotationList
**Archivo**: `frontend/src/components/QuotationList.tsx`
**Propósito**: Lista completa de cotizaciones para administradores
**Props**:
- `quotations`: Array de cotizaciones
- `loading`: Estado de carga
- `onRefresh`: Función para refrescar datos
- `onViewQuotation`: Función opcional para ver detalles

**Funcionalidades**:
- Filtrado por estado (pending, in_progress, completed, cancelled)
- Búsqueda por nombre, email o empresa del cliente
- Información detallada de cada cotización
- Estados visuales con colores distintivos
- Botón de actualización
- Manejo de estados vacíos y de carga

**Estados Internos**:
- `searchTerm`: Término de búsqueda
- `statusFilter`: Filtro de estado seleccionado

### AdminPanel
**Archivo**: `frontend/src/components/AdminPanel.tsx`
**Propósito**: Panel principal de administración
**Props**:
- `onLogout`: Función callback al cerrar sesión

**Vistas**:
- **Dashboard**: Estadísticas y cotizaciones recientes
- **Services**: Gestión de servicios
- **Quotations**: Gestión completa de cotizaciones

**Funcionalidades**:
- Navegación entre vistas
- Estadísticas en tiempo real
- Cotizaciones recientes dinámicas
- Botones de acción contextuales

## Hooks Personalizados

### useQuotations
**Archivo**: `frontend/src/hooks/useQuotations.ts`
**Propósito**: Gestión de estado para cotizaciones públicas
**Parámetros**:
- `status`: Filtrar por estado
- `clientEmail`: Filtrar por email
- `limit`: Límite de resultados
- `page`: Página actual
- `autoLoad`: Cargar automáticamente

**Retorna**:
- `quotations`: Array de cotizaciones
- `loading`: Estado de carga
- `error`: Mensaje de error
- `pagination`: Información de paginación
- `refetch`: Función para recargar
- `createQuotation`: Función para crear
- `updateQuotation`: Función para actualizar
- `deleteQuotation`: Función para eliminar

### useAdminQuotations
**Archivo**: `frontend/src/hooks/useQuotations.ts`
**Propósito**: Gestión de estado para cotizaciones de administración
**Parámetros**:
- `status`: Filtrar por estado
- `assignedTo`: Filtrar por usuario asignado
- `clientEmail`: Filtrar por email
- `dateFrom`: Fecha de inicio
- `dateTo`: Fecha de fin
- `limit`: Límite de resultados
- `page`: Página actual
- `autoLoad`: Cargar automáticamente

**Retorna**: Mismo formato que useQuotations

## Servicios de API

### ApiService
**Archivo**: `frontend/src/services/api.ts`
**Clase**: `ApiService`
**Métodos de Cotizaciones**:

#### createQuotation(quotationData)
- **Parámetros**: `QuotationRequest`
- **Retorna**: `Promise<{message: string, quotation: Quotation}>`
- **Propósito**: Crear nueva cotización

#### getQuotations(options)
- **Parámetros**: `{status?, clientEmail?, limit?, page?}`
- **Retorna**: `Promise<QuotationsResponse>`
- **Propósito**: Obtener cotizaciones públicas

#### getAdminQuotations(options)
- **Parámetros**: `{status?, assignedTo?, clientEmail?, dateFrom?, dateTo?, limit?, page?}`
- **Retorna**: `Promise<QuotationsResponse>`
- **Propósito**: Obtener cotizaciones para administración

#### updateQuotation(id, updateData)
- **Parámetros**: `string, Partial<Quotation>`
- **Retorna**: `Promise<{message: string, quotation: Quotation}>`
- **Propósito**: Actualizar cotización existente

#### deleteQuotation(id)
- **Parámetros**: `string`
- **Retorna**: `Promise<{message: string}>`
- **Propósito**: Eliminar cotización

#### updateQuotationStatus(id, status)
- **Parámetros**: `string, string`
- **Retorna**: `Promise<{message: string, quotation: Quotation}>`
- **Propósito**: Cambiar estado de cotización

#### assignQuotation(id, assignedTo)
- **Parámetros**: `string, string`
- **Retorna**: `Promise<{message: string, quotation: Quotation}>`
- **Propósito**: Asignar cotización a usuario

#### getQuotationStats()
- **Parámetros**: Ninguno
- **Retorna**: `Promise<{total: number, pending: number, inProgress: number, completed: number, cancelled: number}>`
- **Propósito**: Obtener estadísticas de cotizaciones

## Interfaces TypeScript

### Quotation
```typescript
interface Quotation {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientCompany?: string;
  requestedServices: Array<{
    serviceId: string;
    serviceName: string;
    quantity?: number;
    notes?: string;
  }>;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  estimatedBudget?: number;
  finalBudget?: number;
  currency: string;
  requestedDate: string;
  estimatedDelivery?: string;
  completedDate?: string;
  clientNotes?: string;
  adminNotes?: string;
  createdBy?: {
    _id: string;
    username: string;
    email: string;
  };
  assignedTo?: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}
```

### QuotationRequest
```typescript
interface QuotationRequest {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientCompany?: string;
  requestedServices: Array<{
    serviceId: string;
    quantity?: number;
    notes?: string;
  }>;
  estimatedBudget?: number;
  currency?: string;
  clientNotes?: string;
  estimatedDelivery?: string;
}
```

### QuotationsResponse
```typescript
interface QuotationsResponse {
  quotations: Quotation[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
```

## Flujo de Datos

### Creación de Cotización
1. Usuario completa `QuotationForm`
2. Datos se validan localmente
3. Se llama a `apiService.createQuotation()`
4. Respuesta se maneja en callback `onSave`
5. Usuario recibe confirmación

### Gestión Administrativa
1. Admin accede a `AdminPanel`
2. Se cargan cotizaciones via `useAdminQuotations`
3. Admin puede filtrar y buscar en `QuotationList`
4. Cambios se reflejan en tiempo real
5. Estadísticas se actualizan automáticamente

## Consideraciones de Rendimiento

### Optimizaciones Implementadas
- Lazy loading de componentes
- Caché de datos en hooks
- Debounce en búsquedas
- Estados de carga optimizados
- Paginación en listas grandes

### Manejo de Estados
- Estados de carga para todas las operaciones
- Manejo de errores con mensajes descriptivos
- Estados vacíos con mensajes informativos
- Confirmaciones para acciones críticas

### Responsive Design
- Diseño adaptable a diferentes pantallas
- Componentes optimizados para móviles
- Navegación intuitiva en todos los dispositivos
