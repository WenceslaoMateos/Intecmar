import Link from 'next/link';

// Mismo mock data (En la Fase 2, acá llamaremos a Nest.js usando el "id" de la URL para traer la info real)
const noticiasMock = [
  {
    id: 1,
    tipo: 'Convocatoria',
    colorTipo: 'bg-brand-magenta',
    fecha: '18 Oct 2026',
    titulo: 'Abierta la inscripción para "Emprender 2026"',
    contenidoBreve: 'Si tienes una idea de negocio o un proyecto en marcha, no te pierdas esta oportunidad de recibir mentoría especializada y fondos semilla.',
    contenidoLargo: 'El programa Emprender 2026 busca identificar, potenciar y financiar las mejores ideas de la región. Durante 3 meses, los equipos seleccionados recibirán capacitaciones intensivas en modelo de negocios, marketing, finanzas y pitch. Al finalizar, presentarán sus proyectos ante un panel de inversores reales con la posibilidad de acceder a un Fondo Semilla no reembolsable.\n\nRequisitos para participar:\n- Ser mayor de 18 años.\n- Residir en Mar del Plata o zona de influencia.\n- Tener una idea de base tecnológica, impacto social o economía circular.',
    imagen: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    organizador: 'Incubadora UNMDP',
    modalidad: 'Presencial / Híbrida',
    cierreInscripcion: '30 de Octubre, 2026'
  },
];

export default async function DetalleNovedadPage({ params }: { params: Promise<{ id: string }> }) {
  // En Next 15, params es una promesa. La resolvemos para obtener el ID de la URL
  const resolvedParams = await params;
  
  // Simulamos buscar la noticia en la base de datos (por ahora agarramos la primera)
  // En el futuro será algo como: const noticia = await fetch(`/api/noticias/${resolvedParams.id}`)
  const noticia = noticiasMock[0]; 

  return (
    <div className="bg-white min-h-screen pb-20 fade-in">
      
      {/* HERO HEADER (Imagen Grande arriba del todo) */}
      <div className="relative w-full h-[35vh] min-h-[250px] bg-gray-900">
        <img 
          src={noticia.imagen} 
          alt={noticia.titulo} 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        {/* Breadcrumb / Volver */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/novedades" className="text-white hover:text-brand-teal transition font-medium flex items-center bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm text-sm">
            <i className="fas fa-arrow-left mr-2"></i> Volver
          </Link>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL (Una sola columna, centrado) */}
      <div className="container mx-auto px-6 max-w-4xl mt-12">
        
        {/* Título de la actividad */}
        <div className="text-center mb-10">
          <span className={`inline-block text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm mb-4 ${noticia.colorTipo}`}>
            {noticia.tipo}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 font-heading leading-tight">
            {noticia.titulo}
          </h1>
        </div>

        {/* Zona de Botones */}
        <div className="flex flex-col items-center justify-center gap-8 mb-16 bg-gray-50 py-10 rounded-2xl border border-gray-100">
          
          {/* Botón Principal de Inscripción */}
          <div className="text-center">
            <p className="text-gray-600 font-medium mb-3 text-sm">¡Asegurá tu lugar en esta actividad!</p>
            <Link 
              href="/registro"
              className="inline-block bg-brand-teal text-white font-bold py-3 px-10 rounded-full hover:bg-brand-dark transition shadow-md transform active:scale-95 text-lg"
            >
              Inscribite
            </Link>
          </div>

          {/* Acá podrías agregar más botones en el futuro si la actividad ya pasó 
              (como el "Resultados" o "Link de transmisión" de tu foto) */}
          {/* <div className="text-center mt-4">
             <p className="text-gray-600 font-medium mb-3 text-sm">¡Conocé a los ganadores de la 3° edición!</p>
             <button className="inline-block bg-brand-teal text-white font-bold py-2 px-6 rounded-full hover:bg-brand-dark transition">Resultados</button>
          </div> 
          */}

        </div>

        {/* Cuerpo del Artículo */}
        <div className="prose prose-lg text-gray-700 max-w-none">
          
          {/* Subtítulo o Bajada */}
          <p className="text-xl italic font-medium text-gray-600 mb-8">
            {noticia.contenidoBreve}
          </p>
          
          {/* Párrafos principales */}
          <p className="whitespace-pre-line leading-relaxed mb-12">
            {noticia.contenidoLargo}
          </p>

          {/* Bloque de Detalles Finales (Fecha, Hora, Lugar) */}
          <div className="border-t border-gray-200 pt-8 mt-12">
            <h3 className="font-bold text-xl text-gray-800 font-heading mb-6">
              Detalles del Evento
            </h3>
            <ul className="space-y-4 text-base text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100">
              <li className="flex items-start">
                <i className="far fa-calendar-alt text-brand-teal mt-1 mr-3 w-5 text-lg"></i>
                <div>
                  <span className="font-bold">Fecha de cierre / Realización:</span> {noticia.fecha}
                </div>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-brand-teal mt-1 mr-3 w-5 text-lg"></i>
                <div>
                  <span className="font-bold">Modalidad / Lugar:</span> {noticia.modalidad}
                </div>
              </li>
              <li className="flex items-start">
                <i className="fas fa-building text-brand-teal mt-1 mr-3 w-5 text-lg"></i>
                <div>
                  <span className="font-bold">Organiza:</span> {noticia.organizador}
                </div>
              </li>
            </ul>
          </div>

          {/* Compartir en redes */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Compartir:</span>
            <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-brand-teal hover:text-white transition flex items-center justify-center">
              <i className="fab fa-linkedin-in"></i>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-green-500 hover:text-white transition flex items-center justify-center">
              <i className="fab fa-whatsapp"></i>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}