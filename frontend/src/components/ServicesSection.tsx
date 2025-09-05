import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

const services = [
  {
    id: 1,
    name: "Desarrollo Web",
    price: "$500.000 COP",
    image: "https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTY4NDgzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Sitios web modernos y responsivos"
  },
  {
    id: 2,
    name: "Desarrollo Móvil",
    price: "$800.000 COP",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY3OTA1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Apps nativas para iOS y Android"
  },
  {
    id: 3,
    name: "Servicios en la Nube",
    price: "$1.200.000 COP",
    image: "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHNlcnZlcnN8ZW58MXx8fHwxNzU2Nzg0NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Migración y gestión cloud"
  },
  {
    id: 4,
    name: "Ciberseguridad",
    price: "$950.000 COP",
    image: "https://images.unsplash.com/photo-1724219616919-aab943e7b00d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwc2hpZWxkfGVufDF8fHx8MTc1NjgwMTM1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Protección integral de datos"
  },
  {
    id: 5,
    name: "Análisis de Datos",
    price: "$700.000 COP",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NjgyMjA0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Business Intelligence y reportes"
  },
  {
    id: 6,
    name: "Inteligencia Artificial",
    price: "$1.500.000 COP",
    image: "https://images.unsplash.com/photo-1745674684463-62f62cb88d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwQUl8ZW58MXx8fHwxNzU2ODEzMTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Soluciones de Machine Learning"
  },
  {
    id: 7,
    name: "Marketing Digital",
    price: "$600.000 COP",
    image: "https://images.unsplash.com/photo-1674027392887-751d6396b710?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwb25saW5lfGVufDF8fHx8MTc1Njg1NTU3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Estrategias digitales efectivas"
  },
  {
    id: 8,
    name: "Soporte Técnico",
    price: "$300.000 COP",
    image: "https://images.unsplash.com/photo-1512439408685-2e399291a4e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJVCUyMHN1cHBvcnQlMjBjb21wdXRlcnxlbnwxfHx8fDE3NTY4MDMwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Asistencia técnica especializada"
  },
  {
    id: 9,
    name: "Consultoría IT",
    price: "$850.000 COP",
    image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGNvbnN1bHRpbmd8ZW58MXx8fHwxNzU2ODU1NTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Asesoría tecnológica estratégica"
  },
  {
    id: 10,
    name: "Automatización",
    price: "$1.100.000 COP",
    image: "https://images.unsplash.com/photo-1649829788649-b2d1128ef2f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwcm9ib3RpY3N8ZW58MXx8fHwxNzU2NzUxNTM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Procesos automatizados inteligentes"
  }
];

interface ServicesSectionProps {
  onServiceClick?: (serviceId: number) => void;
}

export function ServicesSection({ onServiceClick }: ServicesSectionProps) {
  const handleServiceClick = (serviceId: number) => {
    if (onServiceClick) {
      onServiceClick(serviceId);
    } else {
      // Navegación por defecto o placeholder
      console.log(`Navegando al servicio ${serviceId}`);
    }
  };

  return (
    <section id="servicios" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-primary">Nuestros Servicios</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra amplia gama de soluciones tecnológicas diseñadas 
            para impulsar el crecimiento y la innovación en tu empresa
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className={`group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white ${
                service.id === 1 ? 'ring-2 ring-blue-100 hover:ring-blue-200' : ''
              }`}
              onClick={() => handleServiceClick(service.id)}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <h3 className="mb-2 text-primary group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">
                    {service.price}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button 
                  variant="outline" 
                  className={`w-full transition-colors ${
                    service.id === 1 
                      ? 'group-hover:bg-primary group-hover:text-white border-blue-200' 
                      : 'group-hover:bg-gray-100'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServiceClick(service.id);
                  }}
                >
                  {service.id === 1 ? 'Ver detalle completo' : 'Ver más'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Sección adicional de información */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="mb-4 text-primary">¿No encuentras lo que buscas?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ofrecemos soluciones personalizadas para cada cliente. 
              Contáctanos y cuéntanos sobre tu proyecto específico.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Solicitar Cotización Personalizada
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}