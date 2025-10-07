import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Settings, 
  Users, 
  Package, 
  BarChart3, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { ServiceManagement } from './ServiceManagement';
import { QuotationList } from './QuotationList';
import { useServices } from '../hooks/useServices';
import { useAdminQuotations } from '../hooks/useQuotations';
import { apiService } from '../services/api';

interface AdminPanelProps {
  onLogout: () => void;
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [currentView, setCurrentView] = useState<'dashboard' | 'services' | 'quotations'>('dashboard');
  const { services, loading, refetch } = useServices({ limit: 100 });
  const { quotations, loading: quotationsLoading, refetch: refetchQuotations } = useAdminQuotations({ limit: 100 });
  
  // Calcular estadísticas de cotizaciones
  const quotationStats = {
    total: quotations.length,
    pending: quotations.filter(q => q.status === 'pending').length,
    inProgress: quotations.filter(q => q.status === 'in_progress').length,
    completed: quotations.filter(q => q.status === 'completed').length,
    cancelled: quotations.filter(q => q.status === 'cancelled').length
  };

  const handleLogout = () => {
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
      onLogout();
    }
  };

  const handleCreateService = async (serviceData: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://servicios-store-middle.onrender.com/api'}/admin/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiService.getToken()}`
        },
        body: JSON.stringify(serviceData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear servicio');
      }

      alert('Servicio creado exitosamente');
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      throw error;
    }
  };

  const handleUpdateService = async (id: string, serviceData: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://servicios-store.onrender.com/api'}/admin/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiService.getToken()}`
        },
        body: JSON.stringify(serviceData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar servicio');
      }

      alert('Servicio actualizado exitosamente');
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      throw error;
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://servicios-store.onrender.com/api'}/admin/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiService.getToken()}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar servicio');
      }

      alert('Servicio eliminado exitosamente');
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      throw error;
    }
  };

  // Vista de gestión de servicios
  if (currentView === 'services') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header del panel */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentView('dashboard')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Dashboard
                </Button>
                <div>
                  <h1 className="text-primary">Gestión de Servicios</h1>
                  <p className="text-sm text-gray-600">Administre el catálogo de servicios</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  En línea
                </Badge>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido de gestión de servicios */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ServiceManagement
            services={services}
            loading={loading}
            onRefresh={refetch}
            onCreateService={handleCreateService}
            onUpdateService={handleUpdateService}
            onDeleteService={handleDeleteService}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header del panel */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Settings className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-primary">Panel de Administración</h1>
                <p className="text-sm text-gray-600">TechSphere Solutions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                En línea
              </Badge>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Servicios</p>
                  <p className="text-2xl font-bold text-primary">{services.length}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cotizaciones</p>
                  <p className="text-2xl font-bold text-primary">{quotationStats.total}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendientes</p>
                  <p className="text-2xl font-bold text-primary">{quotationStats.pending}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completadas</p>
                  <p className="text-2xl font-bold text-primary">{quotationStats.completed}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secciones principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gestión de Servicios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Gestión de Servicios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm mb-4">
                Administre el catálogo de servicios, precios y disponibilidad
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setCurrentView('services')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Gestionar Servicios
                </Button>
                <Badge variant="secondary">
                  {services.length} servicios
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Gestión de Cotizaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Cotizaciones Recientes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm mb-4">
                Revise y responda a las solicitudes de cotización
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Desarrollo Web</p>
                    <p className="text-xs text-gray-600">Cliente: María García</p>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-200">
                    Pendiente
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Servicios en la Nube</p>
                    <p className="text-xs text-gray-600">Cliente: Tech Corp</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Respondida
                  </Badge>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setCurrentView('quotations')}
              >
                Ver Todas las Cotizaciones
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Mensaje de bienvenida */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6 text-center">
            <h3 className="mb-2 text-primary">¡Bienvenido al Panel de Administración!</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Desde aquí puede gestionar todos los aspectos de TechSphere Solutions: 
              servicios, precios, cotizaciones y configuraciones del sistema.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Funcionalidades CRUD completas próximamente disponibles
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Vista de gestión de cotizaciones
  if (currentView === 'quotations') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header del panel */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentView('dashboard')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Dashboard
                </Button>
                <div>
                  <h1 className="text-primary">Gestión de Cotizaciones</h1>
                  <p className="text-sm text-gray-600">Administre las solicitudes de cotización</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  En línea
                </Badge>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido de gestión de cotizaciones */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <QuotationList
            quotations={quotations}
            loading={quotationsLoading}
            onRefresh={refetchQuotations}
          />
        </div>
      </div>
    );
  }
}