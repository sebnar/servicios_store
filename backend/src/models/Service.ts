import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  currency: string;
  category: string;
  subcategory?: string;
  images: string[];
  features: string[];
  duration?: string; // Duración del servicio (ej: "2 horas", "1 día")
  availability: {
    isAvailable: boolean;
    schedule?: string; // Horarios disponibles
    maxBookings?: number; // Máximo de reservas por día
  };
  metadata?: {
    [key: string]: any;
  };
  isActive: boolean;
  isFeatured: boolean; // Para destacar servicios
  order: number;
  tags: string[]; // Para búsquedas y filtros
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>({
  name: {
    type: String,
    required: [true, 'El nombre del servicio es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción del servicio es requerida'],
    trim: true,
    maxlength: [2000, 'La descripción no puede exceder 2000 caracteres']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [300, 'La descripción corta no puede exceder 300 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'El precio del servicio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'COP', 'MXN']
  },
  category: {
    type: String,
    required: [true, 'La categoría del servicio es requerida'],
    trim: true,
    maxlength: [50, 'La categoría no puede exceder 50 caracteres']
  },
  subcategory: {
    type: String,
    trim: true,
    maxlength: [50, 'La subcategoría no puede exceder 50 caracteres']
  },
  images: [{
    type: String,
    trim: true
  }],
  features: [{
    type: String,
    trim: true,
    maxlength: [200, 'Cada característica no puede exceder 200 caracteres']
  }],
  duration: {
    type: String,
    trim: true,
    maxlength: [50, 'La duración no puede exceder 50 caracteres']
  },
  availability: {
    isAvailable: {
      type: Boolean,
      default: true
    },
    schedule: {
      type: String,
      trim: true
    },
    maxBookings: {
      type: Number,
      min: [1, 'El máximo de reservas debe ser al menos 1']
    }
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }]
}, {
  timestamps: true
});

// Índices para optimizar consultas
ServiceSchema.index({ category: 1, isActive: 1 });
ServiceSchema.index({ isFeatured: 1, isActive: 1 });
ServiceSchema.index({ tags: 1 });
ServiceSchema.index({ price: 1 });
ServiceSchema.index({ name: 'text', description: 'text', tags: 'text' }); // Búsqueda de texto

// Middleware para generar descripción corta automáticamente si no se proporciona
ServiceSchema.pre('save', function(next) {
  if (!this.shortDescription && this.description) {
    this.shortDescription = this.description.substring(0, 200) + '...';
  }
  next();
});

export default mongoose.model<IService>('Service', ServiceSchema);
