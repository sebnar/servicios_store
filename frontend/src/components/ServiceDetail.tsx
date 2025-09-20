import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Check, Clock, Users, Star, Calendar, MapPin } from 'lucide-react';
import { useService } from '../hooks/useServices';
import { formatPrice, getDefaultImage } from '../utils/formatPrice';

interface ServiceDetailProps {
  serviceId: string;
  onBack: () => void;
  onRequestQuote: () => void;
}

export function ServiceDetail({ serviceId, onBack, onRequestQuote }: ServiceDetailProps) {
  const { service, loading, error } = useService(serviceId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Button 
            onClick={onBack} 
            variant="outline" 
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Servicios
          </Button>
          
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Servicio no encontrado'}
            </h1>
            <p className="text-gray-600 mb-6">
              El servicio que buscas no está disponible en este momento.
            </p>
            <Button onClick={onBack}>
              Volver a Servicios
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Botón de regreso */}
        <Button 
          onClick={onBack} 
          variant="outline" 
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Servicios
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagen del servicio */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <ImageWithFallback
                src={service.images[0] || getDefaultImage(service.category)}
                alt={service.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {service.isFeatured && (
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    <Star className="h-3 w-3 mr-1" />
                    Destacado
                  </Badge>
                )}
                <Badge variant="secondary">
                  {service.category}
                </Badge>
              </div>
            </div>

            {/* Galería de imágenes adicionales */}
            {service.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {service.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={image}
                      alt={`${service.name} - Imagen ${index + 2}`}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información del servicio */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-primary">{service.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(service.price, service.currency)}
                  </span>
                </div>
                <Badge 
                  variant={service.availability.isAvailable ? "default" : "destructive"}
                  className="text-sm"
                >
                  <Check className="h-3 w-3 mr-1" />
                  {service.availability.isAvailable ? 'Disponible' : 'No Disponible'}
                </Badge>
              </div>
              
              {service.subcategory && (
                <Badge variant="outline" className="mb-4">
                  {service.subcategory}
                </Badge>
              )}
            </div>

            {/* Descripción */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-primary">Descripción del Servicio</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.duration && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Duración: {service.duration}</span>
                </div>
              )}
              
              {service.availability.schedule && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Horario: {service.availability.schedule}</span>
                </div>
              )}

              {service.availability.maxBookings && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Máx. {service.availability.maxBookings} reservas/día</span>
                </div>
              )}
            </div>

            {/* Características */}
            {service.features && service.features.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-primary">Características Incluidas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {service.tags && service.tags.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-primary">Etiquetas</h3>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Botón de acción */}
            <div className="pt-4">
              <Button 
                onClick={onRequestQuote}
                disabled={!service.availability.isAvailable}
                className="w-full sm:w-auto"
                size="lg"
              >
                {service.availability.isAvailable ? 'Solicitar Cotización' : 'No Disponible'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}