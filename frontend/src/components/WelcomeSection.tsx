export function WelcomeSection() {
  return (
    <section id="inicio" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-primary">
            TechSphere Solutions - Servicios Tecnológicos de Calidad
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Somos una empresa líder en soluciones tecnológicas, comprometida con brindar 
            servicios de la más alta calidad que impulsen la transformación digital de tu negocio. 
            Nuestro equipo de expertos trabaja incansablemente para ofrecerte las mejores 
            herramientas y estrategias que necesitas para destacar en el mundo digital.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="mb-2">Innovación</h3>
              <p className="text-gray-600">Tecnologías de vanguardia para tu empresa</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="mb-2">Seguridad</h3>
              <p className="text-gray-600">Protección integral de tus datos</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="mb-2">Eficiencia</h3>
              <p className="text-gray-600">Optimización de procesos empresariales</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}