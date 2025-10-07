import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/servicios_store';

export const connectDB = async (): Promise<void> => {
  try {
    // Debug: Mostrar la URI que se está usando
    console.log('🔍 [DATABASE] Intentando conectar a MongoDB...');
    console.log('🔗 [DATABASE] URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Ocultar credenciales en logs
    
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`✅ [DATABASE] MongoDB conectado: ${conn.connection.host}`);
    console.log(`📊 [DATABASE] Base de datos: ${conn.connection.name}`);
    console.log(`🔌 [DATABASE] Estado de conexión: ${conn.connection.readyState}`);
    
    // Verificar colecciones existentes
    if (conn.connection.db) {
      const collections = await conn.connection.db.listCollections().toArray();
      console.log(`📋 [DATABASE] Colecciones disponibles:`, collections.map(c => c.name));
    }
  } catch (error) {
    console.error('❌ [DATABASE] Error conectando a MongoDB:', error);
    console.log('💡 [DATABASE] Verifica que la variable MONGODB_URI esté configurada correctamente');
    console.log('💡 [DATABASE] En Render, ve a Environment y agrega MONGODB_URI');
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
