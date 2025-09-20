import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service';
import { connectDB } from '../utils/database';

dotenv.config();

const sampleServices = [
  {
    name: 'Diseño Web Profesional',
    description: 'Creamos sitios web modernos y responsivos que se adaptan a todos los dispositivos. Incluye diseño personalizado, optimización SEO y integración con redes sociales.',
    shortDescription: 'Sitios web modernos y responsivos con diseño personalizado y optimización SEO.',
    price: 500,
    currency: 'USD',
    category: 'Desarrollo Web',
    subcategory: 'Diseño',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'],
    features: [
      'Diseño responsivo',
      'Optimización SEO',
      'Integración con redes sociales',
      'Panel de administración',
      'Soporte técnico 24/7'
    ],
    duration: '2-3 semanas',
    availability: {
      isAvailable: true,
      schedule: 'Lunes a Viernes 9:00-18:00',
      maxBookings: 5
    },
    isActive: true,
    isFeatured: true,
    order: 1,
    tags: ['web', 'diseño', 'responsive', 'seo']
  },
  {
    name: 'Aplicación Móvil iOS/Android',
    description: 'Desarrollamos aplicaciones móviles nativas e híbridas para iOS y Android. Incluye diseño de interfaz, desarrollo backend y publicación en tiendas.',
    shortDescription: 'Apps móviles nativas para iOS y Android con diseño personalizado.',
    price: 1500,
    currency: 'USD',
    category: 'Desarrollo Móvil',
    subcategory: 'Apps Nativas',
    images: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800'],
    features: [
      'Desarrollo nativo',
      'Diseño de interfaz',
      'Backend incluido',
      'Publicación en tiendas',
      'Mantenimiento 6 meses'
    ],
    duration: '6-8 semanas',
    availability: {
      isAvailable: true,
      schedule: 'Lunes a Viernes 9:00-18:00',
      maxBookings: 3
    },
    isActive: true,
    isFeatured: true,
    order: 2,
    tags: ['mobile', 'ios', 'android', 'app']
  },
  {
    name: 'Consultoría Digital',
    description: 'Asesoramos a empresas en su transformación digital. Incluye análisis de procesos, recomendaciones tecnológicas y plan de implementación.',
    shortDescription: 'Asesoría especializada en transformación digital empresarial.',
    price: 200,
    currency: 'USD',
    category: 'Consultoría',
    subcategory: 'Digital',
    images: ['https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800'],
    features: [
      'Análisis de procesos',
      'Recomendaciones tecnológicas',
      'Plan de implementación',
      'Seguimiento mensual',
      'Reportes detallados'
    ],
    duration: '1-2 semanas',
    availability: {
      isAvailable: true,
      schedule: 'Lunes a Viernes 9:00-17:00',
      maxBookings: 10
    },
    isActive: true,
    isFeatured: false,
    order: 3,
    tags: ['consultoría', 'digital', 'empresas', 'transformación']
  },
  {
    name: 'E-commerce Completo',
    description: 'Tienda online completa con carrito de compras, pasarela de pagos, gestión de inventario y panel administrativo. Incluye diseño personalizado y optimización.',
    shortDescription: 'Tienda online completa con todas las funcionalidades necesarias.',
    price: 800,
    currency: 'USD',
    category: 'Desarrollo Web',
    subcategory: 'E-commerce',
    images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'],
    features: [
      'Carrito de compras',
      'Pasarela de pagos',
      'Gestión de inventario',
      'Panel administrativo',
      'Optimización SEO'
    ],
    duration: '4-5 semanas',
    availability: {
      isAvailable: true,
      schedule: 'Lunes a Viernes 9:00-18:00',
      maxBookings: 4
    },
    isActive: true,
    isFeatured: true,
    order: 4,
    tags: ['ecommerce', 'tienda', 'online', 'pagos']
  },
  {
    name: 'Marketing Digital',
    description: 'Estrategia completa de marketing digital incluyendo redes sociales, Google Ads, SEO y análisis de métricas. Aumentamos tu presencia online.',
    shortDescription: 'Estrategia completa de marketing digital para aumentar tu presencia online.',
    price: 300,
    currency: 'USD',
    category: 'Marketing',
    subcategory: 'Digital',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'],
    features: [
      'Estrategia de redes sociales',
      'Google Ads',
      'Optimización SEO',
      'Análisis de métricas',
      'Reportes mensuales'
    ],
    duration: '2-3 semanas',
    availability: {
      isAvailable: true,
      schedule: 'Lunes a Viernes 9:00-17:00',
      maxBookings: 8
    },
    isActive: true,
    isFeatured: false,
    order: 5,
    tags: ['marketing', 'digital', 'seo', 'ads']
  },
  {
    name: 'Mantenimiento Web',
    description: 'Servicio de mantenimiento continuo para tu sitio web. Incluye actualizaciones de seguridad, respaldos, monitoreo y soporte técnico.',
    shortDescription: 'Mantenimiento continuo y soporte técnico para tu sitio web.',
    price: 100,
    currency: 'USD',
    category: 'Soporte',
    subcategory: 'Mantenimiento',
    images: ['https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800'],
    features: [
      'Actualizaciones de seguridad',
      'Respaldos automáticos',
      'Monitoreo 24/7',
      'Soporte técnico',
      'Reportes mensuales'
    ],
    duration: 'Mensual',
    availability: {
      isAvailable: true,
      schedule: '24/7',
      maxBookings: 20
    },
    isActive: true,
    isFeatured: false,
    order: 6,
    tags: ['mantenimiento', 'soporte', 'web', 'seguridad']
  }
];

const createSampleServices = async () => {
  await connectDB();

  try {
    console.log('🚀 Inicializando servicios de ejemplo...');

    // Eliminar servicios existentes (opcional)
    const existingServices = await Service.countDocuments();
    if (existingServices > 0) {
      console.log(`⚠️  Ya existen ${existingServices} servicios en la base de datos.`);
      console.log('💡 Si deseas recrear los servicios, elimina los existentes primero.');
      return;
    }

    // Crear servicios de ejemplo
    for (const serviceData of sampleServices) {
      const service = new Service(serviceData);
      await service.save();
      console.log(`✅ Servicio creado: ${service.name}`);
    }

    console.log(`\n🎉 ¡${sampleServices.length} servicios creados exitosamente!`);
    console.log('\n📋 Servicios disponibles:');
    sampleServices.forEach((service, index) => {
      console.log(`   ${index + 1}. ${service.name} - $${service.price} ${service.currency}`);
    });

    console.log('\n💡 Puedes ver los servicios en:');
    console.log('   - Frontend: http://localhost:3000');
    console.log('   - API: http://localhost:5000/api/services');
    console.log('   - Admin: http://localhost:5000/api/admin/services');

  } catch (error) {
    console.error('❌ Error al crear servicios de ejemplo:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
  }
};

createSampleServices();
