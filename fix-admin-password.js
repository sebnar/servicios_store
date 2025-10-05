// Script para encriptar la contraseña del usuario admin existente
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// URI de MongoDB
const MONGODB_URI = 'mongodb+srv://alyamatosan_db_user:master12.@servicios-store-db.wvmwzb9.mongodb.net/?retryWrites=true&w=majority&appName=servicios-store-db';

async function fixAdminPassword() {
  try {
    console.log('🔍 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Buscar usuario admin
    const User = mongoose.model('User', new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      role: String,
      isActive: Boolean
    }));

    const adminUser = await User.findOne({ email: 'admin@serviciosstore.com' });
    
    if (!adminUser) {
      console.log('❌ Usuario admin no encontrado');
      return;
    }

    console.log('✅ Usuario admin encontrado:', adminUser.email);
    console.log('🔑 Contraseña actual:', adminUser.password);
    console.log('📏 Longitud:', adminUser.password.length);

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('admin123456', salt);
    
    console.log('🔐 Contraseña encriptada:', hashedPassword);
    console.log('📏 Longitud encriptada:', hashedPassword.length);

    // Actualizar usuario
    adminUser.password = hashedPassword;
    await adminUser.save();

    console.log('✅ Usuario admin actualizado con contraseña encriptada');

    // Verificar que funciona
    const isPasswordValid = await bcrypt.compare('admin123456', hashedPassword);
    console.log('🔍 Verificación de contraseña:', isPasswordValid);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
  }
}

fixAdminPassword();
