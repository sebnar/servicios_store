import mongoose from 'mongoose';
import User from '../models/User';
import { connectDB } from '../utils/database';

const createAdminUser = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Verificar si ya existe un usuario admin
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('✅ Usuario administrador ya existe:', existingAdmin.username);
      return;
    }

    // Crear usuario administrador
    const adminUser = new User({
      username: 'admin',
      email: 'admin@serviciosstore.com',
      password: 'admin123456', // Se encriptará automáticamente
      role: 'admin',
      isActive: true
    });

    await adminUser.save();

    console.log('✅ Usuario administrador creado exitosamente:');
    console.log('   Usuario: admin');
    console.log('   Email: admin@serviciosstore.com');
    console.log('   Contraseña: admin123456');
    console.log('   Rol: admin');

  } catch (error) {
    console.error('❌ Error creando usuario administrador:', error);
  } finally {
    // Cerrar conexión
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
    process.exit(0);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  createAdminUser();
}

export default createAdminUser;
