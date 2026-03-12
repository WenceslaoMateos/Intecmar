'use client';

import { useState } from 'react';

export default function InstitucionesPage() {
  
  // Estado con datos de prueba genéricos pero MÁS COMPLETOS para el modal
  const [institutions, setInstitutions] = useState([
    { 
      id: 1, 
      name: "Institución 1", 
      type: "Sector Académico", 
      icon: "fa-university",
      desc: "Entidad dedicada a la formación académica superior y a la investigación aplicada en el área tecnológica de la región.",
      email: "contacto@institucion1.edu.ar",
      phone: "+54 223 456 7890",
      members: 145,
      date: "12/01/2026"
    },
    { 
      id: 2, 
      name: "Institución 2", 
      type: "Investigación", 
      icon: "fa-flask",
      desc: "Centro de desarrollo enfocado en biotecnología y materiales avanzados para el sector productivo.",
      email: "info@institucion2.gov.ar",
      phone: "+54 223 456 7891",
      members: 32,
      date: "05/02/2026"
    },
    { 
      id: 3, 
      name: "Institución 3", 
      type: "Asociación", 
      icon: "fa-network-wired",
      desc: "Asociación civil que nuclea a las empresas del sector del software y servicios informáticos.",
      email: "socios@institucion3.org",
      phone: "+54 223 456 7892",
      members: 89,
      date: "20/02/2026"
    },
    { 
      id: 4, 
      name: "Institución 4", 
      type: "Sector Productivo", 
      icon: "fa-industry",
      desc: "Consorcio de empresas manufactureras enfocadas en la transición hacia la industria 4.0.",
      email: "gerencia@institucion4.com.ar",
      phone: "+54 223 456 7893",
      members: 12,
      date: "01/03/2026"
    },
    { 
      id: 5, 
      name: "Institución 5", 
      type: "Cámara", 
      icon: "fa-building",
      desc: "Cámara empresaria que defiende los intereses del sector comercial y fomenta el emprendedurismo.",
      email: "camara@institucion5.com",
      phone: "+54 223 456 7894",
      members: 250,
      date: "15/03/2026"
    },
  ]);

  // NUEVO: Estado para controlar qué institución se muestra en el modal (null = cerrado)
  const [selectedInstitution, setSelectedInstitution] = useState<any | null>(null);

  // Funciones simuladas
  const handleCreate = () => {
    alert('En la Fase 2, esto abrirá un formulario modal para cargar el logo, nombre y descripción de la nueva institución.');
  };

  const handleEdit = (name: string) => {
    alert(`Abriendo el editor para: ${name}`);
  };

  const handleDelete = (name: string, id: number) => {
    if (confirm(`¿Estás completamente seguro de que deseas eliminar a "${name}" de la red? Esta acción no se puede deshacer.`)) {
      setInstitutions(institutions.filter(inst => inst.id !== id));
      // Si el modal de esta institución estaba abierto y se elimina, lo cerramos
      if (selectedInstitution && selectedInstitution.id === id) {
        setSelectedInstitution(null);
      }
    }
  };

  return (
    <div className="fade-in relative">
      
      {/* Cabecera y botón de acción */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <p className="text-gray-600 max-w-2xl">
          Administra las entidades que forman parte del ecosistema. Recuerda que solo el Administrador puede crear o eliminar instituciones públicas.
        </p>
        <button 
          onClick={handleCreate}
          className="bg-brand-teal text-white px-5 py-2.5 rounded-lg hover:bg-brand-dark transition shadow-md flex items-center gap-2 font-bold text-sm shrink-0"
        >
          <i className="fas fa-plus"></i> Nueva Institución
        </button>
      </div>
      
      {/* Grilla de Instituciones */}
      {institutions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutions.map(inst => (
            <div key={inst.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col h-full relative group justify-between hover:shadow-md transition duration-300">
              
              {/* Botones de acción (Aparecen al hacer hover) */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300 bg-white/90 px-2 py-1 rounded-lg backdrop-blur-sm shadow-sm border border-gray-100">
                {/* NUEVO BOTÓN: Ver Detalles (Ojito) */}
                <button 
                  onClick={() => setSelectedInstitution(inst)}
                  className="text-gray-400 hover:text-brand-magenta mx-1.5 transition"
                  title="Ver Detalles"
                >
                  <i className="fas fa-eye"></i>
                </button>
                <button 
                  onClick={() => handleEdit(inst.name)}
                  className="text-gray-400 hover:text-brand-teal mx-1.5 transition"
                  title="Editar Institución"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleDelete(inst.name, inst.id)}
                  className="text-gray-400 hover:text-brand-danger mx-1.5 transition"
                  title="Eliminar Institución"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
              
              {/* Contenido de la tarjeta */}
              <div>
                <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center mb-4 text-gray-400 group-hover:text-brand-teal group-hover:bg-blue-50 transition">
                  <i className={`fas ${inst.icon} text-2xl`}></i>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight pr-12">{inst.name}</h3>
                <span className="bg-blue-50 text-brand-teal text-xs px-3 py-1 rounded-full w-max mb-4 inline-block font-medium border border-blue-100">
                  {inst.type}
                </span>
              </div>

              {/* Pie de tarjeta */}
              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
                <span><i className="fas fa-users mr-1"></i> {inst.members} miembros</span>
                <span>ID: #{inst.id.toString().padStart(4, '0')}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ESTADO VACÍO: Si eliminas todas las instituciones */
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300 text-3xl">
            <i className="fas fa-building-circle-xmark"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">No hay instituciones</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">Actualmente no hay ninguna institución registrada en la red. Haz clic en el botón superior para agregar la primera.</p>
          <button 
            onClick={handleCreate}
            className="text-brand-teal font-bold hover:underline"
          >
            Crear nueva institución ahora
          </button>
        </div>
      )}

      {/* NUEVO: VENTANA MODAL DE DETALLES */}
      {selectedInstitution && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm fade-in"
          onClick={() => setSelectedInstitution(null)} // Cierra al hacer clic afuera
        >
          {/* Contenedor principal del modal */}
          <div 
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative transform transition-all flex flex-col max-h-[90vh]" 
            onClick={(e) => e.stopPropagation()} // Evita que el clic adentro cierre el modal
          >
            {/* Botón X superior */}
            <button 
              onClick={() => setSelectedInstitution(null)} 
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="overflow-y-auto pr-2">
              {/* Encabezado del Modal (Logo + Nombre) */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 border-b border-gray-100 pb-6 text-center sm:text-left mt-2">
                <div className="w-24 h-24 shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl flex items-center justify-center text-brand-teal text-4xl shadow-inner">
                  <i className={`fas ${selectedInstitution.icon}`}></i>
                </div>
                <div className="mt-2 sm:mt-0">
                  <h2 className="text-3xl font-bold font-heading text-gray-800">{selectedInstitution.name}</h2>
                  <span className="bg-blue-50 text-brand-teal text-xs px-3 py-1 rounded-full border border-blue-100 mt-3 inline-block font-medium">
                    {selectedInstitution.type}
                  </span>
                  <p className="text-gray-400 text-xs mt-2">
                    ID Interno: #{selectedInstitution.id.toString().padStart(4, '0')}
                  </p>
                </div>
              </div>
              
              {/* Cuerpo del Modal: Información detallada */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                
                {/* Columna Izquierda */}
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-3 uppercase tracking-wider">Información de Contacto</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <i className="fas fa-envelope mt-1 text-gray-400 w-6"></i>
                      <a href={`mailto:${selectedInstitution.email}`} className="hover:text-brand-teal transition break-all">
                        {selectedInstitution.email}
                      </a>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-phone mt-1 text-gray-400 w-6"></i>
                      <span>{selectedInstitution.phone}</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-globe mt-1 text-gray-400 w-6"></i>
                      <a href="#" className="text-brand-teal hover:underline transition">
                        www.sitio-web-ejemplo.com
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Columna Derecha */}
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-3 uppercase tracking-wider">Métricas en Intecmar</h4>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex justify-between items-center">
                        <span className="flex items-center"><i className="fas fa-users text-gray-400 w-6"></i> Usuarios vinculados</span>
                        <span className="font-bold text-gray-800">{selectedInstitution.members}</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="flex items-center"><i className="fas fa-calendar-alt text-gray-400 w-6"></i> Fecha de alta</span>
                        <span className="font-medium text-gray-800">{selectedInstitution.date}</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="flex items-center"><i className="fas fa-user-check text-gray-400 w-6"></i> Referentes Activos</span>
                        <span className="font-bold text-brand-success">3</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Descripción (Ocupa las dos columnas en escritorio) */}
                <div className="md:col-span-2">
                  <h4 className="font-bold text-gray-800 text-sm mb-3 uppercase tracking-wider">Descripción Institucional</h4>
                  <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                    {selectedInstitution.desc}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Pie del Modal: Botones de Acción Rápida */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3 shrink-0">
              <button 
                onClick={() => setSelectedInstitution(null)}
                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition"
              >
                Cerrar
              </button>
              <button 
                onClick={() => {
                  handleEdit(selectedInstitution.name);
                  setSelectedInstitution(null);
                }}
                className="px-6 py-2.5 bg-brand-teal text-white text-sm font-bold rounded-lg hover:bg-brand-dark transition shadow-md flex items-center justify-center"
              >
                <i className="fas fa-edit mr-2"></i> Editar Institución
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}