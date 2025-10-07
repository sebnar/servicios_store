import { Request, Response, NextFunction } from 'express';

/**
 * Middleware CORS que se aplica automáticamente a cualquier router
 * Se puede usar en cualquier archivo de rutas para garantizar CORS
 */
export const applyCorsToRouter = (router: any) => {
  // Aplicar CORS a todas las rutas del router
  router.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`🔧 [ROUTER-CORS] ${req.method} ${req.path}`);
    
    // Headers CORS universales
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'false');
    res.setHeader('Access-Control-Max-Age', '86400');
    
    // Manejar preflight requests
    if (req.method === 'OPTIONS') {
      console.log(`🔧 [ROUTER-CORS] Preflight OPTIONS para ${req.path}`);
      res.status(200).end();
      return;
    }
    
    next();
  });
  
  return router;
};

/**
 * Función helper para crear routers con CORS automático
 */
export const createCorsRouter = () => {
  const express = require('express');
  const router = express.Router();
  return applyCorsToRouter(router);
};
