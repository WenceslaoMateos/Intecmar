'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PerfilPage() {
  
  // Datos simulados de los proyectos del usuario
  const [userProjects] = useState([
    { 
      id: 1, 
      title: "EcoSustrato", 
      role: "Fundador", 
      date: "2025 - Presente", 
      status: "Incubación", 
      statusColor: "bg-blue-50 text-blue-600 border-blue-200",
      desc: "Desarrollo de sustratos ecológicos a partir de residuos de la industria cervecera local." 
    },
    { 
      id: 2, 
      title: "App Deporte Local", 
      role: "Co-Fundador", 
      date: "2023 - 2024", 
      status: "Finalizado", 
      statusColor: "bg-gray-100 text-gray-600 border-gray-200",
      desc: "Plataforma móvil para conectar deportistas amateurs y organizar partidos en la ciudad." 
    }
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* ========================================== */}
      {/* COLUMNA IZQUIERDA (Perfil y Proyectos) */}
      {/* ========================================== */}
      <div className="lg:col-span-2 space-y-6">
          
        {/* TARJETA DE PERFIL (Header) */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          
          {/* Banner de fondo (Portada) */}
          <div className="h-32 bg-gradient-to-r from-brand-dark to-brand-teal relative">
            <button 
              onClick={() => alert('Abrir modal para cambiar foto de portada')}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition shadow-sm backdrop-blur-sm"
              title="Cambiar portada"
            >
              <i className="fas fa-camera w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>
          
          <div className="px-6 pb-6 relative">
            {/* Foto de Perfil (Avatar) */}
            <div className="relative -mt-16 mb-4">
              <img 
                src="https://ui-avatars.com/api/?name=Juan+Perez&size=128&background=fff&color=0f3c4c" 
                alt="Juan Pérez"
                className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 font-heading leading-tight">Juan Pérez</h1>
                <p className="text-gray-600 font-medium mt-1">Emprendedor Tecnológico | Desarrollador Full Stack</p>
                <p className="text-gray-400 text-sm mt-1 flex items-center">
                  <i className="fas fa-map-marker-alt mr-2 text-gray-300"></i> Mar del Plata, Argentina
                </p>
              </div>
              <button 
                onClick={() => alert('Abrir modal para editar perfil')}
                className="text-brand-teal border border-brand-teal px-5 py-1.5 rounded-full font-bold hover:bg-brand-teal hover:text-white transition text-sm flex items-center shadow-sm shrink-0"
              >
                <i className="fas fa-pen mr-2"></i> Editar
              </button>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm mb-2 uppercase tracking-wider">Sobre mí</h3>
              <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                Apasionado por crear soluciones tecnológicas con impacto social. Actualmente enfocado en proyectos de economía circular y desarrollo web sostenible. Buscando mentores en el área de finanzas.
              </p>
            </div>
          </div>
        </div>

        {/* TIMELINE DE PROYECTOS */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-xl font-bold text-gray-800 font-heading flex items-center gap-2">
              <i className="fas fa-rocket text-brand-teal"></i> Mis Proyectos
            </h2>
            <button 
              onClick={() => alert('Fase 2: Abrirá el formulario para cargar un nuevo proyecto.')} 
              className="flex items-center gap-2 text-white bg-brand-magenta hover:bg-purple-800 px-5 py-2 rounded-full text-sm font-bold transition shadow-sm"
            >
              <i className="fas fa-plus"></i> Nuevo Proyecto
            </button>
          </div>

          <div className="relative pl-4">
            {/* Línea vertical del timeline (La clase está en tu globals.css) */}
            <div className="timeline-line"></div>

            <div className="space-y-8">
              {userProjects.map((proj) => (
                <div key={proj.id} className="relative pl-8 group">
                  
                  {/* Puntito del timeline */}
                  <div className="absolute left-[13px] top-1.5 w-3.5 h-3.5 bg-brand-teal rounded-full border-2 border-white shadow z-10 transition-transform group-hover:scale-125"></div>
                  
                  {/* Tarjeta del Proyecto */}
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md hover:border-brand-teal/30 transition duration-300 relative group-hover:bg-white">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-brand-teal text-lg leading-tight">{proj.title}</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{proj.role} • {proj.date}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-md border font-bold shadow-sm shrink-0 ${proj.statusColor}`}>
                        {proj.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                      {proj.desc}
                    </p>
                    
                    {/* Botones de acción del proyecto (Aparecen en desktop al hacer hover, o siempre visibles en móvil) */}
                    <div className="mt-4 flex gap-3 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button className="text-xs text-white bg-brand-dark px-3 py-1.5 rounded hover:bg-gray-800 font-bold shadow-sm transition">
                        Ver detalles
                      </button>
                      <button className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded hover:text-brand-teal hover:border-brand-teal font-bold shadow-sm transition">
                        <i className="fas fa-pen mr-1"></i> Editar
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* COLUMNA DERECHA (Sugerencias) */}
      {/* ========================================== */}
      <div className="space-y-6">
        

        {/* Sugerencias para ti (Sticky para que baje con el scroll) */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 sticky top-24">
          <h3 className="font-bold text-gray-800 text-sm mb-4 font-heading border-b border-gray-100 pb-2">Sugerencias para ti</h3>
          
          <div className="space-y-5">
            {/* Sugerencia 1 */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white shrink-0 shadow-sm">
                <i className="fas fa-university text-xs"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">Incubadora UNMDP</p>
                <p className="text-xs text-gray-500 mb-2">Institución Académica</p>
                <button className="text-xs border border-gray-300 text-gray-600 font-bold rounded-full px-4 py-1 hover:border-brand-teal hover:text-brand-teal hover:bg-blue-50 transition w-full">
                  <i className="fas fa-plus mr-1"></i> Seguir
                </button>
              </div>
            </div>

            {/* Sugerencia 2 */}
            <div className="flex items-start gap-3 pt-4 border-t border-gray-50">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 shrink-0 shadow-sm border border-gray-300">
                <strong>LM</strong>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">Lucía Méndez</p>
                <p className="text-xs text-gray-500 mb-2 truncate">Investigadora CONICET</p>
                <button className="text-xs border border-brand-teal text-brand-teal font-bold rounded-full px-4 py-1 hover:bg-brand-teal hover:text-white transition w-full">
                  <i className="fas fa-user-plus mr-1"></i> Conectar
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-5 pt-3 border-t border-gray-100 text-center">
            <Link href="/explorar" className="text-xs text-brand-teal font-bold hover:underline">
              Ver todas las recomendaciones
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}