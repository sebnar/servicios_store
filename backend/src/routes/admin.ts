import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import Content from '../models/Content';
import User from '../models/User';

const router = express.Router();

// Aplicar autenticación y autorización de admin a todas las rutas
router.use(authenticateToken);
router.use(requireAdmin);

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Actualizar estado de usuario
router.patch('/users/:id/status', [
  body('isActive').isBoolean().withMessage('isActive debe ser un booleano')
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.json({ message: 'Estado de usuario actualizado', user });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener todo el contenido
router.get('/content', async (req: express.Request, res: express.Response) => {
  try {
    const content = await Content.find({}).sort({ order: 1, createdAt: -1 });
    return res.json({ content });
  } catch (error) {
    console.error('Error obteniendo contenido:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Crear nuevo contenido
router.post('/content', [
  body('type').isIn(['hero', 'services', 'mission', 'vision', 'about', 'contact'])
    .withMessage('Tipo de contenido inválido'),
  body('title').notEmpty().withMessage('El título es requerido'),
  body('description').notEmpty().withMessage('La descripción es requerida'),
  body('order').optional().isInt({ min: 0 }).withMessage('El orden debe ser un número entero positivo')
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const content = new Content(req.body);
    await content.save();

    return res.status(201).json({ message: 'Contenido creado exitosamente', content });
  } catch (error) {
    console.error('Error creando contenido:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Actualizar contenido
router.put('/content/:id', [
  body('type').optional().isIn(['hero', 'services', 'mission', 'vision', 'about', 'contact'])
    .withMessage('Tipo de contenido inválido'),
  body('title').optional().notEmpty().withMessage('El título no puede estar vacío'),
  body('description').optional().notEmpty().withMessage('La descripción no puede estar vacía'),
  body('order').optional().isInt({ min: 0 }).withMessage('El orden debe ser un número entero positivo')
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const content = await Content.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!content) {
      return res.status(404).json({ message: 'Contenido no encontrado' });
    }

    return res.json({ message: 'Contenido actualizado exitosamente', content });
  } catch (error) {
    console.error('Error actualizando contenido:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Eliminar contenido
router.delete('/content/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const content = await Content.findByIdAndDelete(id);

    if (!content) {
      return res.status(404).json({ message: 'Contenido no encontrado' });
    }

    return res.json({ message: 'Contenido eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando contenido:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener estadísticas del dashboard
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalContent = await Content.countDocuments();
    const activeContent = await Content.countDocuments({ isActive: true });

    return res.json({
      stats: {
        totalUsers,
        activeUsers,
        totalContent,
        activeContent
      }
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
