import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, Lock, User, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
  onBackToHome: () => void;
}

export function AdminLogin({ onLogin, onBackToHome }: AdminLoginProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Credenciales por defecto para demostración
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'techsphere2024'
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Por favor ingrese usuario y contraseña');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simular llamada de autenticación
    setTimeout(() => {
      if (
        formData.username === ADMIN_CREDENTIALS.username &&
        formData.password === ADMIN_CREDENTIALS.password
      ) {
        onLogin(true);
      } else {
        setError('Usuario o contraseña incorrectos. Intente nuevamente.');
        onLogin(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleForgotPassword = () => {
    alert('Para recuperar su contraseña, contacte al administrador del sistema en: soporte@techsphere.com');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Botón de regreso */}
        <Button
          variant="ghost"
          onClick={onBackToHome}
          className="mb-6 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Button>

        {/* Card de login */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-center">
              Administrador
            </CardTitle>
            <p className="text-center text-gray-600 text-sm">
              Ingrese sus credenciales para acceder al panel de gestión
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo Usuario */}
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="pl-10 bg-input-background border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Ingrese su usuario"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 bg-input-background border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Ingrese su contraseña"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Botón de ingreso */}
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Validando...
                  </div>
                ) : (
                  'Ingresar'
                )}
              </Button>

              {/* Mensaje de error */}
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Enlace recuperar contraseña */}
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Información de demostración */}
        <div className="mt-6 p-4 bg-white/50 rounded-lg text-center text-sm text-gray-600">
          <p className="font-medium mb-2">Credenciales de demostración:</p>
          <p><strong>Usuario:</strong> admin</p>
          <p><strong>Contraseña:</strong> techsphere2024</p>
        </div>
      </div>
    </div>
  );
}