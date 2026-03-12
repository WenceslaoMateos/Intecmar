'use client'; // página interactiva

import { useState } from 'react';

export default function NosotrosPage() {
  
  // Datos simulados más completos para el Modal (con descripciones e íconos)
  const institucionesMock = [
    { id: 1, nombre: 'TechNova', sector: 'Desarrollo de Software', desc: 'Empresa especializada en soluciones en la nube y transformación digital para PyMES.', icono: 'fa-laptop-code' },
    { id: 2, nombre: 'BioAgro Sur', sector: 'Biotecnología', desc: 'Investigación y desarrollo de biofertilizantes para una agricultura sustentable.', icono: 'fa-leaf' },
    { id: 3, nombre: 'Robótica MDQ', sector: 'Automatización', desc: 'Diseño de brazos robóticos para líneas de ensamblaje en la industria pesquera.', icono: 'fa-robot' },
    { id: 4, nombre: 'EcoEnergy', sector: 'Energías Renovables', desc: 'Instalación y consultoría integral en paneles solares y energía eólica.', icono: 'fa-solar-panel' },
    { id: 5, nombre: 'DataMinds', sector: 'Inteligencia Artificial', desc: 'Análisis de grandes volúmenes de datos para predecir tendencias de mercado.', icono: 'fa-brain' },
    { id: 6, nombre: 'UNMDP - FI', sector: 'Sector Académico', desc: 'Facultad de Ingeniería, aportando investigadores y pasantes a los proyectos de la red.', icono: 'fa-university' },
    { id: 7, nombre: 'Cluster TIC', sector: 'Asociación', desc: 'Cámara que agrupa a las principales empresas de tecnología de la región.', icono: 'fa-network-wired' },
    { id: 8, nombre: 'Innova Salud', sector: 'HealthTech', desc: 'Plataforma de telemedicina y gestión de historias clínicas electrónicas.', icono: 'fa-heartbeat' },
  ];

  // Estado para controlar qué institucion está seleccionada en el Modal
  // Inicia en "null" (cerrado)
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState<any | null>(null);

  return (
    <div className="bg-white py-16 fade-in relative">
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
          {/* Mapeamos el arreglo con los datos completos */}
          {institucionesMock.map((institucion) => (
            <div 
              key={institucion.id} 
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => setInstitucionSeleccionada(institucion)} // Al hacer clic, guardamos la institucion en la "memoria"
            >
              <div className="w-full aspect-square bg-white border border-gray-200 rounded-xl flex items-center justify-center p-6 grayscale group-hover:grayscale-0 transition duration-300 shadow-sm hover:shadow-md transform group-hover:-translate-y-1">
                <div className="text-center">
                  <i className={`fas ${institucion.icono} text-4xl text-gray-300 group-hover:text-brand-teal mb-2 transition`}></i>
                  <span className="block font-bold text-gray-700 text-sm mt-2">{institucion.nombre}</span>
                </div>
              </div>
              <p className="text-xs text-center mt-2 text-gray-500 opacity-0 group-hover:opacity-100 transition duration-300">
                {institucion.sector}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* VENTANA MODAL (Se muestra solo si hay una institucion guardada en la memoria) */}
      {institucionSeleccionada && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm fade-in"
          onClick={() => setInstitucionSeleccionada(null)} // Cierra al hacer clic en el fondo oscuro
        >
          {/* Contenedor principal del modal. stopPropagation evita que se cierre al hacer clic ADENTRO del cuadro blanco */}
          <div 
            className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative transform transition-all" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón X para cerrar */}
            <button 
              onClick={() => setInstitucionSeleccionada(null)} 
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-teal text-3xl shadow-inner">
                <i className={`fas ${institucionSeleccionada.icono}`}></i>
              </div>
              <h3 className="text-2xl font-bold font-heading text-gray-800">{institucionSeleccionada.nombre}</h3>
              <p className="text-brand-magenta font-medium text-sm mt-1">{institucionSeleccionada.sector}</p>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-8 text-center text-sm">
              {institucionSeleccionada.desc}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button 
                onClick={() => alert(`En la fase 2, esto llevará a la web de ${institucionSeleccionada.nombre}`)}
                className="px-6 py-2.5 bg-brand-teal text-white text-sm font-bold rounded-lg hover:bg-brand-dark transition shadow-md"
              >
                <i className="fas fa-globe mr-2"></i> Visitar Web
              </button>
              <button 
                onClick={() => alert(`Se abrirá el formulario de contacto para ${institucionSeleccionada.nombre}`)}
                className="px-6 py-2.5 border-2 border-gray-200 text-gray-600 text-sm font-bold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition"
              >
                <i className="fas fa-envelope mr-2"></i> Contactar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}