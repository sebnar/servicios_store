import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User, { IUser } from '../models/User';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Generar JWT
const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'servicios_store_secret_key_2024_secure',
    { expiresIn: '24h' }
  );
};

// Registro de usuario
router.post('/register', [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'El usuario o email ya existe'
      });
    }

    // Crear nuevo usuario
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    // Generar token
    const token = generateToken((user._id as any).toString());

    return res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Login de usuario
router.post('/login', [
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
], async (req: express.Request, res: express.Response) => {
  try {
    console.log('🔍 [LOGIN] Iniciando proceso de login...');
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ [LOGIN] Errores de validación:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log('📧 [LOGIN] Email recibido:', email);
    console.log('🔑 [LOGIN] Contraseña recibida:', password ? '[OCULTA]' : '[VACÍA]');

    // Buscar usuario
    console.log('🔍 [LOGIN] Buscando usuario en la base de datos...');
    const user = await User.findOne({ email, isActive: true });
    
    if (!user) {
      console.log('❌ [LOGIN] Usuario no encontrado o inactivo');
      console.log('🔍 [LOGIN] Verificando si existe usuario con email:', email);
      const userExists = await User.findOne({ email });
      if (userExists) {
        console.log('⚠️ [LOGIN] Usuario existe pero está inactivo:', userExists.isActive);
      } else {
        console.log('❌ [LOGIN] Usuario no existe en la base de datos');
      }
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    console.log('✅ [LOGIN] Usuario encontrado:', {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    });

    // Verificar contraseña
    console.log('🔍 [LOGIN] Verificando contraseña...');
    console.log('🔑 [LOGIN] Contraseña ingresada:', password);
    console.log('🔑 [LOGIN] Contraseña almacenada en BD:', user.password);
    console.log('🔑 [LOGIN] Longitud contraseña BD:', user.password.length);
    const isPasswordValid = await user.comparePassword(password);
    console.log('🔑 [LOGIN] Contraseña válida:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ [LOGIN] Contraseña incorrecta');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token
    console.log('🎫 [LOGIN] Generando token...');
    const token = generateToken((user._id as any).toString());
    console.log('✅ [LOGIN] Token generado exitosamente');

    console.log('🎉 [LOGIN] Login exitoso para usuario:', user.email);
    return res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ [LOGIN] Error en login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener perfil del usuario autenticado
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.json({ user });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Verificar token
router.get('/verify', authenticateToken, (req: express.Request, res: express.Response) => {
  return res.json({ valid: true, userId: req.userId });
});

export default router;
