import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Eye, Calendar, DollarSign, User, Mail, Phone, Building } from 'lucide-react';
import { Quotation } from '../services/api';
import { apiService } from '../services/api';

interface QuotationListProps {
  quotations: Quotation[];
  loading: boolean;
  onRefresh: () => void;
  onViewQuotation?: (quotation: Quotation) => void;
}

export function QuotationList({ quotations, loading, onRefresh, onViewQuotation }: QuotationListProps) {
  console.log('QuotationList render - quotations:', quotations.length, 'loading:', loading);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'in_progress':
        return 'En Proceso';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const filteredQuotations = quotations.filter(quotation => {
    const matchesSearch = 
      quotation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.clientCompany?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || quotation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Cargando cotizaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nombre, email o empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="in_progress">En Proceso</SelectItem>
              <SelectItem value="completed">Completada</SelectItem>
              <SelectItem value="cancelled">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onRefresh} variant="outline">
          Actualizar
        </Button>
      </div>

      {/* Lista de Cotizaciones */}
      {filteredQuotations.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No se encontraron cotizaciones</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredQuotations.map((quotation) => (
            <Card key={quotation._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{quotation.clientName}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {quotation.clientEmail}
                      </div>
                      {quotation.clientPhone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {quotation.clientPhone}
                        </div>
                      )}
                      {quotation.clientCompany && (
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {quotation.clientCompany}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(quotation.status)}>
                      {getStatusText(quotation.status)}
                    </Badge>
                    {onViewQuotation && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewQuotation(quotation)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Servicios Solicitados */}
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Servicios</h4>
                    <div className="space-y-1">
                      {quotation.requestedServices.map((service, index) => (
                        <div key={index} className="text-sm">
                          <div className="font-medium">{service.serviceName}</div>
                          {service.quantity > 1 && (
                            <div className="text-gray-500">Cantidad: {service.quantity}</div>
                          )}
                          {service.notes && (
                            <div className="text-gray-500 text-xs">Notas: {service.notes}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Información Financiera */}
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Presupuesto</h4>
                    <div className="space-y-1 text-sm">
                      {quotation.estimatedBudget && (
                        <div className="flex justify-between">
                          <span>Estimado:</span>
                          <span className="font-medium">
                            {formatCurrency(quotation.estimatedBudget, quotation.currency)}
                          </span>
                        </div>
                      )}
                      {quotation.finalBudget && (
                        <div className="flex justify-between">
                          <span>Final:</span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(quotation.finalBudget, quotation.currency)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Fechas */}
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Fechas</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Solicitada: {formatDate(quotation.requestedDate)}</span>
                      </div>
                      {quotation.estimatedDelivery && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Entrega: {formatDate(quotation.estimatedDelivery)}</span>
                        </div>
                      )}
                      {quotation.completedDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Completada: {formatDate(quotation.completedDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notas del Cliente */}
                {quotation.clientNotes && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Notas del Cliente</h4>
                    <p className="text-sm text-gray-600">{quotation.clientNotes}</p>
                  </div>
                )}

                {/* Asignación */}
                {quotation.assignedTo && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4" />
                      <span className="text-gray-600">Asignado a:</span>
                      <span className="font-medium">{quotation.assignedTo.username}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
