'use client';

import { useState } from 'react';

export default function ProyectosPage() {
  
  // 1. Datos simulados de proyectos (Incluyendo datos "privados" para el Admin)
  const [projects] = useState([
    {
      id: 1,
      title: "EcoSustrato",
      founder: "Juan Pérez",
      category: "Biotecnología",
      status: "Incubación",
      statusColor: "bg-blue-100 text-blue-700",
      progress: 45,
      publicDesc: "Desarrollo de sustratos ecológicos a partir de residuos de la industria cervecera local.",
      privateData: {
        phone: "+54 9 223 555-0101",
        budget: "$ 500.000 ARS",
        address: "Parque Industrial Gral. Savio, Nave 4",
        notes: "Requiere vinculación urgente con laboratorios de la UNMDP."
      },
      date: "10/01/2026"
    },
    {
      id: 2,
      title: "App Deporte Local",
      founder: "Marta López",
      category: "Software",
      status: "Activo",
      statusColor: "bg-green-100 text-green-700",
      progress: 100,
      publicDesc: "Plataforma móvil para conectar deportistas amateurs y organizar partidos en la ciudad.",
      privateData: {
        phone: "+54 9 223 555-0102",
        budget: "$ 1.200.000 ARS",
        address: "Espacio Coworking Centro, Of. 12",
        notes: "Buscando ronda de inversión semilla para expansión regional."
      },
      date: "15/11/2025"
    },
    {
      id: 3,
      title: "Drones Agro",
      founder: "Carlos Ruiz",
      category: "Agrotech",
      status: "Pendiente",
      statusColor: "bg-brand-warning/20 text-brand-warning",
      progress: 15,
      publicDesc: "Uso de drones económicos para mapeo de cultivos en pequeños productores.",
      privateData: {
        phone: "+54 9 223 555-0103",
        budget: "$ 250.000 ARS",
        address: "Ruta 226, Km 14",
        notes: "Falta validar la documentación legal de la empresa."
      },
      date: "28/02/2026"
    },
    {
      id: 4,
      title: "ReciclaTextil",
      founder: "Ana Silva",
      category: "Economía Circular",
      status: "Suspendido",
      statusColor: "bg-gray-100 text-gray-600",
      progress: 60,
      publicDesc: "Recuperación de descartes textiles para fabricación de aislantes térmicos.",
      privateData: {
        phone: "+54 9 223 555-0104",
        budget: "$ 0 ARS (Fondos congelados)",
        address: "Puerto, Manzana 3",
        notes: "Proyecto suspendido por falta de presentación de informes trimestrales."
      },
      date: "05/09/2025"
    }
  ]);

  // 2. Estados para filtros y modal
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [viewingProject, setViewingProject] = useState<any | null>(null);

  // 3. Lógica de filtrado
  const filteredProjects = projects.filter(proj => {
    const matchesSearch = proj.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          proj.founder.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'Todos' || proj.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fade-in relative">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative z-10">
        
        {/* Banner Informativo Superior */}
        <div className="bg-gradient-to-r from-brand-dark to-brand-teal p-6 text-white flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-heading mb-1">Supervisión Global de Proyectos</h3>
            <p className="text-sm text-gray-200 opacity-90 max-w-2xl">
              Nivel de acceso: <strong className="text-brand-magenta bg-white/10 px-2 py-0.5 rounded">Administrador</strong>. 
              En esta vista puedes visualizar toda la información pública y privada de los proyectos sin necesidad de solicitar permisos.
            </p>
          </div>
          <div className="hidden lg:flex w-14 h-14 bg-white/10 rounded-full items-center justify-center text-2xl border border-white/20">
            <i className="fas fa-rocket"></i>
          </div>
        </div>

        {/* Buscador y Filtros */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Buscar por nombre de proyecto o fundador..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal transition shadow-sm"
            />
          </div>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none focus:border-brand-teal shadow-sm min-w-[160px]"
          >
            <option value="Todos">Todos los estados</option>
            <option value="Incubación">Incubación</option>
            <option value="Activo">Activo</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Suspendido">Suspendido</option>
          </select>
        </div>

        {/* Tabla de Proyectos */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Proyecto</th>
                <th className="px-6 py-4">Fundador</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Progreso / Estado</th>
                <th className="px-6 py-4 text-center">Reporte</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map(proj => (
                  <tr key={proj.id} className="bg-white border-b border-gray-50 hover:bg-gray-50/80 transition">
                    
                    {/* Proyecto */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 text-base">{proj.title}</div>
                      <div className="text-xs text-gray-400 mt-1 line-clamp-1 max-w-[200px]" title={proj.publicDesc}>
                        {proj.publicDesc}
                      </div>
                    </td>

                    {/* Fundador */}
                    <td className="px-6 py-4 font-medium text-brand-teal">
                      <i className="far fa-user-circle mr-1"></i> {proj.founder}
                    </td>

                    {/* Categoría */}
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded text-xs border border-gray-200">
                        {proj.category}
                      </span>
                    </td>

                    {/* Progreso y Estado */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/50 ${proj.statusColor}`}>
                          {proj.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-brand-teal h-1.5 rounded-full" 
                          style={{ width: `${proj.progress}%` }}
                        ></div>
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setViewingProject(proj)}
                        className="p-2 text-white bg-brand-dark hover:bg-gray-800 transition rounded-lg shadow-sm font-bold text-xs px-3 py-1.5 flex items-center gap-2 mx-auto"
                      >
                        <i className="fas fa-lock-open text-brand-magenta"></i> Ver Completo
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300 text-2xl">
                      <i className="fas fa-folder-open"></i>
                    </div>
                    <p className="text-gray-500 font-medium">No se encontraron proyectos</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* ================================================================================= */}
      {/* MODAL: VER DETALLES PRIVADOS DEL PROYECTO */}
      {/* ================================================================================= */}
      {viewingProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm fade-in"
          onClick={() => setViewingProject(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal - Estilo Advertencia */}
            <div className="bg-brand-dark p-6 border-b-4 border-brand-magenta text-white relative shrink-0">
              <button 
                onClick={() => setViewingProject(null)} 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition"
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="flex items-center gap-3 mb-2">
                <i className="fas fa-user-shield text-brand-magenta text-2xl"></i>
                <h3 className="text-xs uppercase tracking-widest font-bold text-gray-300">Reporte de Administrador</h3>
              </div>
              <h2 className="text-3xl font-bold font-heading">{viewingProject.title}</h2>
              <p className="text-gray-300 text-sm mt-1">Fundado por {viewingProject.founder} • Ingresó el {viewingProject.date}</p>
            </div>

            {/* Contenido Scrolleable */}
            <div className="p-6 overflow-y-auto">
              
              {/* Sección: Info Pública */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-800 text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                  <i className="fas fa-globe text-gray-400"></i> Información Pública
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{viewingProject.publicDesc}</p>
                  <div className="flex gap-4 text-sm">
                    <span className="bg-white border border-gray-200 px-3 py-1 rounded text-gray-600">
                      <strong>Categoría:</strong> {viewingProject.category}
                    </span>
                    <span className="bg-white border border-gray-200 px-3 py-1 rounded text-gray-600">
                      <strong>Estado:</strong> {viewingProject.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sección: Info Privada (Resaltada) */}
              <div>
                <h4 className="font-bold text-brand-dark text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                  <i className="fas fa-lock text-brand-magenta"></i> Datos Privados (Solo Admin/Asignados)
                </h4>
                <div className="bg-red-50/30 p-4 rounded-lg border border-red-100/50">
                  <ul className="space-y-4 text-sm">
                    
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-brand-teal shadow-sm shrink-0 border border-gray-100">
                        <i className="fas fa-phone-alt"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Teléfono de Contacto</p>
                        <p className="text-gray-800 font-medium">{viewingProject.privateData.phone}</p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-brand-success shadow-sm shrink-0 border border-gray-100">
                        <i className="fas fa-money-bill-wave"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Presupuesto / Financiamiento Declarado</p>
                        <p className="text-gray-800 font-medium">{viewingProject.privateData.budget}</p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-brand-warning shadow-sm shrink-0 border border-gray-100">
                        <i className="fas fa-map-marked-alt"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Dirección Operativa</p>
                        <p className="text-gray-800 font-medium">{viewingProject.privateData.address}</p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-brand-magenta shadow-sm shrink-0 border border-gray-100">
                        <i className="fas fa-clipboard-list"></i>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Notas de Reporte Interno</p>
                        <p className="text-gray-800 font-medium bg-white p-2 border border-gray-200 rounded mt-1">
                          {viewingProject.privateData.notes}
                        </p>
                      </div>
                    </li>

                  </ul>
                </div>
              </div>

            </div>
            
            {/* Botones del Modal */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setViewingProject(null)}
                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-100 transition"
              >
                Cerrar Reporte
              </button>
              <button 
                onClick={() => alert(`Generando reporte confidencial en PDF para ${viewingProject.title}...`)}
                className="px-6 py-2.5 bg-brand-dark text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition shadow-md flex items-center gap-2"
              >
                <i className="fas fa-file-pdf text-brand-magenta"></i> Exportar Ficha
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}