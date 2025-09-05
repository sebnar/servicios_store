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
  Trash2
} from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const handleLogout = () => {
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
      onLogout();
    }
  };

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
                  <p className="text-2xl font-bold text-primary">10</p>
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
                  <p className="text-2xl font-bold text-primary">24</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Usuarios</p>
                  <p className="text-2xl font-bold text-primary">156</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ingresos</p>
                  <p className="text-2xl font-bold text-primary">$2.4M</p>
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
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Servicio
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
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
              
              <Button variant="outline" size="sm" className="w-full">
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
}