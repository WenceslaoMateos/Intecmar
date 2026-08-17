'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NuevaInstitucionPage() {
  const [openSection, setOpenSection] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const menuItems = [
    { id: 1, title: '1. Información General' },
    { id: 2, title: '2. Ubicación' },
    { id: 3, title: '3. Referente Institucional' },
    { id: 4, title: '4. Perfil en el Ecosistema' },
  ];

  const toggleSection = (id: number) => {
    setOpenSection(openSection === id ? 0 : id);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    // Simula el guardado en base de datos y redirecciona
    setTimeout(() => {
      window.location.href = '/admin/instituciones';
    }, 2000);
  };

  return (
    <div className="fade-in h-[calc(100vh-8rem)]">
      <div className="bg-white w-full h-full rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
         
        {/* ================= PANEL IZQUIERDO ================= */}
        <div className="w-full md:w-1/4 bg-brand-dark p-10 md:p-12 text-white flex flex-col relative overflow-hidden hidden md:flex shrink-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="relative z-10 mb-8">
            <Link href="/admin/instituciones" className="inline-flex items-center text-brand-teal hover:text-white transition text-sm font-bold mb-6">
              <i className="fas fa-arrow-left mr-2"></i> Volver a Instituciones
            </Link>
            
            <h3 className="text-3xl font-bold mb-6 font-heading">Alta de Institución</h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Registra una nueva entidad en la Red Intecmar. Solo el Administrador tiene los permisos para realizar esta acción.
            </p>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-center"><i className="fas fa-building text-brand-teal mr-3"></i> Perfil institucional</li>
              <li className="flex items-center"><i className="fas fa-map-marker-alt text-brand-teal mr-3"></i> Ubicación y Contacto</li>
              <li className="flex items-center"><i className="fas fa-handshake text-brand-teal mr-3"></i> Vinculaciones</li>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-heading">Formulario de Registro de Institución</h2>
          <p className="text-sm text-gray-500 mb-8 pb-4 border-b border-gray-200">
            Haz clic en cada sección para completarla. Los campos marcados con * son obligatorios.
          </p>
          
          {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm"><i className="fas fa-exclamation-circle mr-2"></i> {error}</div>}
          {success && <div className="bg-green-50 border-l-4 border-brand-success text-green-700 p-3 rounded mb-6 text-sm"><i className="fas fa-check-circle mr-2"></i> ¡Institución registrada con éxito! Redirigiendo...</div>}

          <form onSubmit={handleRegister} className="space-y-4 pb-20">

            {/* SECCIÓN 1: INFORMACIÓN GENERAL */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div 
                className="p-5 flex justify-between items-center cursor-pointer bg-white hover:bg-gray-50 transition"
                onClick={() => toggleSection(1)}
              >
                <h3 className="text-lg font-bold text-brand-teal flex items-center">
                  Información General
                </h3>
                <i className={`fas fa-chevron-${openSection === 1 ? 'up' : 'down'} text-gray-400`}></i>
              </div>
              
              {openSection === 1 && (
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la institución *</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" placeholder="Ej: Universidad Nacional de Mar del Plata" required />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de institución (Permite selección múltiple) *</label>
                      <select multiple className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none h-32" required>
                        <option value="Universidad pública">Universidad pública</option>
                        <option value="Universidad privada">Universidad privada</option>
                        <option value="Centro de investigación">Centro de investigación</option>
                        <option value="Agencia de desarrollo">Agencia de desarrollo</option>
                        <option value="Gobierno">Gobierno municipal/provincial/nacional</option>
                        <option value="Cámara empresarial">Cámara empresarial</option>
                        <option value="Cooperativa / Mutual">Cooperativa / Mutual</option>
                        <option value="Asociación civil / ONG">Asociación civil / ONG</option>
                        <option value="Empresa privada">Empresa privada</option>
                        <option value="Incubadora">Incubadora</option>
                        <option value="Aceleradora">Aceleradora</option>
                        <option value="Fondo de Inversión">Fondo de Inversión</option>
                        <option value="Otra">Otra</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Mantén presionado Ctrl/Cmd para elegir varias opciones.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Correo electrónico institucional *</label>
                      <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" placeholder="contacto@institucion.edu.ar" required />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono institucional *</label>
                      <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" placeholder="+54 223 456 7890" required />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Sitio web</label>
                      <input type="url" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" placeholder="https://www.ejemplo.com" />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Redes sociales activas</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" placeholder="Instagram, LinkedIn..." />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Logo de la institución</label>
                      <input type="file" accept="image/png, image/jpeg" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-teal file:text-white hover:file:bg-brand-dark" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 2: UBICACIÓN */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div 
                className="p-5 flex justify-between items-center cursor-pointer bg-white hover:bg-gray-50 transition"
                onClick={() => toggleSection(2)}
              >
                <h3 className="text-lg font-bold text-brand-teal flex items-center">
                  Ubicación
                </h3>
                <i className={`fas fa-chevron-${openSection === 2 ? 'up' : 'down'} text-gray-400`}></i>
              </div>
              
              {openSection === 2 && (
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">País *</label>
                      <input type="text" defaultValue="Argentina" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Provincia *</label>
                      <input type="text" defaultValue="Buenos Aires" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Partido *</label>
                      <input type="text" defaultValue="General Pueyrredón" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Localidad *</label>
                      <input type="text" defaultValue="Mar del Plata" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Domicilio completo *</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" placeholder="Calle, Número, Piso, Depto..." required />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 3: REFERENTE INSTITUCIONAL */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div 
                className="p-5 flex justify-between items-center cursor-pointer bg-white hover:bg-gray-50 transition"
                onClick={() => toggleSection(3)}
              >
                <h3 className="text-lg font-bold text-brand-teal flex items-center">
                  Referente Institucional
                </h3>
                <i className={`fas fa-chevron-${openSection === 3 ? 'up' : 'down'} text-gray-400`}></i>
              </div>
              
              {openSection === 3 && (
                <div className="p-6 border-t border-gray-100 bg-white">
                  <p className="text-sm text-gray-500 mb-6 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <i className="fas fa-info-circle mr-2 text-brand-teal"></i>
                    El referente es el nexo principal. Si la persona no está registrada aún, recibirá una invitación por correo.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nombre completo *</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Cargo en la institución *</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Correo electrónico directo *</label>
                      <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono directo *</label>
                      <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 4: PERFIL EN EL ECOSISTEMA */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div 
                className="p-5 flex justify-between items-center cursor-pointer bg-white hover:bg-gray-50 transition"
                onClick={() => toggleSection(4)}
              >
                <h3 className="text-lg font-bold text-brand-teal flex items-center">
                  Perfil en el Ecosistema
                </h3>
                <i className={`fas fa-chevron-${openSection === 4 ? 'up' : 'down'} text-gray-400`}></i>
              </div>
              
              {openSection === 4 && (
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">¿Qué tipo de apoyo brinda al ecosistema? *</label>
                      <select multiple className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none h-32" required>
                        <option value="Preincubación">Preincubación</option>
                        <option value="Incubación">Incubación</option>
                        <option value="Aceleración">Aceleración</option>
                        <option value="Mentorías">Mentorías</option>
                        <option value="Capacitación">Capacitación</option>
                        <option value="Espacio de coworking">Espacio de coworking</option>
                        <option value="Acceso a financiamiento">Acceso a financiamiento</option>
                        <option value="Vinculación">Vinculación con ecosistema emprendedor</option>
                        <option value="Formulación de proyectos">Formulación de proyectos</option>
                        <option value="Asistencia tecnológica">Asistencia para validación tecnológica</option>
                        <option value="Otros">Otros</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Costo de los servicios *</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required>
                        <option value="">Seleccionar...</option>
                        <option value="Gratuito">Gratuito</option>
                        <option value="Pago">Pago</option>
                        <option value="Mixto">Mixto</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Número total de proyectos apoyados *</label>
                      <input type="number" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Etapa en la que asisten a los proyectos *</label>
                      <select multiple className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none h-24" required>
                        <option value="Idea">Idea</option>
                        <option value="Validación de oportunidad">Validación de oportunidad</option>
                        <option value="Validación tecnológica">Validación del desarrollo tecnológico</option>
                        <option value="Validación de negocios">Validación del modelo de negocios</option>
                        <option value="Plan de negocios">Plan de negocios</option>
                        <option value="Lanzamiento">Lanzamiento</option>
                        <option value="Crecimiento o escalabilidad">Crecimiento o escalabilidad</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Áreas o sectores en los que trabaja *</label>
                      <select multiple className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none h-32" required>
                        <optgroup label="Agricultura/Agroindustria">
                          <option value="AgTech">Tecnología agrícola (AgTech)</option>
                          <option value="Producción">Producción agrícola/ganadera</option>
                        </optgroup>
                        <optgroup label="Tecnología">
                          <option value="Software">Desarrollo de software</option>
                          <option value="AI">IA y Machine Learning</option>
                          <option value="IoT">Internet de las Cosas (IoT)</option>
                        </optgroup>
                        <optgroup label="Salud y Ciencias">
                          <option value="Biotecnología">Biotecnología</option>
                          <option value="eHealth">Salud digital (eHealth)</option>
                        </optgroup>
                        <option value="Otras">Otras áreas generales...</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Frecuencia de participación en ecosistema *</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:outline-none" required>
                        <option value="">Seleccionar...</option>
                        <option value="Permanente">Permanente</option>
                        <option value="Frecuente">Frecuente (mensual o bimestral)</option>
                        <option value="Esporádica">Esporádica</option>
                        <option value="Aun no participó">Aún no participó, pero está interesada</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2 mt-4 space-y-4 border-t border-gray-100 pt-4">
                      <div className="flex items-center">
                        <input type="checkbox" id="check-red" className="w-4 h-4 text-brand-teal bg-gray-100 border-gray-300 rounded focus:ring-brand-teal" required />
                        <label htmlFor="check-red" className="ml-2 text-sm text-gray-700 font-medium">
                          Está interesada en participar en actividades colaborativas de la Red Intecmar *
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="check-mapa" className="w-4 h-4 text-brand-teal bg-gray-100 border-gray-300 rounded focus:ring-brand-teal" required />
                        <label htmlFor="check-mapa" className="ml-2 text-sm text-gray-700 font-medium">
                          Acepta que los datos institucionales sean incluidos en el Mapa de Instituciones Vinculadas *
                        </label>
                      </div>
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
                Registrar Institución
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}