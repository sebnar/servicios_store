import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import Quotation from '../models/Quotation';
import Service from '../models/Service';
import { authenticateToken, requireAdmin } from '../middleware/auth';

/**
 * Rutas públicas para cotizaciones
 * Permite a los clientes crear y consultar sus cotizaciones
 */
const router = express.Router();

/**
 * Validaciones para crear cotizaciones
 * Incluye validación de campos requeridos y formatos
 */
const createQuotationValidation = [
  body('clientName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre del cliente debe tener entre 2 y 100 caracteres'),
  body('clientEmail')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  body('clientPhone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('El teléfono no puede exceder 20 caracteres'),
  body('clientCompany')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('El nombre de la empresa no puede exceder 100 caracteres'),
  body('requestedServices')
    .isArray({ min: 1 })
    .withMessage('Debe solicitar al menos un servicio'),
  body('requestedServices.*.serviceId')
    .isMongoId()
    .withMessage('ID de servicio inválido'),
  body('requestedServices.*.quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero positivo'),
  body('requestedServices.*.notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Las notas del servicio no pueden exceder 500 caracteres'),
  body('estimatedBudget')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El presupuesto estimado debe ser un número positivo'),
  body('currency')
    .optional()
    .isIn(['USD', 'EUR', 'COP', 'MXN'])
    .withMessage('Moneda no válida'),
  body('clientNotes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Las notas del cliente no pueden exceder 1000 caracteres'),
  body('estimatedDelivery')
    .optional()
    .isISO8601()
    .withMessage('Fecha de entrega estimada inválida')
];

const updateQuotationValidation = [
  param('id').isMongoId().withMessage('ID de cotización inválido'),
  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed', 'cancelled'])
    .withMessage('Estado inválido'),
  body('estimatedBudget')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El presupuesto estimado debe ser un número positivo'),
  body('finalBudget')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El presupuesto final debe ser un número positivo'),
  body('adminNotes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Las notas del admin no pueden exceder 1000 caracteres'),
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('ID de usuario asignado inválido'),
  body('estimatedDelivery')
    .optional()
    .isISO8601()
    .withMessage('Fecha de entrega estimada inválida')
];

// POST /api/quotations - Crear nueva cotización
router.post('/', createQuotationValidation, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos de cotización inválidos', 
        errors: errors.array() 
      });
    }

    const quotationData = req.body;
    
    // Verificar que los servicios existan
    const serviceIds = quotationData.requestedServices.map((service: any) => service.serviceId);
    const services = await Service.find({ _id: { $in: serviceIds } });
    
    if (services.length !== serviceIds.length) {
      return res.status(400).json({ 
        message: 'Uno o más servicios no existen' 
      });
    }

    // Agregar nombres de servicios
    quotationData.requestedServices = quotationData.requestedServices.map((reqService: any) => {
      const service = services.find((s: any) => s._id.toString() === reqService.serviceId);
      return {
        ...reqService,
        serviceName: service?.name || 'Servicio no encontrado'
      };
    });

    // Calcular presupuesto estimado si no se proporciona
    if (!quotationData.estimatedBudget) {
      quotationData.estimatedBudget = quotationData.requestedServices.reduce((total: number, reqService: any) => {
        const service = services.find((s: any) => s._id.toString() === reqService.serviceId);
        return total + (service?.price || 0) * (reqService.quantity || 1);
      }, 0);
    }

    const quotation = new Quotation(quotationData);
    await quotation.save();

    // Poblar referencias para la respuesta
    await quotation.populate('requestedServices.serviceId', 'name price description');

    return res.status(201).json({ 
      message: 'Cotización creada exitosamente', 
      quotation 
    });
  } catch (error) {
    console.error('Error creando cotización:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET /api/quotations - Obtener cotizaciones
router.get('/', [
  query('status').optional().isIn(['pending', 'in_progress', 'completed', 'cancelled']),
  query('clientEmail').optional().isEmail(),
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
      status, 
      clientEmail, 
      limit = 20, 
      page = 1 
    } = req.query;

    // Construir filtros
    const filters: any = {};
    
    if (status) {
      filters.status = status;
    }
    
    if (clientEmail) {
      filters.clientEmail = clientEmail;
    }

    // Paginación
    const skip = (Number(page) - 1) * Number(limit);
    const quotations = await Quotation.find(filters)
      .populate('requestedServices.serviceId', 'name price description')
      .populate('createdBy', 'username email')
      .populate('assignedTo', 'username email')
      .sort({ requestedDate: -1 })
      .skip(skip)
      .limit(Number(limit));

    // Contar total para paginación
    const total = await Quotation.countDocuments(filters);

    return res.json({
      quotations,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  } catch (error) {
    console.error('Error obteniendo cotizaciones:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET /api/quotations/:id - Obtener cotización por ID
router.get('/:id', [
  param('id').isMongoId().withMessage('ID de cotización inválido')
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'ID de cotización inválido', 
        errors: errors.array() 
      });
    }

    const quotation = await Quotation.findById(req.params.id)
      .populate('requestedServices.serviceId', 'name price description category')
      .populate('createdBy', 'username email')
      .populate('assignedTo', 'username email');

    if (!quotation) {
      return res.status(404).json({ message: 'Cotización no encontrada' });
    }

    return res.json({ quotation });
  } catch (error) {
    console.error('Error obteniendo cotización:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PUT /api/quotations/:id - Actualizar cotización
router.put('/:id', updateQuotationValidation, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos de cotización inválidos', 
        errors: errors.array() 
      });
    }

    const quotationId = req.params.id;
    const updateData = req.body;

    // Verificar que la cotización existe
    const existingQuotation = await Quotation.findById(quotationId);
    if (!existingQuotation) {
      return res.status(404).json({ message: 'Cotización no encontrada' });
    }

    const quotation = await Quotation.findByIdAndUpdate(
      quotationId, 
      updateData, 
      { new: true, runValidators: true }
    )
    .populate('requestedServices.serviceId', 'name price description')
    .populate('createdBy', 'username email')
    .populate('assignedTo', 'username email');

    return res.json({ 
      message: 'Cotización actualizada exitosamente', 
      quotation 
    });
  } catch (error) {
    console.error('Error actualizando cotización:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// DELETE /api/quotations/:id - Eliminar cotización
router.delete('/:id', [
  param('id').isMongoId().withMessage('ID de cotización inválido')
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'ID de cotización inválido', 
        errors: errors.array() 
      });
    }

    const quotation = await Quotation.findByIdAndDelete(req.params.id);

    if (!quotation) {
      return res.status(404).json({ message: 'Cotización no encontrada' });
    }

    return res.json({ message: 'Cotización eliminada exitosamente' });
  } catch (error) {
    console.error('Error eliminando cotización:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
