import { Request, Response, NextFunction } from 'express';

/**
 * Middleware CORS transversal que se aplica a TODAS las rutas
 * Garantiza que CORS funcione en todas las rutas actuales y futuras
 */
export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`🌐 [CORS-GLOBAL] ${req.method} ${req.path}`);
  console.log(`🌐 [CORS-GLOBAL] Origin: ${req.headers.origin || 'No origin'}`);
  
  // Headers CORS universales
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'false');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  console.log(`🌐 [CORS-GLOBAL] Headers aplicados: Access-Control-Allow-Origin: *`);
  
  // Manejar preflight requests ANTES que cualquier otra cosa
  if (req.method === 'OPTIONS') {
    console.log(`🌐 [CORS-GLOBAL] Preflight OPTIONS para ${req.path} - Respondiendo 200`);
    res.status(200).end();
    return;
  }
  
  console.log(`🌐 [CORS-GLOBAL] Continuando a siguiente middleware`);
  next();
};

/**
 * Middleware para interceptar TODAS las respuestas y asegurar headers CORS
 * Se aplica a res.send, res.json, res.sendFile, etc.
 */
export const corsResponseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Interceptar todas las respuestas para agregar headers CORS
  const originalSend = res.send;
  const originalJson = res.json;
  const originalSendFile = res.sendFile;
  
  // Función para agregar headers CORS a cualquier respuesta
  const addCorsHeaders = () => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'false');
  };
  
  res.send = function(data) {
    addCorsHeaders();
    console.log(`📤 [CORS-RESPONSE] ${req.method} ${req.path} - Status: ${res.statusCode}`);
    return originalSend.call(this, data);
  };
  
  res.json = function(data) {
    addCorsHeaders();
    console.log(`📤 [CORS-RESPONSE] ${req.method} ${req.path} - Status: ${res.statusCode}`);
    return originalJson.call(this, data);
  };
  
  res.sendFile = function(path, options, callback) {
    addCorsHeaders();
    console.log(`📤 [CORS-FILE] ${req.method} ${req.path} - Sending file: ${path}`);
    return originalSendFile.call(this, path, options, callback);
  };
  
  next();
};
