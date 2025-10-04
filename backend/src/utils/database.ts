import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/servicios_store';

export const connectDB = async (): Promise<void> => {
  try {
    // Debug: Mostrar la URI que se está usando
    console.log('🔍 Intentando conectar a MongoDB...');
    console.log('🔗 URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Ocultar credenciales en logs
    
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    console.log('💡 Verifica que la variable MONGODB_URI esté configurada correctamente');
    console.log('💡 En Render, ve a Environment y agrega MONGODB_URI');
    process.exit(1);
  }
};

// Manejo de eventos de conexión
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB desconectado');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de MongoDB:', err);
});

// Cerrar conexión al terminar la aplicación
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 Conexión a MongoDB cerrada');
  process.exit(0);
});
