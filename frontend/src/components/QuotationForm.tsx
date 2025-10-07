import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, Plus, Save } from 'lucide-react';
import { Service, QuotationRequest } from '../services/api';
import { apiService } from '../services/api';

/**
 * Formulario para solicitar cotizaciones
 * Permite a los clientes seleccionar servicios y proporcionar información
 */
interface QuotationFormProps {
  onSave: (quotationData: QuotationRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function QuotationForm({ onSave, onCancel, isLoading = false }: QuotationFormProps) {
  // Estado del formulario con datos iniciales
  const [formData, setFormData] = useState<QuotationRequest>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    requestedServices: [],
    currency: 'USD',
    clientNotes: '',
    estimatedDelivery: ''
  });

  // Lista de servicios disponibles
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [newService, setNewService] = useState({
    serviceId: '',
    quantity: 1,
    notes: ''
  });

  // Cargar servicios disponibles
  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await apiService.getServices({ limit: 100 });
        setServices(response.services);
      } catch (error) {
        console.error('Error cargando servicios:', error);
      } finally {
        setLoadingServices(false);
      }
    };

    loadServices();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addService = () => {
    if (newService.serviceId) {
      const selectedService = services.find(s => s._id === newService.serviceId);
      if (selectedService) {
        setFormData(prev => ({
          ...prev,
          requestedServices: [
            ...prev.requestedServices,
            {
              serviceId: newService.serviceId,
              quantity: newService.quantity,
              notes: newService.notes
            }
          ]
        }));
        setNewService({ serviceId: '', quantity: 1, notes: '' });
      }
    }
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requestedServices: prev.requestedServices.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.requestedServices.length === 0) {
      alert('Debe seleccionar al menos un servicio');
      return;
    }

    await onSave(formData);
  };

  const calculateTotal = () => {
    return formData.requestedServices.reduce((total, reqService) => {
      const service = services.find(s => s._id === reqService.serviceId);
      return total + (service?.price || 0) * (reqService.quantity || 1);
    }, 0);
  };

  if (loadingServices) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Cargando servicios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Solicitar Cotización
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información del Cliente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientName">Nombre Completo *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  required
                  placeholder="Ingrese su nombre completo"
                />
              </div>
              <div>
                <Label htmlFor="clientEmail">Email *</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                  required
                  placeholder="su@email.com"
                />
              </div>
              <div>
                <Label htmlFor="clientPhone">Teléfono</Label>
                <Input
                  id="clientPhone"
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="clientCompany">Empresa</Label>
                <Input
                  id="clientCompany"
                  value={formData.clientCompany}
                  onChange={(e) => handleInputChange('clientCompany', e.target.value)}
                  placeholder="Nombre de su empresa"
                />
              </div>
            </div>

            {/* Servicios Solicitados */}
            <div>
              <Label className="text-lg font-semibold">Servicios Solicitados</Label>
              
              {/* Agregar Nuevo Servicio */}
              <div className="border rounded-lg p-4 mb-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="serviceSelect">Servicio</Label>
                    <Select value={newService.serviceId} onValueChange={(value) => setNewService(prev => ({ ...prev, serviceId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map(service => (
                          <SelectItem key={service._id} value={service._id}>
                            {service.name} - ${service.price} {service.currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Cantidad</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={newService.quantity}
                      onChange={(e) => setNewService(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="button" onClick={addService} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="serviceNotes">Notas del Servicio</Label>
                  <Textarea
                    id="serviceNotes"
                    value={newService.notes}
                    onChange={(e) => setNewService(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Especificaciones adicionales para este servicio..."
                    rows={2}
                  />
                </div>
              </div>

              {/* Lista de Servicios Agregados */}
              {formData.requestedServices.length > 0 && (
                <div className="space-y-2">
                  {formData.requestedServices.map((reqService, index) => {
                    const service = services.find(s => s._id === reqService.serviceId);
                    return (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                        <div className="flex-1">
                          <div className="font-medium">{service?.name}</div>
                          <div className="text-sm text-gray-600">
                            Cantidad: {reqService.quantity} | 
                            Precio: ${service?.price} {service?.currency} | 
                            Subtotal: ${(service?.price || 0) * reqService.quantity} {service?.currency}
                          </div>
                          {reqService.notes && (
                            <div className="text-sm text-gray-500 mt-1">
                              Notas: {reqService.notes}
                            </div>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeService(index)}
                          className="ml-4"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Información Adicional */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">Moneda</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - Dólar Americano</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="COP">COP - Peso Colombiano</SelectItem>
                    <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="estimatedDelivery">Fecha de Entrega Estimada</Label>
                <Input
                  id="estimatedDelivery"
                  type="date"
                  value={formData.estimatedDelivery}
                  onChange={(e) => handleInputChange('estimatedDelivery', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="clientNotes">Notas Adicionales</Label>
              <Textarea
                id="clientNotes"
                value={formData.clientNotes}
                onChange={(e) => handleInputChange('clientNotes', e.target.value)}
                placeholder="Información adicional sobre su proyecto..."
                rows={4}
              />
            </div>

            {/* Resumen */}
            {formData.requestedServices.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Resumen de la Cotización</h3>
                <div className="space-y-1">
                  {formData.requestedServices.map((reqService, index) => {
                    const service = services.find(s => s._id === reqService.serviceId);
                    return (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{service?.name} x {reqService.quantity}</span>
                        <span>${(service?.price || 0) * reqService.quantity} {service?.currency}</span>
                      </div>
                    );
                  })}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Estimado:</span>
                      <span>${calculateTotal()} {formData.currency}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading || formData.requestedServices.length === 0}>
                {isLoading ? 'Enviando...' : 'Enviar Cotización'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
