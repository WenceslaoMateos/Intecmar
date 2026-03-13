'use client';

import { useState } from 'react';

export default function ExplorarPage() {
  // 1. Estados para el buscador y el filtro activo
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  // 2. Datos simulados unificados (Personas, Instituciones y Proyectos)
  const [directory] = useState([
    // PERSONAS
    { id: 'u1', type: 'persona', name: "Lucía Mendez", role: "Investigadora", location: "INTEMA", avatar: "LM" },
    { id: 'u2', type: 'persona', name: "Roberto Gomez", role: "Inversor Ángel", location: "Mar del Plata", avatar: "RG" },
    { id: 'u3', type: 'persona', name: "Sofía Clara", role: "Estudiante Avanzada", location: "FIE - UNMDP", avatar: "SC" },
    
    // INSTITUCIONES
    { id: 'i1', type: 'institucion', name: "Lab. Open Innovation", role: "Académica", location: "Campus Universitario", icon: "fa-flask" },
    { id: 'i2', type: 'institucion', name: "Cámara de Software", role: "Cámara", location: "Centro", icon: "fa-laptop-code" },
    
    // PROYECTOS (Agregados para que el filtro funcione)
    { id: 'p1', type: 'proyecto', name: "AgroTech Drones", role: "Agrotecnología", location: "Parque Industrial", icon: "fa-seedling" },
    { id: 'p2', type: 'proyecto', name: "EcoSustrato", role: "Biotecnología", location: "Puerto", icon: "fa-recycle" }
  ]);

  // 3. Lógica de Filtrado Inteligente
  const filteredResults = directory.filter(item => {
    // A. Filtro por botones (Tabs)
    const matchFilter = activeFilter === 'todos' || item.type === activeFilter;
    
    // B. Filtro por texto en el buscador (Nombre o Rol)
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchFilter && matchSearch;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden fade-in">
      
      {/* ========================================== */}
      {/* CABECERA Y BUSCADOR */}
      {/* ========================================== */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 font-heading mb-4">Explorar el Ecosistema</h2>
        
        {/* Input de Búsqueda */}
        <div className="flex gap-2 max-w-2xl">
          <div className="relative flex-grow">
            <i className="fas fa-search absolute left-4 top-3.5 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Buscar personas, instituciones o proyectos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-teal shadow-sm transition"
            />
          </div>
          <button className="bg-brand-teal text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-dark transition shadow-sm hidden sm:block shrink-0">
            Buscar
          </button>
        </div>

        {/* Filtros por Categoría */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setActiveFilter('todos')} 
            className={`px-4 py-2 rounded-full text-sm font-bold shadow transition shrink-0 ${activeFilter === 'todos' ? 'bg-brand-dark text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setActiveFilter('persona')} 
            className={`px-4 py-2 rounded-full text-sm font-bold shadow transition shrink-0 ${activeFilter === 'persona' ? 'bg-brand-dark text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}`}
          >
            Personas
          </button>
          <button 
            onClick={() => setActiveFilter('institucion')} 
            className={`px-4 py-2 rounded-full text-sm font-bold shadow transition shrink-0 ${activeFilter === 'institucion' ? 'bg-brand-dark text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}`}
          >
            Instituciones
          </button>
          <button 
            onClick={() => setActiveFilter('proyecto')} 
            className={`px-4 py-2 rounded-full text-sm font-bold shadow transition shrink-0 ${activeFilter === 'proyecto' ? 'bg-brand-dark text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}`}
          >
            Proyectos
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* GRILLA DE RESULTADOS */}
      {/* ========================================== */}
      <div className="p-6 bg-gray-100 min-h-[500px]">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 flex justify-between items-center">
          Resultados Destacados
          <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">{filteredResults.length} encontrados</span>
        </h3>
        
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            
            {filteredResults.map(item => (
              
              /* RENDERIZADO CONDICIONAL: Dependiendo del "type", mostramos un diseño distinto */
              <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition relative overflow-hidden group">
                
                {/* A. ESTILO PARA PERSONAS */}
                {item.type === 'persona' && (
                  <>
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-2xl mb-3 border-4 border-white shadow-sm">
                      {item.avatar}
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg leading-tight">{item.name}</h4>
                    <p className="text-sm text-brand-teal mb-1 mt-1 font-medium">{item.role}</p>
                    <p className="text-xs text-gray-400 mb-5"><i className="fas fa-map-marker-alt mr-1"></i> {item.location}</p>
                    <button className="mt-auto w-full border-2 border-brand-teal text-brand-teal rounded-full py-1.5 text-sm font-bold hover:bg-brand-teal hover:text-white transition">
                      Conectar
                    </button>
                  </>
                )}

                {/* B. ESTILO PARA INSTITUCIONES */}
                {item.type === 'institucion' && (
                  <>
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-magenta"></div>
                    <div className="w-16 h-16 bg-purple-50 rounded-lg flex items-center justify-center text-brand-magenta text-2xl mb-3 mt-2 shadow-inner">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg leading-tight">{item.name}</h4>
                    <p className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600 mb-2 mt-2 uppercase tracking-wider font-bold">{item.role}</p>
                    <p className="text-xs text-gray-400 mb-5"><i className="fas fa-map-marker-alt mr-1"></i> {item.location}</p>
                    <button className="mt-auto w-full bg-brand-dark text-white rounded-full py-1.5 text-sm font-bold hover:bg-gray-800 transition">
                      Seguir
                    </button>
                  </>
                )}

                {/* C. ESTILO PARA PROYECTOS */}
                {item.type === 'proyecto' && (
                  <>
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-teal"></div>
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-brand-teal text-2xl mb-3 mt-2 shadow-inner border border-blue-100">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg leading-tight">{item.name}</h4>
                    <p className="text-sm text-gray-500 mb-1 mt-1">{item.role}</p>
                    <p className="text-xs text-gray-400 mb-5"><i className="fas fa-map-marker-alt mr-1"></i> {item.location}</p>
                    <button className="mt-auto w-full bg-brand-teal text-white rounded-full py-1.5 text-sm font-bold hover:bg-brand-dark transition">
                      Ver Proyecto
                    </button>
                  </>
                )}
                
              </div>
            ))}
          </div>
        ) : (
          /* ESTADO VACÍO: Si la búsqueda no tiene resultados */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-3xl mb-4">
              <i className="fas fa-search"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-700">No encontramos resultados</h3>
            <p className="text-gray-500 max-w-sm mt-2">Prueba buscando con otros términos o cambia el filtro de categoría.</p>
            <button 
              onClick={() => { setSearchTerm(''); setActiveFilter('todos'); }}
              className="mt-6 text-brand-teal font-bold hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

    </div>
  );
}