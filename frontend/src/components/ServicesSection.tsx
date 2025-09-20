import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useServices } from '../hooks/useServices';
import { Service } from '../services/api';
import { Badge } from './ui/badge';
import { Star, Clock, Users } from 'lucide-react';

// Función para formatear precio
const formatPrice = (price: number, currency: string): string => {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency === 'USD' ? 'USD' : 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
};

// Función para obtener imagen por defecto
const getDefaultImage = (category: string): string => {
  const defaultImages: { [key: string]: string } = {
    'Desarrollo Web': 'https://images.unsplash.com/photo-1546900703-cf06143d1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTY4NDgzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'Desarrollo Móvil': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTY3OTA1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'Consultoría': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdWx0aW5nJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzU2Nzg0NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'Marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBkaWdpdGFsfGVufDF8fHx8MTc1Njc4NDQyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'Soporte': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwb3J0JTIwdGVjaG5pY2FsfGVufDF8fHx8MTc1Njc4NDQyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
  };
  return defaultImages[category] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXMlMjBjaGFydHN8ZW58MXx8fHwxNzU2Nzg0NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080';
};

interface ServicesSectionProps {
  onServiceClick: (serviceId: string) => void;
}

export function ServicesSection({ onServiceClick }: ServicesSectionProps) {
  const { services, loading, error, refetch } = useServices({
    limit: 10,
    autoFetch: true
  });

  const handleServiceClick = (service: Service) => {
    onServiceClick(service._id);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cargando servicios...
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardHeader className="p-0">
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Nuestros Servicios
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={refetch} variant="outline" className="text-red-600 border-red-300">
                Reintentar
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ofrecemos soluciones tecnológicas integrales para impulsar tu negocio hacia el futuro digital
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service) => (
            <Card 
              key={service._id} 
              className={`group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white ${
                service.isFeatured ? 'ring-2 ring-blue-100 hover:ring-blue-200' : ''
              }`}
              onClick={() => handleServiceClick(service)}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={service.images[0] || getDefaultImage(service.category)}
                    alt={service.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {service.isFeatured && (
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        <Star className="h-3 w-3 mr-1" />
                        Destacado
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {service.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <h3 className="mb-2 text-primary group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {service.shortDescription || service.description}
                </p>
                
                {/* Información adicional */}
                <div className="space-y-2 mb-3">
                  {service.duration && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {service.duration}
                    </div>
                  )}
                  {service.availability.maxBookings && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="h-3 w-3 mr-1" />
                      Max {service.availability.maxBookings} reservas
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">
                    {formatPrice(service.price, service.currency)}
                  </span>
                  {!service.availability.isAvailable && (
                    <Badge variant="destructive" className="text-xs">
                      No disponible
                    </Badge>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full" 
                  variant={service.availability.isAvailable ? "default" : "secondary"}
                  disabled={!service.availability.isAvailable}
                >
                  {service.availability.isAvailable ? 'Ver Detalles' : 'No Disponible'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Mensaje si no hay servicios */}
        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay servicios disponibles en este momento.</p>
          </div>
        )}
      </div>
    </section>
  );
}