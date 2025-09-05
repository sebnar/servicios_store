import express from 'express';
import Content from '../models/Content';

const router = express.Router();

// Obtener contenido público por tipo
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    
    // Validar tipo de contenido
    const validTypes = ['hero', 'services', 'mission', 'vision', 'about', 'contact'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: 'Tipo de contenido inválido' });
    }

    const content = await Content.find({ 
      type, 
      isActive: true 
    }).sort({ order: 1, createdAt: -1 });

    res.json({ content });
  } catch (error) {
    console.error('Error obteniendo contenido:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener todo el contenido público
router.get('/', async (req, res) => {
  try {
    const content = await Content.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });

    // Agrupar contenido por tipo
    const groupedContent = content.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {} as Record<string, any[]>);

    res.json({ content: groupedContent });
  } catch (error) {
    console.error('Error obteniendo todo el contenido:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener contenido específico por ID (público)
router.get('/item/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findOne({ _id: id, isActive: true });

    if (!content) {
      return res.status(404).json({ message: 'Contenido no encontrado' });
    }

    res.json({ content });
  } catch (error) {
    console.error('Error obteniendo contenido por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
