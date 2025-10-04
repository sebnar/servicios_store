// Script de inicialización de la base de datos
const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb://localhost:27017/servicios_store';

async function initDatabase() {
  try {
    console.log('🔧 Inicializando base de datos...');
    
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db('servicios_store');
    
    // Crear colecciones si no existen
    await db.createCollection('users');
    await db.createCollection('services');
    await db.createCollection('content');
    
    // Crear índices
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('services').createIndex({ title: 1 });
    await db.collection('content').createIndex({ type: 1 });
    
    // Insertar datos iniciales si no existen
    const userCount = await db.collection('users').countDocuments();
    if (userCount === 0) {
      console.log('📝 Insertando usuario administrador inicial...');
      await db.collection('users').insertOne({
        email: 'admin@servicios.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    const serviceCount = await db.collection('services').countDocuments();
    if (serviceCount === 0) {
      console.log('📝 Insertando servicios iniciales...');
      await db.collection('services').insertMany([
        {
          title: 'Desarrollo Web',
          description: 'Desarrollo de sitios web modernos y responsivos',
          price: 50000,
          category: 'Desarrollo',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Consultoría IT',
          description: 'Asesoría en tecnología e infraestructura',
          price: 30000,
          category: 'Consultoría',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    }
    
    console.log('✅ Base de datos inicializada correctamente!');
    await client.close();
    
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
  }
}

// Ejecutar después de un delay para asegurar que MongoDB esté listo
setTimeout(initDatabase, 10000);
