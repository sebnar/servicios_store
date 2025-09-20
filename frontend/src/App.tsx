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
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleServiceClick = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentView('service-detail');
  };

  const handleBackToServices = () => {
    setCurrentView('home');
    setSelectedServiceId(null);
  };

  const handleRequestQuote = () => {
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto para discutir tu proyecto.');
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
  if (currentView === 'service-detail' && selectedServiceId) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <Navbar onLoginClick={handleLoginClick} />
        
        {/* Service Detail */}
        <ServiceDetail 
          serviceId={selectedServiceId}
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