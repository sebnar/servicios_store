// Test simple de CORS
const testCors = async () => {
  try {
    console.log('🔍 Probando CORS...');
    
    const response = await fetch('http://localhost:5000/api/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Health check OK:', data);
      
      // Probar login
      console.log('🔍 Probando login...');
      const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@serviciosstore.com',
          password: 'admin123456'
        })
      });
      
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log('✅ Login OK:', loginData.message);
      } else {
        const error = await loginResponse.json();
        console.log('❌ Login Error:', error);
      }
    } else {
      console.log('❌ Health check failed:', response.status);
    }
  } catch (error) {
    console.log('❌ CORS Error:', error.message);
  }
};

testCors();
