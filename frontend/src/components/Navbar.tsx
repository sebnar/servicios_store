import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onLoginClick?: () => void;
}

export function Navbar({ onLoginClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-primary">TechSphere Solutions</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#inicio" className="text-gray-700 hover:text-primary px-3 py-2 transition-colors">
                Inicio
              </a>
              <a href="#servicios" className="text-gray-700 hover:text-primary px-3 py-2 transition-colors">
                Servicios
              </a>
              <Button 
                variant="outline" 
                className="ml-4"
                onClick={onLoginClick}
              >
                Login
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#inicio" className="block text-gray-700 hover:text-primary px-3 py-2 transition-colors">
                Inicio
              </a>
              <a href="#servicios" className="block text-gray-700 hover:text-primary px-3 py-2 transition-colors">
                Servicios
              </a>
              <div className="px-3 py-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onLoginClick}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}