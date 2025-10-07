import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import Quotation from '../models/Quotation';
import User from '../models/User';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Aplicar autenticación y autorización de admin a todas las rutas
router.use(authenticateToken);
router.use(requireAdmin);

// Validaciones
const updateQuotationStatusValidation = [
  param('id').isMongoId().withMessage('ID de cotización inválido'),
  body('status')
    .isIn(['pending', 'in_progress', 'completed', 'cancelled'])
    .withMessage('Estado inválido'),
  body('adminNotes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Las notas del admin no pueden exceder 1000 caracteres'),
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('ID de usuario asignado inválido'),
  body('finalBudget')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El presupuesto final debe ser un número positivo'),
  body('estimatedDelivery')
    .optional()
    .isISO8601()
    .withMessage('Fecha de entrega estimada inválida')
];

// GET /api/admin/quotations - Obtener todas las cotizaciones (admin)
router.get('/', [
  query('status').optional().isIn(['pending', 'in_progress', 'completed', 'cancelled']),
  query('assignedTo').optional().isMongoId(),
  query('clientEmail').optional().isEmail(),
  query('dateFrom').optional().isISO8601(),
  query('dateTo').optional().isISO8601(),
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
      assignedTo,
      clientEmail,
      dateFrom,
      dateTo,
      limit = 20, 
      page = 1 
    } = req.query;

    // Construir filtros
    const filters: any = {};
    
    if (status) {
      filters.status = status;
    }
    
    if (assignedTo) {
      filters.assignedTo = assignedTo;
    }
    
    if (clientEmail) {
      filters.clientEmail = clientEmail;
    }
    
    if (dateFrom || dateTo) {
      filters.requestedDate = {};
      if (dateFrom) {
        filters.requestedDate.$gte = new Date(dateFrom as string);
      }
      if (dateTo) {
        filters.requestedDate.$lte = new Date(dateTo as string);
      }
    }

    // Paginación
    const skip = (Number(page) - 1) * Number(limit);
    const quotations = await Quotation.find(filters)
      .populate('requestedServices.serviceId', 'name price description category')
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
    console.error('Error obteniendo cotizaciones (admin):', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET /api/admin/quotations/:id - Obtener cotización por ID (admin)
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
    console.error('Error obteniendo cotización (admin):', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PUT /api/admin/quotations/:id/status - Actualizar estado de cotización
router.put('/:id/status', updateQuotationStatusValidation, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos inválidos', 
        errors: errors.array() 
      });
    }

    const { id } = req.params;
    const { status, adminNotes, assignedTo, finalBudget, estimatedDelivery } = req.body;

    // Verificar que el usuario asignado existe (si se proporciona)
    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) {
        return res.status(400).json({ message: 'Usuario asignado no encontrado' });
      }
    }

    const updateData: any = { status };
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (finalBudget !== undefined) updateData.finalBudget = finalBudget;
    if (estimatedDelivery !== undefined) updateData.estimatedDelivery = estimatedDelivery;

    const quotation = await Quotation.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
    .populate('requestedServices.serviceId', 'name price description')
    .populate('createdBy', 'username email')
    .populate('assignedTo', 'username email');

    if (!quotation) {
      return res.status(404).json({ message: 'Cotización no encontrada' });
    }

    return res.json({ 
      message: `Cotización ${status === 'completed' ? 'completada' : 'actualizada'} exitosamente`, 
      quotation 
    });
  } catch (error) {
    console.error('Error actualizando estado de cotización:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PUT /api/admin/quotations/:id/assign - Asignar cotización a usuario
router.put('/:id/assign', [
  param('id').isMongoId().withMessage('ID de cotización inválido'),
  body('assignedTo').isMongoId().withMessage('ID de usuario asignado inválido')
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos inválidos', 
        errors: errors.array() 
      });
    }

    const { id } = req.params;
    const { assignedTo } = req.body;

    // Verificar que el usuario existe
    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const quotation = await Quotation.findByIdAndUpdate(
      id,
      { assignedTo },
      { new: true, runValidators: true }
    )
    .populate('requestedServices.serviceId', 'name price description')
    .populate('createdBy', 'username email')
    .populate('assignedTo', 'username email');

    if (!quotation) {
      return res.status(404).json({ message: 'Cotización no encontrada' });
    }

    return res.json({ 
      message: 'Cotización asignada exitosamente', 
      quotation 
    });
  } catch (error) {
    console.error('Error asignando cotización:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// DELETE /api/admin/quotations/:id - Eliminar cotización (admin)
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

// GET /api/admin/quotations/stats/overview - Estadísticas de cotizaciones
router.get('/stats/overview', async (req: express.Request, res: express.Response) => {
  try {
    const totalQuotations = await Quotation.countDocuments();
    const pendingQuotations = await Quotation.countDocuments({ status: 'pending' });
    const inProgressQuotations = await Quotation.countDocuments({ status: 'in_progress' });
    const completedQuotations = await Quotation.countDocuments({ status: 'completed' });
    const cancelledQuotations = await Quotation.countDocuments({ status: 'cancelled' });
    
    // Cotizaciones por mes (últimos 6 meses)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const quotationsByMonth = await Quotation.aggregate([
      { $match: { requestedDate: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$requestedDate' },
            month: { $month: '$requestedDate' }
          },
          count: { $sum: 1 },
          totalBudget: { $sum: '$estimatedBudget' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Cotizaciones por estado
    const quotationsByStatus = await Quotation.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Presupuesto promedio por estado
    const avgBudgetByStatus = await Quotation.aggregate([
      { $group: { _id: '$status', avgBudget: { $avg: '$estimatedBudget' } } },
      { $sort: { avgBudget: -1 } }
    ]);

    return res.json({
      stats: {
        total: totalQuotations,
        pending: pendingQuotations,
        inProgress: inProgressQuotations,
        completed: completedQuotations,
        cancelled: cancelledQuotations
      },
      quotationsByMonth,
      quotationsByStatus,
      avgBudgetByStatus
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas de cotizaciones:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
