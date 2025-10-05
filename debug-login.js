// Script para probar el login directamente
const fetch = require('node-fetch');

async function testLogin() {
  try {
    console.log('🔍 Probando login...');
    
    const response = await fetch('https://servicios-store.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@serviciosstore.com',
        password: 'admin123456'
      })
    });

    const data = await response.json();
    
    console.log('📊 Status:', response.status);
    console.log('📋 Response:', data);
    
    if (response.ok) {
      console.log('✅ Login exitoso!');
    } else {
      console.log('❌ Login falló:', data.message);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testLogin();
