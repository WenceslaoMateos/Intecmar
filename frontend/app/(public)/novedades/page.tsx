import Link from 'next/link';

// Estos datos simulados (mock) luego vendrán desde base de datos MySQL a través de Nest.js
const noticiasMock = [
  {
    id: 1,
    tipo: 'Convocatoria',
    colorTipo: 'bg-brand-magenta',
    fecha: '18 Oct 2026',
    titulo: 'Abierta la inscripción para "Emprender 2026"',
    resumen: 'Si tienes una idea de negocio o un proyecto en marcha, no te pierdas esta oportunidad de recibir mentoría especializada y fondos semilla.',
    imagen: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    id: 2,
    tipo: 'Noticia',
    colorTipo: 'bg-blue-500',
    fecha: '15 Oct 2026',
    titulo: 'Nueva alianza estratégica con Universidades',
    resumen: 'Firmamos un convenio marco para facilitar el acceso de estudiantes a pasantías en empresas de la red.',
    imagen: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    id: 3,
    tipo: 'Capacitación',
    colorTipo: 'bg-green-500',
    fecha: '10 Oct 2026',
    titulo: 'Taller de Marketing Digital para PyMES',
    resumen: 'Aprende a gestionar las redes sociales de tu emprendimiento con herramientas profesionales. Cupos limitados.',
    imagen: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '#'
  }
];

export default function NovedadesPage() {
  return (
    <div className="bg-gray-50 py-12 min-h-screen fade-in">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Cabecera y Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 font-heading">Novedades y Actividades</h2>
            <p className="text-gray-500 mt-2">Mantente al día con lo que sucede en el ecosistema.</p>
          </div>
          
          {/* Botones de Filtro (Visuales por ahora) */}
          <div className="flex gap-2 flex-wrap">
            <button className="px-4 py-2 bg-brand-teal text-white rounded-full text-sm font-semibold transition shadow-sm hover:bg-brand-dark">
              Todo
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 rounded-full text-sm font-semibold transition">
              Noticias
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 rounded-full text-sm font-semibold transition">
              Convocatorias
            </button>
          </div>
        </div>

        {/* Grilla de Noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Mapeamos el arreglo de noticiasMock para generar las tarjetas */}
          {noticiasMock.map((noticia) => (
            <article 
              key={noticia.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full group"
            >
              {/* Imagen y Etiqueta */}
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img 
                  src={noticia.imagen} 
                  alt={noticia.titulo} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <span className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm ${noticia.colorTipo}`}>
                  {noticia.tipo}
                </span>
              </div>
              
              {/* Contenido de la Tarjeta */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="text-gray-400 text-xs mb-2">
                  <i className="far fa-calendar-alt mr-1"></i> {noticia.fecha}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-brand-teal cursor-pointer transition">
                  {noticia.titulo}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {noticia.resumen}
                </p>
                
                {/* Botón Leer Más que empuja siempre hacia abajo (mt-auto) */}
                <Link href={noticia.link} className="mt-auto text-brand-teal font-bold text-sm hover:underline flex items-center group-hover:text-brand-dark">
                  Leer más 
                  <i className="fas fa-arrow-right ml-1 transform group-hover:translate-x-1 transition"></i>
                </Link>
              </div>
            </article>
          ))}

        </div>

        {/* Botón Cargar Más */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-transparent border-2 border-brand-teal text-brand-teal font-bold rounded-full hover:bg-brand-teal hover:text-white transition shadow-sm">
            Cargar más noticias
          </button>
        </div>

      </div>
    </div>
  );
}