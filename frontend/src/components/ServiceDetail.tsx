import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Check, Clock, Users, Code, Smartphone, Globe, Zap } from 'lucide-react';

interface ServiceDetailProps {
  onBack: () => void;
  onRequestQuote: () => void;
}

export function ServiceDetail({ onBack, onRequestQuote }: ServiceDetailProps) {
  const service = {
    id: 1,
    name: "Desarrollo Web",
    price: "$500.000 COP",
    originalPrice: "$650.000 COP",
    image: "https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTY4NDgzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    availableUnits: 15,
    isOnSale: true,
    description: "Creación de sitios web responsive y modernos utilizando las últimas tecnologías del mercado. Nuestro servicio de desarrollo web incluye diseño personalizado, optimización SEO, integración con sistemas de gestión de contenido y garantía de compatibilidad con todos los dispositivos y navegadores.",
    features: [
      "Diseño responsive para móviles, tablets y desktop",
      "Optimización SEO integrada",
      "Panel de administración intuitivo",
      "Integración con redes sociales",
      "Certificado SSL y seguridad avanzada",
      "Hosting gratuito por 6 meses",
      "Soporte técnico 24/7",
      "Actualizaciones de contenido ilimitadas"
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Node.js"],
    deliveryTime: "2-4 semanas",
    team: "3-5 desarrolladores especializados"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botón de regreso */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Servicios
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagen del servicio */}
          <div className="space-y-4">
            <div className="relative">
              <ImageWithFallback
                src={service.image}
                alt={service.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
              />
              {service.isOnSale && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white">
                  En Oferta
                </Badge>
              )}
            </div>
          </div>

          {/* Información del servicio */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-primary">{service.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-primary">{service.price}</span>
                  {service.isOnSale && (
                    <span className="text-gray-500 line-through text-sm">
                      {service.originalPrice}
                    </span>
                  )}
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  <Check className="h-3 w-3 mr-1" />
                  Disponible: {service.availableUnits} unidades
                </Badge>
              </div>
              
              {service.isOnSale ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  En oferta - Ahorro de $150.000 COP
                </Badge>
              ) : (
                <Badge variant="secondary">
                  No en oferta
                </Badge>
              )}
            </div>

            {/* Descripción */}
            <div>
              <h3 className="mb-3 text-primary">Descripción del Servicio</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Tiempo de entrega</p>
                    <p className="text-sm text-gray-600">{service.deliveryTime}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Equipo asignado</p>
                    <p className="text-sm text-gray-600">{service.team}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Botón de cotización */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={onRequestQuote}
              >
                <Zap className="h-4 w-4 mr-2" />
                Solicitar Cotización
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Respuesta en menos de 24 horas
              </p>
            </div>
          </div>
        </div>

        {/* Características incluidas */}
        <div className="mt-12">
          <h3 className="mb-6 text-primary text-center">¿Qué incluye este servicio?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tecnologías utilizadas */}
        <div className="mt-12">
          <h3 className="mb-6 text-primary text-center">Tecnologías que utilizamos</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {service.technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2">
                <Code className="h-4 w-4 mr-2" />
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Servicios relacionados */}
        <div className="mt-12 bg-white rounded-lg p-8 text-center">
          <h3 className="mb-4 text-primary">¿Te interesa este servicio?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para transformar tu visión en una 
            realidad digital. Contáctanos para una consulta personalizada gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onRequestQuote}
              className="bg-primary hover:bg-primary/90"
            >
              Solicitar Cotización Detallada
            </Button>
            <Button variant="outline" size="lg">
              <Globe className="h-4 w-4 mr-2" />
              Ver Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}