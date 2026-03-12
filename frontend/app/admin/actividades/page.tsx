'use client';

import { useState } from 'react';

export default function ActividadesPage() {
  
  // 1. Datos simulados de las actividades (ahora con setActivities para poder modificarlas)
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "Convocatoria",
      title: "Premios Emprender 2026",
      desc: "Convocatoria para proyectos de base tecnológica.",
      dateLabel: "Cierra",
      date: "30/03/2026",
      status: "Abierta",
      statusColor: "bg-green-100 text-green-700",
      icon: "fa-trophy",
      iconColor: "text-brand-magenta",
      iconBg: "bg-purple-100"
    },
    {
      id: 2,
      type: "Capacitación",
      title: "Curso: Modelo de Negocios Canvas",
      desc: "Capacitación virtual para emprendedores iniciales.",
      dateLabel: "Fecha",
      date: "15/04/2026",
      status: "Programada",
      statusColor: "bg-blue-100 text-blue-700",
      icon: "fa-chalkboard-teacher",
      iconColor: "text-brand-teal",
      iconBg: "bg-blue-100"
    },
    {
      id: 3,
      type: "Capacitación",
      title: "Taller de Pitch para Inversores",
      desc: "Aprende a presentar tu idea de forma efectiva en 3 minutos.",
      dateLabel: "Fecha",
      date: "22/04/2026",
      status: "Finalizada",
      statusColor: "bg-gray-100 text-gray-600",
      icon: "fa-microphone",
      iconColor: "text-gray-500",
      iconBg: "bg-gray-100"
    },
    {
      id: 4,
      type: "Convocatoria",
      title: "Fondo Semilla Intecmar",
      desc: "Aportes no reembolsables para prototipado de productos.",
      dateLabel: "Cierra",
      date: "10/05/2026",
      status: "Próximamente",
      statusColor: "bg-brand-warning/20 text-brand-warning",
      icon: "fa-seedling",
      iconColor: "text-brand-warning",
      iconBg: "bg-yellow-50"
    }
  ]);

  // 2. Estados para los filtros y modales
  const [activeTab, setActiveTab] = useState('Todas');
  
  // Estado para el Modal de Ver Detalles
  const [viewingActivity, setViewingActivity] = useState<any | null>(null);
  
  // Estados para el Modal del Formulario (Crear/Editar)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<any | null>(null);

  // 3. Lógica de filtrado
  const filteredActivities = activities.filter(act => {
    if (activeTab === 'Todas') return true;
    if (activeTab === 'Convocatorias') return act.type === 'Convocatoria';
    if (activeTab === 'Capacitaciones') return act.type === 'Capacitación';
    return true;
  });

  // Funciones para manejar los modales
  const handleCreateNew = () => {
    setEditingActivity(null); 
    setIsFormOpen(true);
  };

  const handleEdit = (act: any) => {
    setEditingActivity(act); 
    setIsFormOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    alert('En la Fase 2, esto guardará los datos en la base de datos de Nest.js.');
    setIsFormOpen(false); 
  };

  return (
    <div className="fade-in relative">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 relative z-10">
        
        {/* Cabecera y Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
            <button 
              onClick={() => setActiveTab('Todas')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${
                activeTab === 'Todas' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Todas
            </button>
            <button 
              onClick={() => setActiveTab('Convocatorias')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${
                activeTab === 'Convocatorias' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Convocatorias
            </button>
            <button 
              onClick={() => setActiveTab('Capacitaciones')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${
                activeTab === 'Capacitaciones' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Capacitaciones
            </button>
          </div>

          <button 
            onClick={handleCreateNew}
            className="bg-brand-magenta text-white px-5 py-2.5 rounded-lg hover:bg-purple-800 transition shadow-md flex items-center gap-2 text-sm font-bold shrink-0"
          >
            <i className="fas fa-plus"></i> Crear Actividad
          </button>
        </div>

        {/* Lista de Actividades */}
        <div className="space-y-4">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((act) => (
              <div key={act.id} className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-50 hover:shadow-sm transition duration-300 gap-4 group">
                
                <div className="flex items-start sm:items-center gap-4">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${act.iconBg} ${act.iconColor}`}>
                    <i className={`fas ${act.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg group-hover:text-brand-teal transition">{act.title}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{act.desc}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-medium text-gray-500">
                      <span className="flex items-center">
                        <i className="far fa-calendar text-gray-400 mr-1.5"></i> 
                        {act.dateLabel}: {act.date}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full border border-white/50 ${act.statusColor}`}>
                        {act.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto justify-end border-t sm:border-0 border-gray-100 pt-3 sm:pt-0 mt-2 sm:mt-0">
                  <button 
                    onClick={() => setViewingActivity(act)}
                    className="p-2.5 text-gray-400 hover:text-brand-magenta hover:bg-purple-50 transition rounded-lg border border-transparent hover:border-purple-100" 
                    title="Ver Detalles"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button 
                    onClick={() => handleEdit(act)}
                    className="p-2.5 text-gray-400 hover:text-brand-teal hover:bg-blue-50 transition rounded-lg border border-transparent hover:border-blue-100" 
                    title="Editar"
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                  <button 
                    onClick={() => alert(`Viendo lista de inscriptos para: ${act.title}`)}
                    className="p-2.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition rounded-lg border border-transparent hover:border-gray-200" 
                    title="Ver Inscriptos"
                  >
                    <i className="fas fa-users"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
              <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400 text-2xl">
                <i className="fas fa-folder-open"></i>
              </div>
              <p className="text-gray-500 font-medium">No hay actividades en esta categoría.</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: VER DETALLES DE LA ACTIVIDAD */}
      {viewingActivity && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm fade-in"
          onClick={() => setViewingActivity(null)}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={() => setViewingActivity(null)} 
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:text-gray-800 transition"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="text-center mb-6 pt-2">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl shadow-inner ${viewingActivity.iconBg} ${viewingActivity.iconColor}`}>
                <i className={`fas ${viewingActivity.icon}`}></i>
              </div>
              <h3 className="text-2xl font-bold font-heading text-gray-800">{viewingActivity.title}</h3>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                  {viewingActivity.type}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full border border-white/50 ${viewingActivity.statusColor}`}>
                  {viewingActivity.status}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 mb-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {viewingActivity.desc}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <i className="far fa-calendar-alt w-5 text-gray-400"></i>
                <span className="font-bold mr-1">{viewingActivity.dateLabel}:</span> {viewingActivity.date}
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <i className="fas fa-users w-5 text-gray-400"></i>
                <span className="font-bold mr-1">Inscriptos actuales:</span> 42 usuarios
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setViewingActivity(null)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition"
              >
                Cerrar
              </button>
              <button 
                onClick={() => {
                  setViewingActivity(null); 
                  handleEdit(viewingActivity); 
                }}
                className="px-6 py-2.5 bg-brand-teal text-white text-sm font-bold rounded-lg hover:bg-brand-dark transition shadow-md"
              >
                <i className="fas fa-pen mr-2"></i> Editar Actividad
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: FORMULARIO DE CREAR/EDITAR ACTIVIDAD */}
      {isFormOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm fade-in"
          onClick={() => setIsFormOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsFormOpen(false)} 
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:text-gray-800 transition"
            >
              <i className="fas fa-times"></i>
            </button>

            <h3 className="text-2xl font-bold font-heading text-gray-800 mb-6">
              {editingActivity ? 'Editar Actividad' : 'Nueva Actividad'}
            </h3>

            <form onSubmit={handleSaveForm}>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Título de la actividad</label>
                <input 
                  type="text" 
                  defaultValue={editingActivity?.title || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent" 
                  placeholder="Ej: Taller de finanzas..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Tipo</label>
                  <select 
                    defaultValue={editingActivity?.type || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    required
                  >
                    <option value="" disabled>Seleccionar...</option>
                    <option value="Convocatoria">Convocatoria</option>
                    <option value="Capacitación">Capacitación</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                  <select 
                    defaultValue={editingActivity?.status || 'Próximamente'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  >
                    <option value="Abierta">Abierta / Activa</option>
                    <option value="Programada">Programada</option>
                    <option value="Próximamente">Próximamente</option>
                    <option value="Finalizada">Finalizada / Cerrada</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                <textarea 
                  defaultValue={editingActivity?.desc || ''}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal resize-none" 
                  placeholder="Describe brevemente el objetivo y a quién está dirigido..."
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Etiqueta de Fecha</label>
                  <input 
                    type="text" 
                    defaultValue={editingActivity?.dateLabel || 'Fecha'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal" 
                    placeholder="Ej: Cierra, Fecha, Inicia..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Fecha</label>
                  <input 
                    type="text" 
                    defaultValue={editingActivity?.date || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal" 
                    placeholder="DD/MM/YYYY"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-brand-magenta text-white text-sm font-bold rounded-lg hover:bg-purple-800 transition shadow-md"
                >
                  {editingActivity ? 'Guardar Cambios' : 'Crear Actividad'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}