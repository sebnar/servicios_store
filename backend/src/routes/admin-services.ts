import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import Service from '../models/Service';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { applyCorsToRouter } from '../middleware/routeCors';

const router = express.Router();

// Aplicar CORS automáticamente a todas las rutas de este router
applyCorsToRouter(router);

// Aplicar autenticación y autorización de admin a todas las rutas
router.use(authenticateToken);
router.use(requireAdmin);

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
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('La descripción corta no puede exceder 300 caracteres'),
  body('price')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),
  body('category')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('La categoría debe tener entre 2 y 50 caracteres'),
  body('subcategory')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('La subcategoría no puede exceder 50 caracteres'),
  body('currency')
    .optional()
    .isIn(['USD', 'EUR', 'COP', 'MXN'])
    .withMessage('Moneda no válida'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Las imágenes deben ser un array'),
  body('features')
    .optional()
    .isArray()
    .withMessage('Las características deben ser un array'),
  body('duration')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('La duración no puede exceder 50 caracteres'),
  body('availability.isAvailable')
    .optional()
    .isBoolean()
    .withMessage('La disponibilidad debe ser un booleano'),
  body('availability.schedule')
    .optional()
    .isString()
    .trim()
    .withMessage('El horario debe ser texto'),
  body('availability.maxBookings')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El máximo de reservas debe ser un número entero positivo'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('El estado activo debe ser un booleano'),
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('El estado destacado debe ser un booleano'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El orden debe ser un número entero no negativo'),
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
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('La descripción corta no puede exceder 300 caracteres'),
  body('price')
    .optional()
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo'),
  body('category')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('La categoría debe tener entre 2 y 50 caracteres'),
  body('subcategory')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('La subcategoría no puede exceder 50 caracteres'),
  body('currency')
    .optional()
    .isIn(['USD', 'EUR', 'COP', 'MXN'])
    .withMessage('Moneda no válida'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Las imágenes deben ser un array'),
  body('features')
    .optional()
    .isArray()
    .withMessage('Las características deben ser un array'),
  body('duration')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('La duración no puede exceder 50 caracteres'),
  body('availability.isAvailable')
    .optional()
    .isBoolean()
    .withMessage('La disponibilidad debe ser un booleano'),
  body('availability.schedule')
    .optional()
    .isString()
    .trim()
    .withMessage('El horario debe ser texto'),
  body('availability.maxBookings')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El máximo de reservas debe ser un número entero positivo'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('El estado activo debe ser un booleano'),
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('El estado destacado debe ser un booleano'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El orden debe ser un número entero no negativo'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Las etiquetas deben ser un array')
];

// GET /api/admin/services - Obtener todos los servicios (admin)
router.get('/', [
  query('category').optional().isString().trim(),
  query('isActive').optional().isBoolean(),
  query('isFeatured').optional().isBoolean(),
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
      isActive, 
      isFeatured, 
      search, 
      limit = 20, 
      page = 1 
    } = req.query;

    // Construir filtros
    const filters: any = {};
    
    if (category) {
      filters.category = new RegExp(category as string, 'i');
    }
    
    if (isActive !== undefined) {
      filters.isActive = isActive === 'true';
    }
    
    if (isFeatured !== undefined) {
      filters.isFeatured = isFeatured === 'true';
    }

    // Construir consulta
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
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

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
    console.error('Error obteniendo servicios (admin):', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET /api/admin/services/:id - Obtener servicio por ID (admin)
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

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    return res.json({ service });
  } catch (error) {
    console.error('Error obteniendo servicio (admin):', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// POST /api/admin/services - Crear nuevo servicio
router.post('/', createServiceValidation, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos de servicio inválidos', 
        errors: errors.array() 
      });
    }

    const serviceData = req.body;
    
    // Verificar que no exista un servicio con el mismo nombre
    const existingService = await Service.findOne({ 
      name: serviceData.name,
      category: serviceData.category 
    });

    if (existingService) {
      return res.status(400).json({ 
        message: 'Ya existe un servicio con este nombre en la misma categoría' 
      });
    }

    const service = new Service(serviceData);
    await service.save();

    return res.status(201).json({ 
      message: 'Servicio creado exitosamente', 
      service 
    });
  } catch (error) {
    console.error('Error creando servicio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PUT /api/admin/services/:id - Actualizar servicio
router.put('/:id', updateServiceValidation, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos de servicio inválidos', 
        errors: errors.array() 
      });
    }

    const serviceId = req.params.id;
    const updateData = req.body;

    // Verificar que el servicio existe
    const existingService = await Service.findById(serviceId);
    if (!existingService) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    // Si se está cambiando el nombre o categoría, verificar que no exista otro servicio igual
    if (updateData.name || updateData.category) {
      const name = updateData.name || existingService.name;
      const category = updateData.category || existingService.category;
      
      const duplicateService = await Service.findOne({ 
        name, 
        category, 
        _id: { $ne: serviceId } 
      });

      if (duplicateService) {
        return res.status(400).json({ 
          message: 'Ya existe otro servicio con este nombre en la misma categoría' 
        });
      }
    }

    const service = await Service.findByIdAndUpdate(
      serviceId, 
      updateData, 
      { new: true, runValidators: true }
    );

    return res.json({ 
      message: 'Servicio actualizado exitosamente', 
      service 
    });
  } catch (error) {
    console.error('Error actualizando servicio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PATCH /api/admin/services/:id/status - Cambiar estado del servicio
router.patch('/:id/status', [
  param('id').isMongoId().withMessage('ID de servicio inválido'),
  body('isActive').isBoolean().withMessage('El estado activo debe ser un booleano')
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos inválidos', 
        errors: errors.array() 
      });
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    return res.json({ 
      message: `Servicio ${service.isActive ? 'activado' : 'desactivado'} exitosamente`, 
      service 
    });
  } catch (error) {
    console.error('Error cambiando estado del servicio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PATCH /api/admin/services/:id/featured - Cambiar estado destacado
router.patch('/:id/featured', [
  param('id').isMongoId().withMessage('ID de servicio inválido'),
  body('isFeatured').isBoolean().withMessage('El estado destacado debe ser un booleano')
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos inválidos', 
        errors: errors.array() 
      });
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isFeatured: req.body.isFeatured },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    return res.json({ 
      message: `Servicio ${service.isFeatured ? 'destacado' : 'removido de destacados'} exitosamente`, 
      service 
    });
  } catch (error) {
    console.error('Error cambiando estado destacado:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// DELETE /api/admin/services/:id - Eliminar servicio
router.delete('/:id', [
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

    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    return res.json({ message: 'Servicio eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando servicio:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET /api/admin/services/stats - Estadísticas de servicios
router.get('/stats/overview', async (req: express.Request, res: express.Response) => {
  try {
    const totalServices = await Service.countDocuments();
    const activeServices = await Service.countDocuments({ isActive: true });
    const featuredServices = await Service.countDocuments({ isFeatured: true });
    const categories = await Service.distinct('category');
    
    // Servicios por categoría
    const servicesByCategory = await Service.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Precio promedio por categoría
    const avgPriceByCategory = await Service.aggregate([
      { $group: { _id: '$category', avgPrice: { $avg: '$price' } } },
      { $sort: { avgPrice: -1 } }
    ]);

    return res.json({
      stats: {
        total: totalServices,
        active: activeServices,
        inactive: totalServices - activeServices,
        featured: featuredServices,
        categories: categories.length
      },
      servicesByCategory,
      avgPriceByCategory
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
