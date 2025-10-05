// Script para crear usuario admin directamente
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// URI de MongoDB (reemplaza con tu URI real)
const MONGODB_URI = 'mongodb+srv://alyamatosan_db_user:<password>@servicios-store-db.wvmwzb9.mongodb.net/?retryWrites=true&w=majority&appName=servicios-store-db';

// Schema de Usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Encriptar contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
  try {
    console.log('🔍 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Verificar si ya existe
    const existingAdmin = await User.findOne({ email: 'admin@serviciosstore.com' });
    if (existingAdmin) {
      console.log('⚠️ Usuario admin ya existe');
      console.log('📊 Usuario:', existingAdmin.email, existingAdmin.role);
      return;
    }

    // Crear usuario admin
    const adminUser = new User({
      username: 'admin',
      email: 'admin@serviciosstore.com',
      password: 'admin123456',
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    console.log('✅ Usuario admin creado exitosamente');
    console.log('📧 Email: admin@serviciosstore.com');
    console.log('🔑 Contraseña: admin123456');
    console.log('👤 Rol: admin');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
  }
}

createAdminUser();
