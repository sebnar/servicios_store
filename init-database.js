// Script para inicializar la base de datos con datos de ejemplo
const { exec } = require('child_process');
const path = require('path');

console.log('🚀 Inicializando base de datos...\n');

// Ejecutar script de admin
console.log('1️⃣ Creando usuario administrador...');
exec('cd backend && npm run init-admin', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error creando admin:', error);
    return;
  }
  console.log(stdout);
  
  // Esperar un poco y ejecutar script de servicios
  setTimeout(() => {
    console.log('\n2️⃣ Creando servicios de ejemplo...');
    exec('cd backend && npm run init-services', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Error creando servicios:', error);
        return;
      }
      console.log(stdout);
      console.log('\n✅ ¡Base de datos inicializada correctamente!');
      console.log('\n📋 Datos creados:');
      console.log('   - Usuario admin: admin@serviciosstore.com / admin123456');
      console.log('   - 6 servicios de ejemplo');
      console.log('   - Colecciones: users, services, contents');
    });
  }, 2000);
});