import mongoose, { Document, Schema } from 'mongoose';

/**
 * Modelo de datos para cotizaciones
 * Define la estructura y validaciones para las cotizaciones en MongoDB
 */
export interface IQuotation extends Document {
  // Información del cliente
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientCompany?: string;
  
  // Servicios solicitados
  requestedServices: {
    serviceId: mongoose.Types.ObjectId;
    serviceName: string;
    quantity?: number;
    notes?: string;
  }[];
  
  // Información de la cotización
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  estimatedBudget?: number;
  finalBudget?: number;
  currency: string;
  
  // Fechas
  requestedDate: Date;
  estimatedDelivery?: Date;
  completedDate?: Date;
  
  // Notas y observaciones
  clientNotes?: string;
  adminNotes?: string;
  
  // Metadatos
  createdAt: Date;
  updatedAt: Date;
  createdBy?: mongoose.Types.ObjectId; // Usuario que creó la cotización
  assignedTo?: mongoose.Types.ObjectId; // Usuario asignado
}

/**
 * Esquema de MongoDB para cotizaciones
 * Incluye validaciones, índices y middleware automático
 */
const QuotationSchema = new Schema<IQuotation>({
  // Información del cliente
  clientName: {
    type: String,
    required: [true, 'El nombre del cliente es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  clientEmail: {
    type: String,
    required: [true, 'El email del cliente es requerido'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  clientPhone: {
    type: String,
    trim: true,
    maxlength: [20, 'El teléfono no puede exceder 20 caracteres']
  },
  clientCompany: {
    type: String,
    trim: true,
    maxlength: [100, 'El nombre de la empresa no puede exceder 100 caracteres']
  },
  
  // Servicios solicitados
  requestedServices: [{
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    },
    serviceName: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      min: 1,
      default: 1
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Las notas del servicio no pueden exceder 500 caracteres']
    }
  }],
  
  // Información de la cotización
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  estimatedBudget: {
    type: Number,
    min: 0
  },
  finalBudget: {
    type: Number,
    min: 0
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'COP', 'MXN'],
    default: 'USD'
  },
  
  // Fechas
  requestedDate: {
    type: Date,
    default: Date.now
  },
  estimatedDelivery: {
    type: Date
  },
  completedDate: {
    type: Date
  },
  
  // Notas y observaciones
  clientNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Las notas del cliente no pueden exceder 1000 caracteres']
  },
  adminNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Las notas del admin no pueden exceder 1000 caracteres']
  },
  
  // Metadatos
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

/**
 * Índices para optimizar consultas frecuentes
 * Mejoran el rendimiento en filtros y búsquedas
 */
QuotationSchema.index({ clientEmail: 1 });
QuotationSchema.index({ status: 1 });
QuotationSchema.index({ requestedDate: -1 });
QuotationSchema.index({ createdBy: 1 });
QuotationSchema.index({ assignedTo: 1 });

/**
 * Middleware pre-save para actualizar fechas automáticamente
 * Establece completedDate cuando el status cambia a 'completed'
 */
QuotationSchema.pre('save', function(next) {
  if (this.status === 'completed' && !this.completedDate) {
    this.completedDate = new Date();
  }
  next();
});

export default mongoose.model<IQuotation>('Quotation', QuotationSchema);
