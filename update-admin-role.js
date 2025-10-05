// Script para actualizar el rol del usuario admin
const mongoose = require('mongoose');

// URI de MongoDB
const MONGODB_URI = 'mongodb+srv://alyamatosan_db_user:master12.@servicios-store-db.wvmwzb9.mongodb.net/?retryWrites=true&w=majority&appName=servicios-store-db';

async function updateAdminRole() {
  try {
    console.log('🔍 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Schema de Usuario
    const userSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      role: { type: String, default: 'user' },
      isActive: { type: Boolean, default: true }
    }, { timestamps: true });

    const User = mongoose.model('User', userSchema);

    // Buscar usuario admin
    const adminUser = await User.findOne({ email: 'admin@serviciosstore.com' });
    
    if (!adminUser) {
      console.log('❌ Usuario admin no encontrado');
      return;
    }

    console.log('✅ Usuario admin encontrado:', {
      username: adminUser.username,
      email: adminUser.email,
      role: adminUser.role,
      isActive: adminUser.isActive
    });

    // Actualizar rol a admin
    adminUser.role = 'admin';
    await adminUser.save();

    console.log('✅ Usuario admin actualizado con rol de administrador');

    // Verificar actualización
    const updatedUser = await User.findOne({ email: 'admin@serviciosstore.com' });
    console.log('🔍 Usuario actualizado:', {
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      isActive: updatedUser.isActive
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
  }
}

updateAdminRole();
