export default function NosotrosPage() {
  
  // Arreglo temporal para simular los 10 logos de instituciones de la red
  const institucionesMock = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="bg-white py-16 fade-in">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 font-heading">Nuestra Identidad</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Somos un ecosistema colaborativo que busca fortalecer la matriz productiva de la región a través de la innovación, la tecnología y el espíritu emprendedor.
          </p>
        </div>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-50 p-10 rounded-2xl border-l-4 border-brand-teal shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4 text-brand-dark font-heading">Nuestra Misión</h3>
            <p className="text-gray-600">
              Fomentar la cultura emprendedora y facilitar herramientas para la creación y consolidación de empresas de base tecnológica y social.
            </p>
          </div>
          <div className="bg-gray-50 p-10 rounded-2xl border-l-4 border-brand-magenta shadow-sm hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4 text-brand-dark font-heading">Nuestra Visión</h3>
            <p className="text-gray-600">
              Ser el referente regional en articulación público-privada para el desarrollo económico sustentable.
            </p>
          </div>
        </div>

        {/* Red de Instituciones */}
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800 font-heading">
          Instituciones de la Red
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Mapeamos el arreglo para generar los 10 logos simulados */}
          {institucionesMock.map((i) => (
            <div key={i} className="flex flex-col items-center group cursor-pointer">
              <div className="w-full aspect-square bg-white border border-gray-200 rounded-xl flex items-center justify-center p-6 grayscale group-hover:grayscale-0 transition duration-300 shadow-sm hover:shadow-md">
                <div className="text-center">
                  <i className="fas fa-building text-4xl text-gray-300 group-hover:text-brand-teal mb-2 transition"></i>
                  <span className="block font-bold text-gray-700 text-sm">Institución {i}</span>
                </div>
              </div>
              <p className="text-xs text-center mt-2 text-gray-500 opacity-0 group-hover:opacity-100 transition duration-300">
                Sector Productivo
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}