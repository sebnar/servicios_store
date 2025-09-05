import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { WelcomeSection } from './components/WelcomeSection';
import { ServicesSection } from './components/ServicesSection';
import { ServiceDetail } from './components/ServiceDetail';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { MissionVisionSection } from './components/MissionVisionSection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'service-detail' | 'admin-login' | 'admin-panel'>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleServiceClick = (serviceId: number) => {
    // Solo mostramos el detalle para el servicio de Desarrollo Web (id: 1)
    if (serviceId === 1) {
      setSelectedServiceId(serviceId);
      setCurrentView('service-detail');
    } else {
      alert(`Detalle próximamente disponible para el servicio ${serviceId}`);
    }
  };

  const handleBackToServices = () => {
    setCurrentView('home');
    setSelectedServiceId(null);
  };

  const handleRequestQuote = () => {
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto para discutir tu proyecto de desarrollo web.');
  };

  const handleLoginClick = () => {
    setCurrentView('admin-login');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      setCurrentView('admin-panel');
    }
    // Si falla, no hace nada especial ya que el componente AdminLogin maneja el error
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  // Vista de Login de Administrador
  if (currentView === 'admin-login') {
    return (
      <AdminLogin 
        onLogin={handleLogin}
        onBackToHome={handleBackToHome}
      />
    );
  }

  // Vista del Panel de Administración
  if (currentView === 'admin-panel' && isAuthenticated) {
    return (
      <AdminPanel onLogout={handleLogout} />
    );
  }

  // Vista de Detalle de Servicio
  if (currentView === 'service-detail' && selectedServiceId === 1) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <Navbar onLoginClick={handleLoginClick} />
        
        {/* Service Detail */}
        <ServiceDetail 
          onBack={handleBackToServices}
          onRequestQuote={handleRequestQuote}
        />
        
        {/* Footer */}
        <Footer />
      </div>
    );
  }

  // Vista Principal (Home)
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar onLoginClick={handleLoginClick} />
      
      {/* Hero Slider */}
      <HeroSlider />
      
      {/* Welcome Section */}
      <WelcomeSection />
      
      {/* Services Section */}
      <ServicesSection onServiceClick={handleServiceClick} />
      
      {/* Mission & Vision Section */}
      <MissionVisionSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}