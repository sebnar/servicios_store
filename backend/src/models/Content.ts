import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  type: 'hero' | 'services' | 'mission' | 'vision' | 'about' | 'contact';
  title: string;
  subtitle?: string;
  description: string;
  images?: string[];
  metadata?: {
    [key: string]: any;
  };
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>({
  type: {
    type: String,
    required: [true, 'El tipo de contenido es requerido'],
    enum: ['hero', 'services', 'mission', 'vision', 'about', 'contact']
  },
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  subtitle: {
    type: String,
    trim: true,
    maxlength: [300, 'El subtítulo no puede exceder 300 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true
  },
  images: [{
    type: String,
    trim: true
  }],
  metadata: {
    type: Schema.Types.Mixed,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Índices para optimizar consultas
ContentSchema.index({ type: 1, isActive: 1 });
ContentSchema.index({ order: 1 });

export default mongoose.model<IContent>('Content', ContentSchema);
