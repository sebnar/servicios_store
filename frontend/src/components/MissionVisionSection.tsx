export function MissionVisionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-primary">Nuestra Empresa</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conoce los valores y principios que nos guían hacia la excelencia tecnológica
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Misión */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-primary text-white p-3 rounded-full mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-primary">Nuestra Misión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Proporcionar soluciones tecnológicas innovadoras y de calidad superior que 
              permitan a nuestros clientes alcanzar sus objetivos empresariales, 
              optimizando sus procesos y potenciando su crecimiento en la era digital. 
              Nos comprometemos a ser el socio tecnológico confiable que impulse la 
              transformación y el éxito de cada organización con la que trabajamos.
            </p>
          </div>

          {/* Visión */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-green-600 text-white p-3 rounded-full mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-green-700">Nuestra Visión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Ser reconocidos como la empresa líder en soluciones tecnológicas a nivel 
              nacional e internacional, destacándonos por nuestra capacidad de innovación, 
              excelencia en el servicio y compromiso con la satisfacción del cliente. 
              Aspiramos a ser el referente que inspire confianza y establezca nuevos 
              estándares de calidad en la industria tecnológica.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="mt-16">
          <h3 className="text-center mb-8 text-primary">Nuestros Valores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-3">🤝</div>
              <h4 className="mb-2">Compromiso</h4>
              <p className="text-gray-600 text-sm">Dedicación total con cada proyecto</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-3">💎</div>
              <h4 className="mb-2">Excelencia</h4>
              <p className="text-gray-600 text-sm">Calidad superior en cada solución</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-3">🔄</div>
              <h4 className="mb-2">Innovación</h4>
              <p className="text-gray-600 text-sm">Tecnología de vanguardia siempre</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="mb-2">Integridad</h4>
              <p className="text-gray-600 text-sm">Transparencia y honestidad</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}