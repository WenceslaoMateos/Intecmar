'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NuevaActividadPage() {
  const [openSection, setOpenSection] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Estados para manejar condicionales del formulario
  const [modalidad, setModalidad] = useState('');
  const [esArancelada, setEsArancelada] = useState('No');

  const menuItems = [
    { id: 1, title: '1. Información Básica' },
    { id: 2, title: '2. Fechas y Modalidad' },
    { id: 3, title: '3. Detalles y Destinatarios' },
    { id: 4, title: '4. Aranceles y Publicación' },
  ];

  const toggleSection = (id: number) => {
    setOpenSection(openSection === id ? 0 : id);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      window.location.href = '/admin/actividades';
    }, 2000);
  };

  return (
    <div className="fade-in h-[calc(100vh-8rem)]">
      <div className="bg-white w-full h-full rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
         
        {/* ================= PANEL IZQUIERDO ================= */}
        <div className="w-full md:w-1/4 bg-brand-dark p-10 md:p-12 text-white flex flex-col relative overflow-hidden hidden md:flex shrink-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="relative z-10 mb-8">
            {/* Botón Volver */}
            <Link href="/admin/actividades" className="inline-flex items-center text-brand-teal hover:text-white transition text-sm font-bold mb-6">
              <i className="fas fa-arrow-left mr-2"></i> Volver a Actividades
            </Link>
            
            <h3 className="text-3xl font-bold mb-6 font-heading">Crear Actividad</h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Configura los detalles, requisitos y filtros de la nueva actividad para la Red INTECMAR.
            </p>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-center"><i className="fas fa-check text-brand-teal mr-3"></i> Configuración general</li>
              <li className="flex items-center"><i className="fas fa-check text-brand-teal mr-3"></i> Filtros de destinatarios</li>
              <li className="flex items-center"><i className="fas fa-check text-brand-teal mr-3"></i> Gestión de aranceles</li>
            </ul>
          </div>

          <hr className="border-gray-700 relative z-10 mb-8 opacity-50" />

          <div className="relative z-10 flex-grow">
            <h4 className="text-sm uppercase tracking-wider font-bold mb-4 text-gray-400">Progreso de Carga</h4>
            <ul className="space-y-3 text-xs font-medium">
              {menuItems.map((item) => (
                <li 
                  key={item.id} 
                  className={`flex items-center cursor-pointer transition-all duration-200 ${openSection === item.id ? 'text-white font-bold scale-105 origin-left' : 'text-gray-500 hover:text-gray-300'}`}
                  onClick={() => toggleSection(item.id)}
                >
                  <i className={`fas fa-dot-circle mr-3 ${openSection === item.id ? 'text-brand-teal' : 'text-gray-600'}`}></i> 
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= FORMULARIO DERECHO ================= */}
        <div className="w-full md:w-3/4 p-8 md:p-12 overflow-y-auto bg-gray-50/50 custom-scrollbar relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-heading">Formulario de Actividad</h2>
          <p className="text-sm text-gray-500 mb-8 pb-4 border-b border-gray-200">
            Haz clic en cada sección para completarla. Los campos marcados con * son obligatorios.
          </p>
          
          {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm"><i className="fas fa-exclamation-circle mr-2"></i> {error}</div>}
          {success && <div className="bg-green-50 border-l-4 border-brand-success text-green-700 p-3 rounded mb-6 text-sm"><i className="fas fa-check-circle mr-2"></i> ¡Actividad creada con éxito! Redirigiendo...</div>}

          <form onSubmit={handleRegister} className="space-y-4 pb-20">

            {/* SECCIÓN 1: INFORMACIÓN BÁSICA */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div 
                className="p-5 flex justify-between items-center cursor-pointer bg-white hover:bg-gray-50 transition"
                onClick={() => toggleSection(1)}
              >
                <h3 className="text-lg font-bold text-brand-teal flex items-center">
                  Información Básica
                </h3>
                <i className={`fas fa-chevron-${openSection === 1 ? 'up' : 'down'} text-gray-400`}></i>
              </div>
              
              {openSection === 1 && (
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la actividad *</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" placeholder="Ej: Premio a la Innovación 2026" required />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Programa/s *</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required>
                        <option value="">Seleccionar...</option>
                        <option value="talento">Gestión del Talento</option>
                        <option value="mentorias">Programa de Mentorías</option>
                        <option value="capital">Programa de Desarrollo de Capital Emprendedor</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de actividad *</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required>
                        <option value="">Seleccionar...</option>
                        <option value="ACT-01">Jornada</option>
                        <option value="ACT-03">Taller</option>
                        <option value="ACT-05">Capacitación</option>
                        <option value="ACT-07">Premio</option>
                        <option value="ACT-08">Ronda de Vinculación</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Institución/es organizadora/s *</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required>
                        <option value="">Seleccionar Red INTECMAR...</option>
                        <option value="inst1">Institución 1</option>
                        <option value="inst2">Institución 2</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 2: FECHAS Y MODALIDAD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div 
                className="p-5 flex justify-between items-center cursor-pointer bg-white hover:bg-gray-50 transition"
                onClick={() => toggleSection(2)}
              >
                <h3 className="text-lg font-bold text-brand-teal flex items-center">
                  Fechas y Modalidad
                </h3>
                <i className={`fas fa-chevron-${openSection === 2 ? 'up' : 'down'} text-gray-400`}></i>
              </div>
              
              {openSection === 2 && (
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Modalidad *</label>
                      <select 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" 
                        value={modalidad}
                        onChange={(e) => setModalidad(e.target.value)}
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="Virtual">Virtual</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Híbrido">Híbrido</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Carga horaria total (horas) *</label>
                      <input type="number" min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required />
                    </div>

                    {(modalidad === 'Presencial' || modalidad === 'Híbrido') && (
                      <div className="md:col-span-2 fade-in">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Lugar presencial *</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" placeholder="Ej: Auditorio UTN" required />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Fecha de inicio *</label>
                      <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Fecha de fin / cierre *</label>
                      <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 3: DETALLES Y DESTINATARIOS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div 
                className="p-5 flex justify-between items-center cursor-pointer bg-white hover:bg-gray-50 transition"
                onClick={() => toggleSection(3)}
              >
                <h3 className="text-lg font-bold text-brand-teal flex items-center">
                  Detalles y Destinatarios
                </h3>
                <i className={`fas fa-chevron-${openSection === 3 ? 'up' : 'down'} text-gray-400`}></i>
              </div>
              
              {openSection === 3 && (
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Fundamento / Descripción *</label>
                      <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none resize-none" required></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Objetivo general *</label>
                      <textarea rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none resize-none" required></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Destinatarios *</label>
                        <select multiple className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none h-24" required>
                          <option value="emprendedor">Emprendedor/a incipiente</option>
                          <option value="empresario">Empresario/a</option>
                          <option value="estudiante">Estudiante</option>
                          <option value="inversor">Inversor/a</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Mantén presionado Ctrl/Cmd para selección múltiple.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">¿Requiere inscripción con proyecto? *</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required>
                          <option value="">Seleccionar...</option>
                          <option value="Si">Sí</option>
                          <option value="No">No</option>
                        </select>
                        
                        <label className="block text-sm font-bold text-gray-700 mt-4 mb-2">Cupo máximo (Opcional)</label>
                        <input type="number" min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" placeholder="Ej: 50" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 4: ARANCELES Y PUBLICACIÓN */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div 
                className="p-5 flex justify-between items-center cursor-pointer bg-white hover:bg-gray-50 transition"
                onClick={() => toggleSection(4)}
              >
                <h3 className="text-lg font-bold text-brand-teal flex items-center">
                  Aranceles y Publicación
                </h3>
                <i className={`fas fa-chevron-${openSection === 4 ? 'up' : 'down'} text-gray-400`}></i>
              </div>
              
              {openSection === 4 && (
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">¿Es actividad arancelada?</label>
                      <select 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none"
                        value={esArancelada}
                        onChange={(e) => setEsArancelada(e.target.value)}
                      >
                        <option value="No">No</option>
                        <option value="Si">Sí</option>
                      </select>
                    </div>

                    {esArancelada === 'Si' && (
                      <div className="fade-in">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Monto de arancel *</label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" placeholder="Ej: $15.000 ARS" required />
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Publicar en sitio web / redes *</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required>
                        <option value="">Seleccionar...</option>
                        <option value="Si">Sí, publicar</option>
                        <option value="No">No, mantener oculto</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* BOTONERA FLOTANTE O INFERIOR */}
            <div className="mt-8 flex justify-end gap-4 border-t border-gray-200 pt-6">
              <button type="button" className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition">
                Descartar
              </button>
              <button type="submit" className="px-8 py-3 bg-brand-magenta text-white font-bold rounded-lg shadow-md hover:bg-purple-800 transition">
                Guardar Actividad
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}