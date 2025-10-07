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
const PORT = process.env.PORT || 5000;

// Configuración CORS definitiva con logs detallados
app.use((req, res, next) => {
  console.log(`🌐 [CORS] Request: ${req.method} ${req.path}`);
  console.log(`🌐 [CORS] Origin: ${req.headers.origin || 'No origin'}`);
  console.log(`🌐 [CORS] User-Agent: ${req.headers['user-agent'] || 'No user-agent'}`);
  console.log(`🌐 [CORS] Headers: ${JSON.stringify(req.headers)}`);
  
  // Configurar headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 horas
  
  console.log(`🌐 [CORS] Headers set: Access-Control-Allow-Origin: *`);
  
  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    console.log(`🌐 [CORS] Handling OPTIONS request for ${req.path}`);
    res.status(200).end();
    return;
  }
  
  console.log(`🌐 [CORS] Proceeding to next middleware`);
  next();
});

// Middleware de seguridad (después de CORS) - Deshabilitado temporalmente para desarrollo
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" }
// }));

// Manejar preflight requests (manejado por cors middleware)

// Log de requests para debug
app.use((req, res, next) => {
  console.log(`📝 [REQUEST] ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log(`📝 [REQUEST] Origin: ${req.headers.origin || 'No origin'}`);
  console.log(`📝 [REQUEST] User-Agent: ${req.headers['user-agent'] || 'No user-agent'}`);
  
  // Debug específico para API
  if (req.path.includes('/api/')) {
    console.log(`🔍 [API] Processing API request: ${req.method} ${req.path}`);
    console.log(`🔍 [API] Query params: ${JSON.stringify(req.query)}`);
    console.log(`🔍 [API] Body: ${JSON.stringify(req.body)}`);
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
  console.log(`🧪 [CORS-TEST] Request received: ${req.method} ${req.path}`);
  console.log(`🧪 [CORS-TEST] Origin: ${req.headers.origin}`);
  console.log(`🧪 [CORS-TEST] Headers: ${JSON.stringify(req.headers)}`);
  
  const response = { 
    message: 'CORS funcionando correctamente',
    origin: req.headers.origin,
    method: req.method,
    timestamp: new Date().toISOString(),
    headers: req.headers
  };
  
  console.log(`🧪 [CORS-TEST] Sending response: ${JSON.stringify(response)}`);
  res.json(response);
});

// Middleware para log de respuestas
app.use((req, res, next) => {
  const originalSend = res.send;
  const originalJson = res.json;
  
  res.send = function(data) {
    console.log(`📤 [RESPONSE] ${req.method} ${req.path} - Status: ${res.statusCode}`);
    console.log(`📤 [RESPONSE] Headers: ${JSON.stringify(res.getHeaders())}`);
    if (req.path.includes('/api/')) {
      console.log(`📤 [API-RESPONSE] Data: ${typeof data === 'string' ? data.substring(0, 200) : JSON.stringify(data).substring(0, 200)}`);
    }
    return originalSend.call(this, data);
  };
  
  res.json = function(data) {
    console.log(`📤 [RESPONSE] ${req.method} ${req.path} - Status: ${res.statusCode}`);
    console.log(`📤 [RESPONSE] Headers: ${JSON.stringify(res.getHeaders())}`);
    if (req.path.includes('/api/')) {
      console.log(`📤 [API-RESPONSE] Data: ${JSON.stringify(data).substring(0, 200)}`);
    }
    return originalJson.call(this, data);
  };
  
  next();
});

// Manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(`❌ [ERROR] ${req.method} ${req.path}: ${err.stack}`);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Servir archivos estáticos del frontend
app.use(express.static('/app/frontend/dist'));

// Ruta 404 - solo para API
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'Ruta de API no encontrada' });
});

// Para todas las demás rutas, servir el frontend (SPA)
app.get('*', (req, res) => {
  res.sendFile('/app/frontend/dist/index.html');
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
