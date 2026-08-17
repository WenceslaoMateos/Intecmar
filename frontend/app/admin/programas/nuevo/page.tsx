'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NuevoProgramaPage() {
  const [openSection, setOpenSection] = useState<number>(1);
  const [tieneEdiciones, setTieneEdiciones] = useState('No');

  const menuItems = [
    { id: 1, title: '1. Identificación' },
    { id: 2, title: '2. Instituciones y Responsables' },
    { id: 3, title: '3. Destinatarios' },
    { id: 4, title: '4. Modalidad y Frecuencia' },
    { id: 5, title: '5. Configuración y Recursos' },
  ];

  const toggleSection = (id: number) => setOpenSection(openSection === id ? 0 : id);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Guardando Programa en estado BORRADOR y redirigiendo...');
    window.location.href = '/admin/programas';
  };

  return (
  <div className="fade-in h-[calc(100vh-8rem)]">
      <div className="bg-white w-full h-full rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* ================= PANEL IZQUIERDO ================= */}
        {/* Agregamos overflow-y-auto por si el menú es muy largo en pantallas chicas */}
        <div className="w-full md:w-1/4 bg-brand-dark p-8 text-white flex flex-col relative overflow-y-auto hidden md:flex shrink-0 custom-scrollbar">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          
          <div className="relative z-10 mb-8">
            <Link href="/admin/programas" className="inline-flex items-center text-brand-teal hover:text-white transition text-sm font-bold mb-6">
              <i className="fas fa-arrow-left mr-2"></i> Volver a Programas
            </Link>
            <h3 className="text-3xl font-bold mb-6 font-heading">Alta de Programa</h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Define el contenedor organizativo. Los programas registrados son referenciados posteriormente al crear Actividades.
            </p>
          </div>

          <hr className="border-gray-700 relative z-10 mb-8 opacity-50" />

          <div className="relative z-10 flex-grow">
            <h4 className="text-sm uppercase tracking-wider font-bold mb-4 text-gray-400">Progreso</h4>
            <ul className="space-y-3 text-xs font-medium">
              {menuItems.map((item) => (
                <li 
                  key={item.id} 
                  className={`flex items-center cursor-pointer transition-all ${openSection === item.id ? 'text-white font-bold scale-105 origin-left' : 'text-gray-500 hover:text-gray-300'}`}
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
        {/* Este panel tiene su propio scroll independiente del layout principal */}
        <div className="w-full md:w-3/4 p-8 overflow-y-auto bg-gray-50/50 custom-scrollbar relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-heading">Registro de Nuevo Programa</h2>
          <p className="text-sm text-gray-500 mb-8 pb-4 border-b border-gray-200">
            Los campos marcados con * son obligatorios. El sistema asignará el estado BORRADOR al guardar.
          </p>

          <form onSubmit={handleRegister} className="space-y-4 pb-8">

            {/* SECCIÓN 1: IDENTIFICACIÓN */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition" onClick={() => toggleSection(1)}>
                <h3 className="text-lg font-bold text-brand-teal">Identificación del programa</h3>
                <i className={`fas fa-chevron-${openSection === 1 ? 'up' : 'down'} text-gray-400`}></i>
              </div>
              {openSection === 1 && (
                <div className="p-6 border-t border-gray-100 grid gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nombre del programa *</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal focus:outline-none" placeholder="Debe ser único en el sistema" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Descripción / Fundamento *</label>
                    <textarea rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal focus:outline-none resize-none" placeholder="Propósito general y justificación..." required></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Objetivo general *</label>
                    <textarea rows={2} className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal focus:outline-none resize-none" required></textarea>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 2: INSTITUCIONES */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition" onClick={() => toggleSection(2)}>
                <h3 className="text-lg font-bold text-brand-teal">Instituciones y Responsables</h3>
                <i className={`fas fa-chevron-${openSection === 2 ? 'up' : 'down'} text-gray-400`}></i>
              </div>
              {openSection === 2 && (
                <div className="p-6 border-t border-gray-100 grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Instituciones intervinientes *</label>
                    <select multiple className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal h-32" required>
                      <option value="unmdp">UNMDP</option>
                      <option value="aticma">ATICMA</option>
                      <option value="utn">UTN</option>
                      <option value="conicet">CONICET</option>
                      <option value="int">INTI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Institución líder / coordinadora</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal">
                      <option value="">Opcional...</option>
                      <option value="unmdp">UNMDP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Correo de contacto del programa</label>
                    <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal" placeholder="ejemplo@intecmar.org" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Responsable/s del programa *</label>
                    <p className="text-xs text-gray-500 mb-2">Solo usuarios con rol Referente, Docente o Consultor.</p>
                    <select multiple className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal h-20" required>
                      <option value="user1">María López (Referente ATICMA)</option>
                      <option value="user2">Carlos Ruiz (Consultor)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 3: DESTINATARIOS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition" onClick={() => toggleSection(3)}>
                <h3 className="text-lg font-bold text-brand-teal">Destinatarios</h3>
                <i className={`fas fa-chevron-${openSection === 3 ? 'up' : 'down'} text-gray-400`}></i>
              </div>
              {openSection === 3 && (
                <div className="p-6 border-t border-gray-100 grid gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Roles habilitados *</label>
                    <select multiple className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal h-32" required>
                      <option value="todos">Todos los roles</option>
                      <option value="emprendedor">Emprendedor/a incipiente</option>
                      <option value="empresario">Empresario/a</option>
                      <option value="docente">Docente / Facilitador/a</option>
                      <option value="inversor">Inversor/a</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Descripción del perfil destinatario (Opcional)</label>
                    <textarea rows={2} className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal resize-none"></textarea>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 4: MODALIDAD Y FRECUENCIA */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition" onClick={() => toggleSection(4)}>
                <h3 className="text-lg font-bold text-brand-teal">Modalidad y Frecuencia</h3>
                <i className={`fas fa-chevron-${openSection === 4 ? 'up' : 'down'} text-gray-400`}></i>
              </div>
              {openSection === 4 && (
                <div className="p-6 border-t border-gray-100 grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Modalidad predominante *</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal" required>
                      <option value="">Seleccionar...</option>
                      <option value="Virtual">Virtual</option>
                      <option value="Presencial">Presencial</option>
                      <option value="Híbrido">Híbrido</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Periodicidad *</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal" required>
                      <option value="">Seleccionar...</option>
                      <option value="Semanal">Semanal</option>
                      <option value="Mensual">Mensual</option>
                      <option value="Anual">Anual</option>
                      <option value="Irregular">Irregular / A demanda</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Encuentros por período</label>
                    <input type="number" className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal" placeholder="Ej: 2" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Duración promedio (hs)</label>
                    <input type="number" step="0.5" className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal" placeholder="Ej: 1.5" />
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 5: EDICIONES Y RECURSOS */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition" onClick={() => toggleSection(5)}>
                <h3 className="text-lg font-bold text-brand-teal">Configuración y Recursos</h3>
                <i className={`fas fa-chevron-${openSection === 5 ? 'up' : 'down'} text-gray-400`}></i>
              </div>
              {openSection === 5 && (
                <div className="p-6 border-t border-gray-100 grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">¿El programa tiene ediciones periódicas? *</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal" value={tieneEdiciones} onChange={(e) => setTieneEdiciones(e.target.value)} required>
                      <option value="No">No, es continuo</option>
                      <option value="Si">Sí</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">¿Publicar en el sitio web de la Red? *</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-brand-teal" required>
                      <option value="Si">Sí</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Material de difusión (flyer, brochure)</label>
                    <input type="file" className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-teal file:text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* BOTONERA */}
            <div className="mt-8 flex justify-end gap-4 border-t border-gray-200 pt-6">
              <button type="button" className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition">
                Descartar
              </button>
              <button type="submit" className="px-8 py-3 bg-brand-magenta text-white font-bold rounded-lg shadow-md hover:bg-purple-800 transition">
                Guardar Programa
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}