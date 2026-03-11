import Link from 'next/link';

export default function PaginaInicio() {
  return (
    <>
      {/* HERO SECTION */}
      <section 
        className="relative h-[600px] flex items-center text-white"
        style={{
          background: "linear-gradient(135deg, rgba(15,60,76,0.95) 0%, rgba(26,107,125,0.8) 50%, rgba(160,32,240,0.4) 100%), url('https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-sm mb-4 bg-white/10 backdrop-blur-sm">
              Red de Innovación
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 font-heading">
              CONECTANDO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">COMUNIDAD</span> Y <br />
              TECNOLOGÍA
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-gray-200 max-w-lg">
              Para impulsar la innovación y emprendimientos del futuro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/registro" 
                className="px-8 py-4 bg-white text-[#1a6b7d] text-center font-bold rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1"
              >
                Unirme a la Red
              </Link>
              <Link 
                href="/nosotros" 
                className="px-8 py-4 border-2 border-white text-white text-center font-bold rounded-lg hover:bg-white hover:text-[#0f3c4c] transition"
              >
                Conocer más
              </Link>
            </div>
          </div>

          {/* Imagen decorativa derecha (SVG Abstracto) */}
          <div className="hidden lg:block relative">
            <svg className="w-full h-auto opacity-50" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#A020F0" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,31.4C59,41.3,47.1,48.2,35.5,55.9C23.9,63.6,12.6,72.1,-0.6,73.1C-13.8,74.1,-29.4,67.6,-42.9,59.3C-56.4,51,-67.8,40.9,-75.6,28.3C-83.4,15.7,-87.6,0.6,-84.3,-12.9C-81,-26.4,-70.2,-38.3,-58.4,-46.6C-46.6,-54.9,-33.8,-59.6,-21.3,-68.2C-8.8,-76.8,3.4,-89.3,16.8,-90.4C30.2,-91.5,44.7,-81.2,44.7,-76.4Z" transform="translate(100 100) scale(1.1)" />
            </svg>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
          </svg>
        </div>
      </section>

      {/* QUE HACEMOS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Qué ofrecemos?</h2>
            <div className="w-24 h-1 bg-[#1a6b7d] mx-auto rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition hover:-translate-y-2 group cursor-pointer border border-gray-100">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#1a6b7d] transition">
                <i className="fas fa-chalkboard-teacher text-2xl text-[#1a6b7d] group-hover:text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Capacitaciones</h3>
              <p className="text-gray-600">Accede a cursos, talleres y seminarios diseñados para potenciar tus habilidades emprendedoras.</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition hover:-translate-y-2 group cursor-pointer border border-gray-100">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#a020f0] transition">
                <i className="fas fa-network-wired text-2xl text-[#a020f0] group-hover:text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Vinculaciones</h3>
              <p className="text-gray-600">Conectamos emprendedores con instituciones, inversores y el sector productivo local.</p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition hover:-translate-y-2 group cursor-pointer border border-gray-100">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 transition">
                <i className="fas fa-lightbulb text-2xl text-green-600 group-hover:text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Incubación</h3>
              <p className="text-gray-600">Asistencia técnica y acompañamiento para transformar tu idea en un negocio rentable.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}