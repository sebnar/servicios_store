import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import Service from '../models/Service';

const router = express.Router();

// Validaciones
const createServiceValidation = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('La descripción debe tener entre 10 y 2000 caracteres'),
  body('price')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),
  body('category')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('La categoría debe tener entre 2 y 50 caracteres'),
  body('currency')
    .optional()
    .isIn(['USD', 'EUR', 'COP', 'MXN'])
    .withMessage('Moneda no válida'),
  body('features')
    .optional()
    .isArray()
    .withMessage('Las características deben ser un array'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Las etiquetas deben ser un array')
];

const updateServiceValidation = [
  param('id').isMongoId().withMessage('ID de servicio inválido'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('La descripción debe tener entre 10 y 2000 caracteres'),
  body('price')
    .optional()
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),
  body('category')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('La categoría debe tener entre 2 y 50 caracteres')
];

// GET /api/services - Obtener todos los servicios (público)
router.get('/', [
  query('category').optional().isString().trim(),
  query('featured').optional().isBoolean(),
  query('search').optional().isString().trim(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('page').optional().isInt({ min: 1 })
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Parámetros de consulta inválidos', 
        errors: errors.array() 
      });
    }

    const { 
      category, 
      featured, 
      search, 
      limit = 20, 
      page = 1 
    } = req.query;

    // Construir filtros
    const filters: any = { isActive: true };
    
    if (category) {
      filters.category = new RegExp(category as string, 'i');
    }
    
    if (featured === 'true') {
      filters.isFeatured = true;
    }

    // Construir consulta de búsqueda
    let query = Service.find(filters);

    if (search) {
      query = Service.find({
        ...filters,
        $text: { $search: search as string }
      });
    }

    // Paginación
    const skip = (Number(page) - 1) * Number(limit);
    const services = await query
      .sort({ order: 1, isFeatured: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-metadata'); // Excluir metadata en respuesta pública

    // Contar total para paginación
    const total = await Service.countDocuments(filters);

    return res.json({
      services,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  } catch (error) {
    console.error('Error obteniendo servicios:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET /api/services/categories - Obtener categorías disponibles
router.get('/categories', async (req: express.Request, res: express.Response) => {
  try {
    const categories = await Service.distinct('category', { isActive: true });
    return res.json({ categories });
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET /api/services/:id - Obtener servicio por ID (público)
router.get('/:id', [
  param('id').isMongoId().withMessage('ID de servicio inválido')
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'ID de servicio inválido', 
        errors: errors.array() 
      });
    }

    const service = await Service.findOne({ 
      _id: req.params.id, 
      isActive: true 
    }).select('-metadata');

    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    return res.json({ service });
  } catch (error) {
    console.error('Error obteniendo servicio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET /api/services/category/:category - Obtener servicios por categoría
router.get('/category/:category', [
  param('category').trim().isLength({ min: 2 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('page').optional().isInt({ min: 1 })
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Parámetros inválidos', 
        errors: errors.array() 
      });
    }

    const { category } = req.params;
    const { limit = 20, page = 1 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    const services = await Service.find({
      category: new RegExp(category, 'i'),
      isActive: true
    })
    .sort({ order: 1, isFeatured: -1, createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .select('-metadata');

    const total = await Service.countDocuments({
      category: new RegExp(category, 'i'),
      isActive: true
    });

    return res.json({
      services,
      category,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  } catch (error) {
    console.error('Error obteniendo servicios por categoría:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
