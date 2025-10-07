import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './utils/database';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import contentRoutes from './routes/content';
import servicesRoutes from './routes/services';
import adminServicesRoutes from './routes/admin-services';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = 5000;

// Configuración CORS básica y funcional
app.use((req, res, next) => {
  // Permitir cualquier origen
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Permitir métodos HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  // Permitir headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  
  // No permitir credenciales
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  
  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Middleware de seguridad (después de CORS) - Deshabilitado temporalmente para desarrollo
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" }
// }));

// Manejar preflight requests (manejado por cors middleware)

// Log de requests para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin || 'No origin'}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  
  // Debug específico para CORS
  if (req.path.includes('/api/')) {
    console.log(`🔍 CORS Debug - Method: ${req.method}, Path: ${req.path}`);
    console.log(`🔍 Origin: ${req.headers.origin}`);
    console.log(`🔍 User-Agent: ${req.headers['user-agent']}`);
  }
  
  next();
});

// Middleware para parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/admin/services', adminServicesRoutes);

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta de prueba CORS
app.get('/api/cors-test', (req, res) => {
  res.json({ 
    message: 'CORS funcionando correctamente',
    origin: req.headers.origin,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
      console.log(`📱 Frontend URL: http://localhost:3000`);
      console.log(`🌍 Modo: Desarrollo Universitario`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
