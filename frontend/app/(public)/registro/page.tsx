'use client'; 

import React, { useState } from 'react';
import { api } from '@/lib/api';
import Cookies from 'js-cookie';

export default function RegistroPage() {
  // =========================================================================
  // 1. ESTADO UNIFICADO
  // =========================================================================
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', fechaNacimiento: '', dni: '', cuil: '', genero: '',
    domicilio: '', localidad: '', partido: '', provincia: '', nacionalidad: '',
    rol: '', 
    empresaEnMarcha: '', fechaInicioEmpresa: '', experienciaPrevia: '', motivacionEmprender: '', 
    institucionReferente: '', otraInstitucion: '', serviciosOfrecidos: '', serviciosAportados: '', 
    motivacionesParticipar: [] as string[], 
    nivelEstudios: '', tituloAlcanzado: '', areaConocimiento: '', cursos: [] as string[],
    vinculaciones: [] as string[],
    linkedin: '', instagram: '', twitter: '', tiktok: '', telefono: '',
    email: '', password: '', confirmPassword: '',
    consentimiento: false
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSection, setOpenSection] = useState<number>(1);
  const [dniFile, setDniFile] = useState<File | null>(null);
  
  // =========================================================================
  // 2. LÓGICA CONDICIONAL DE ROLES
  // =========================================================================
  const isEmprendedor = ['Emprendedor incipiente', 'Emprendedor en marcha', 'Empresario joven', 'Empresario maduro'].includes(formData.rol);
  const isReferente = formData.rol === 'Referente Institucional';
  const isOtro = formData.rol !== '' && !isEmprendedor && !isReferente;

  const menuItems = [
    { id: 1, title: '1. Información Básica' },
    { id: 2, title: '2. Ubicación' },
    { id: 3, title: '3. Perfil' },
    { id: 4, title: '4. Formación' },
    { id: 5, title: '5. Vinculación' },
    { id: 6, title: '6. Contacto' },
    { id: 7, title: '7. Acceso' },
    { id: 8, title: '8. Consentimiento' }
  ];

  // =========================================================================
  // 3. MANEJADORES DE EVENTOS
  // =========================================================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (field: 'cursos' | 'vinculaciones' | 'motivacionesParticipar', value: string) => {
    setFormData(prev => {
      const array = prev[field] as string[];
      if (array.includes(value)) {
        return { ...prev, [field]: array.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...array, value] };
      }
    });
  };

  const toggleSection = (section: number) => {
    setOpenSection(prev => prev === section ? 0 : section);
  };

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validar contraseñas ------------------------------------ hay que poner todos los campos obligatorios!!
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden. Por favor, verifíquelas.');
      setOpenSection(7);              //abre la sección de acceso para que el usuario chequee las passwords
      return;
    }

    if (!dniFile) {
      setError('La imagen del DNI es obligatoria.');
      setOpenSection(1);              // Abre la sección 1 para que vea el error
      return;
    }

    setIsLoading(true);

    try {
      // Crear el empaquetado especial para archivos y datos (FormData)
      const submitData = new FormData();
      submitData.append('dniFile', dniFile);

      // Agregamos todos los demás campos
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value));
        } else {
          submitData.append(key, String(value));
        }
      });

      // Enviamos con Axios usando submitData
      // Nota: Axios al ver 'submitData' pone automáticamente el Content-Type multipart/form-data
      const response = await api.post('/auth/register', submitData);
      
      const data = response.data;

      // JWT EN COOKIES
      const token = data.access_token || data.token;
      if (token) {
        document.cookie = `auth_token=${token}; path=/; max-age=604800; SameSite=Strict; Secure`;
      }

      setSuccess(true);
      
      setTimeout(() => { 
        window.location.href = token ? '/perfil' : '/ingresar'; 
      }, 2000);

    } catch (err: any) {
      // Axios guarda los errores del backend en err.response.data
      const backendMessage = err.response?.data?.message;
      setError(backendMessage || 'Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 flex justify-center items-center fade-in">
      <div className="bg-white w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh]">
        
        {/* ================= PANEL IZQUIERDO (FIJO Y COMBINADO) ================= */}
        <div className="w-full md:w-1/4 bg-brand-dark p-10 md:p-12 text-white flex flex-col relative overflow-hidden hidden md:flex shrink-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="relative z-10 mb-8">
            <h3 className="text-3xl font-bold mb-6 font-heading">Únete a la Red</h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Al registrarte podrás acceder a contenido exclusivo, postular a convocatorias y conectar con referentes.
            </p>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-center"><i className="fas fa-check text-brand-teal mr-3"></i> Acceso a capacitaciones</li>
              <li className="flex items-center"><i className="fas fa-check text-brand-teal mr-3"></i> Perfil profesional</li>
              <li className="flex items-center"><i className="fas fa-check text-brand-teal mr-3"></i> Networking</li>
            </ul>
          </div>

          <hr className="border-gray-700 relative z-10 mb-8 opacity-50" />

          {/* Bloque de Progreso Dinámico */}
          <div className="relative z-10 flex-grow">
            <h4 className="text-sm uppercase tracking-wider font-bold mb-4 text-gray-400">Tu progreso</h4>
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

        {/* ================= FORMULARIO DERECHO (SCROLL) ================= */}
        <div className="w-full md:w-3/4 p-8 md:p-12 overflow-y-auto bg-gray-50/50 custom-scrollbar relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-heading">Formulario de Registro de Personas</h2>
          <p className="text-sm text-gray-500 mb-8 pb-4 border-b border-gray-200">
            Haz clic en cada sección para completarla. (Validación desactivada para pruebas).
          </p>
          
          {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm"><i className="fas fa-exclamation-circle mr-2"></i> {error}</div>}
          {success && <div className="bg-green-50 border-l-4 border-brand-success text-green-700 p-3 rounded mb-6 text-sm"><i className="fas fa-check-circle mr-2"></i> ¡Registro exitoso! Redirigiendo...</div>}

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* --- SECCIÓN 1: INFORMACIÓN BÁSICA --- */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button type="button" onClick={() => toggleSection(1)} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-bold text-brand-teal font-heading">Información Básica</h3>
                <i className={`fas fa-chevron-${openSection === 1 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 1 ? 'block' : 'hidden'} p-6 border-t border-gray-200 animate-fade-in`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Nombre/s *</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Apellido/s *</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Fecha de nacimiento *</label>
                    <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">DNI *</label>
                    <input type="text" name="dni" placeholder="Ej: 29333444" value={formData.dni} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">CUIL/T *</label>
                    <input type="text" name="cuil" placeholder="Ej: 20293334445" value={formData.cuil} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Género *</label>
                    <select name="genero" value={formData.genero} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white">
                      <option value="" disabled>Seleccionar</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Imagen del DNI (frente y reverso) *</label>
                    <input type="file" name='dniFile' accept=".jpg,.png,.pdf" className="text-xs text-gray-500" onChange={(e) => setDniFile(e.target.files ? e.target.files[0] : null)}/>
                  </div>
                </div>
              </div>
            </section>

            {/* --- SECCIÓN 2: UBICACIÓN --- */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button type="button" onClick={() => toggleSection(2)} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-bold text-brand-teal font-heading">Ubicación</h3>
                <i className={`fas fa-chevron-${openSection === 2 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 2 ? 'block' : 'hidden'} p-6 border-t border-gray-200 animate-fade-in`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Domicilio (Calle / Número) *</label>
                    <input type="text" name="domicilio" value={formData.domicilio} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Localidad *</label>
                    <input type="text" name="localidad" value={formData.localidad} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Partido *</label>
                    <input type="text" name="partido" value={formData.partido} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Provincia *</label>
                    <input type="text" name="provincia" value={formData.provincia} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Nacionalidad</label>
                    <input type="text" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Certificación de domicilio *</label>
                    <input type="file" accept=".jpg,.png,.pdf" className="text-xs text-gray-500" />
                  </div>
                </div>
              </div>
            </section>

            {/* --- SECCIÓN 3: PERFIL --- */}
            <section className="bg-white border border-blue-200 rounded-xl overflow-hidden shadow-sm">
              <button type="button" onClick={() => toggleSection(3)} className="w-full flex justify-between items-center p-4 bg-blue-50/50 hover:bg-blue-100/50 transition-colors">
                <h3 className="text-lg font-bold text-brand-teal font-heading">Perfil</h3>
                <i className={`fas fa-chevron-${openSection === 3 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 3 ? 'block' : 'hidden'} p-6 border-t border-blue-100 animate-fade-in bg-blue-50/10`}>
                <div className="mb-6">
                  <label className="block text-gray-800 text-sm font-bold mb-2">¿Con qué rol te identificas dentro del ecosistema? *</label>
                  <select name="rol" value={formData.rol} onChange={handleChange} className="w-full md:w-1/2 px-3 py-2 text-sm border rounded bg-white shadow-sm font-medium">
                    <option value="" disabled>-- Seleccionar Rol Principal --</option>
                    <optgroup label="Emprendedor/a">
                      <option value="Emprendedor incipiente">Emprendedor/a incipiente (Idea/Organizando)</option>
                      <option value="Emprendedor en marcha">Emprendedor/a con empresa en marcha (-3 años)</option>
                    </optgroup>
                    <optgroup label="Empresario/a">
                      <option value="Empresario joven">Empresario/a joven (3 a 15 años)</option>
                      <option value="Empresario maduro">Empresario/a maduro (+15 años)</option>
                    </optgroup>
                    <optgroup label="Otros Roles">
                      <option value="Docente o Facilitador">Docente / Facilitador/a</option>
                      <option value="Investigador">Investigador/a</option>
                      <option value="Consultor">Consultor/a</option>
                      <option value="Mentor">Mentor/a</option>
                      <option value="Tutor">Tutor/a</option>
                      <option value="Estudiante">Estudiante</option>
                      <option value="Inversor">Inversor/a</option>
                      <option value="Jurado">Jurado</option>
                      <option value="Referente Institucional">Referente institucional</option>
                      <option value="Evaluador">Evaluador/a</option>
                      <option value="Otro">Otro</option>
                    </optgroup>
                  </select>
                </div>

                {isEmprendedor && (
                  <div className="space-y-4 animate-fade-in pl-4 border-l-2 border-brand-teal">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-xs font-bold mb-1">¿Tiene una empresa en marcha actualmente?</label>
                        <select name="empresaEnMarcha" value={formData.empresaEnMarcha} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white">
                          <option value="">Seleccionar</option>
                          <option value="Si">Sí</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-xs font-bold mb-1">Cantidad de años en marcha / fecha inicio</label>
                        <input type="text" name="fechaInicioEmpresa" value={formData.fechaInicioEmpresa} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" placeholder="Ej: 2 años / 15-04-2022" />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-xs font-bold mb-1">¿Tuviste experiencias emprendedoras previas?</label>
                        <select name="experienciaPrevia" value={formData.experienciaPrevia} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white">
                          <option value="">Seleccionar</option>
                          <option value="Si">Sí</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 text-xs font-bold mb-2">¿Cuál fue tu principal motivación para emprender?</label>
                        <div className="space-y-2 text-sm">
                          {['Necesidad económica (no disponía de ingresos)', 'Generación de ingresos adicionales', 'Autorrealización / Satisfacción personal', 'Autonomía o independencia'].map(opt => (
                            <label key={opt} className="flex items-center text-gray-600">
                              <input type="radio" name="motivacionEmprender" value={opt} onChange={handleChange} checked={formData.motivacionEmprender === opt} className="mr-2 text-brand-teal focus:ring-brand-teal" /> {opt}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isReferente && (
                  <div className="space-y-4 animate-fade-in pl-4 border-l-2 border-brand-magenta">
                    <div>
                      <label className="block text-gray-700 text-xs font-bold mb-2">¿A qué institución pertenece?</label>
                      <select name="institucionReferente" value={formData.institucionReferente} onChange={handleChange} className="w-full md:w-1/2 px-3 py-2 text-sm border rounded bg-white">
                        <option value="">Seleccionar institución...</option>
                        <option value="Desarrollo Local e Inversiones MGP">Desarrollo Local e Inversiones MGP</option>
                        <option value="UNMDP">UNMDP</option>
                        <option value="ATICMA">ATICMA</option>
                        <option value="Universidad Atlántida">Universidad Atlántida</option>
                        <option value="Otra">Otra...</option>
                      </select>
                    </div>
                    {formData.institucionReferente === 'Otra' && (
                      <div>
                        <input type="text" name="otraInstitucion" value={formData.otraInstitucion} onChange={handleChange} className="w-full md:w-1/2 px-3 py-2 text-sm border rounded bg-white" placeholder="Especifique la institución" />
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-xs font-bold mb-1">Breve descripción de servicios ofrecidos</label>
                        <textarea name="serviciosOfrecidos" value={formData.serviciosOfrecidos} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" rows={2}></textarea>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-xs font-bold mb-1">Servicios aportados a la Red INTECMAR</label>
                        <textarea name="serviciosAportados" value={formData.serviciosAportados} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" rows={2}></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {(isOtro || isReferente) && (
                  <div className="mt-6 animate-fade-in pl-4 border-l-2 border-gray-400">
                    <label className="block text-gray-700 text-xs font-bold mb-3">¿Cuál es tu principal motivación para participar en el ecosistema? (Selección múltiple)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      {[
                        'Compartir conocimientos y experiencias', 'Contribuir al desarrollo de nuevos proyectos',
                        'Apoyar a emprendedores desde mi experiencia', 'Aprender y adquirir nuevas competencias',
                        'Generar vínculos y redes de colaboración', 'Detectar oportunidades de inversión',
                        'Promover la cultura emprendedora desde mi institución'
                      ].map(mot => (
                        <label key={mot} className="flex items-start">
                          <input type="checkbox" checked={formData.motivacionesParticipar.includes(mot)} onChange={() => handleArrayChange('motivacionesParticipar', mot)} className="mt-1 mr-2 text-brand-teal rounded focus:ring-brand-teal" /> 
                          <span className="leading-tight">{mot}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* --- SECCIÓN 4: FORMACIÓN --- */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button type="button" onClick={() => toggleSection(4)} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-bold text-brand-teal font-heading">Formación y experiencia profesional</h3>
                <i className={`fas fa-chevron-${openSection === 4 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 4 ? 'block' : 'hidden'} p-6 border-t border-gray-200 animate-fade-in`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Nivel máximo de estudios</label>
                    <select name="nivelEstudios" value={formData.nivelEstudios} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white">
                      <option value="">Seleccionar</option>
                      <option value="Secundario completo">Secundario completo</option>
                      <option value="Terciario-Universitario incompleto">Terciario/Universitario incompleto</option>
                      <option value="Terciario-Universitario completo">Terciario/Universitario completo</option>
                      <option value="Posgrado">Posgrado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Título alcanzado</label>
                    <input type="text" name="tituloAlcanzado" value={formData.tituloAlcanzado} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Área de conocimiento</label>
                    <select name="areaConocimiento" value={formData.areaConocimiento} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white">
                      <option value="">Seleccionar</option>
                      <option value="Administración y Gestión">Administración y Gestión</option>
                      <option value="Ingeniería-Tecnología">Ingeniería-Tecnología</option>
                      <option value="Salud y Ciencias Médicas">Salud y Ciencias Médicas</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-xs font-bold mb-3">
                    {isEmprendedor ? 'Cursos realizados (Selección múltiple)' : 'Cursos realizados relacionados con el acompañamiento a emprendedores:'}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                    {isEmprendedor ? (
                      ['Gestión de proyectos', 'Modelo de negocios / CANVAS', 'Lean Startup / Design Thinking', 'Marketing digital', 'Finanzas', 'Innovación y transferencia', 'Habilidades blandas', 'Economía circular', 'Propiedad intelectual'].map(curso => (
                        <label key={curso} className="flex items-start">
                          <input type="checkbox" checked={formData.cursos.includes(curso)} onChange={() => handleArrayChange('cursos', curso)} className="mt-1 mr-2 text-brand-teal rounded" /> <span className="leading-tight">{curso}</span>
                        </label>
                      ))
                    ) : (
                      ['Ecosistemas de innovación', 'Metodologías ágiles', 'Herramientas de mentoría', 'Evaluación de startups', 'Financiamiento e inversión', 'Transferencia tecnológica', 'Comunicación efectiva', 'Gestión de redes'].map(curso => (
                        <label key={curso} className="flex items-start">
                          <input type="checkbox" checked={formData.cursos.includes(curso)} onChange={() => handleArrayChange('cursos', curso)} className="mt-1 mr-2 text-brand-teal rounded" /> <span className="leading-tight">{curso}</span>
                        </label>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1">CV (Opcional - Máx 10 MB)</label>
                  <input type="file" accept=".pdf" className="text-xs text-gray-500" />
                </div>
              </div>
            </section>

            {/* --- SECCIÓN 5: VINCULACIÓN --- */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button type="button" onClick={() => toggleSection(5)} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-bold text-brand-teal font-heading">Vinculación con la Red INTECMAR</h3>
                <i className={`fas fa-chevron-${openSection === 5 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 5 ? 'block' : 'hidden'} p-6 border-t border-gray-200 animate-fade-in`}>
                <label className="block text-gray-700 text-xs font-bold mb-3">¿Con qué institución de la Red estás o estuviste vinculado/a?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
                  {['Desarrollo Local e Inversiones MGP', 'UNMDP', 'ATICMA', 'Universidad Atlántida', 'Universidad CAECE', 'Universidad FASTA', 'UTN', 'Las Brusquitas', 'CONICET', 'INTI', 'Ninguno'].map(inst => (
                    <label key={inst} className="flex items-start">
                      <input type="checkbox" checked={formData.vinculaciones.includes(inst)} onChange={() => handleArrayChange('vinculaciones', inst)} className="mt-1 mr-2 text-brand-teal rounded focus:ring-brand-teal" /> <span className="leading-tight">{inst}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* --- SECCIÓN 6: CONTACTO --- */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button type="button" onClick={() => toggleSection(6)} className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-bold text-brand-teal font-heading">Contacto</h3>
                <i className={`fas fa-chevron-${openSection === 6 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 6 ? 'block' : 'hidden'} p-6 border-t border-gray-200 animate-fade-in`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">LinkedIn</label>
                    <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" placeholder="URL de tu perfil" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Instagram</label>
                    <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" placeholder="@usuario" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Teléfono celular *</label>
                    <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" placeholder="Ej: 2234000000" />
                  </div>
                </div>
              </div>
            </section>

            {/* --- SECCIÓN 7: ACCESO --- */}
            <section className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
              <button type="button" onClick={() => toggleSection(7)} className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors">
                <h3 className="text-lg font-bold text-brand-dark font-heading">Datos de Acceso</h3>
                <i className={`fas fa-chevron-${openSection === 7 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 7 ? 'block' : 'hidden'} p-6 border-t border-gray-300 animate-fade-in bg-gray-50`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Correo Electrónico *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Contraseña *</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Confirmar Contraseña *</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                </div>
              </div>
            </section>

            {/* --- SECCIÓN 8: CONSENTIMIENTO --- */}
            <section className="bg-white border border-yellow-300 rounded-xl overflow-hidden shadow-sm">
              <button type="button" onClick={() => toggleSection(8)} className="w-full flex justify-between items-center p-4 bg-yellow-50 hover:bg-yellow-100 transition-colors">
                <h3 className="text-lg font-bold text-yellow-800 font-heading">Consentimiento de datos</h3>
                <i className={`fas fa-chevron-${openSection === 8 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 8 ? 'block' : 'hidden'} p-6 border-t border-yellow-300 animate-fade-in bg-yellow-50/50`}>
                <p className="text-sm text-yellow-900 mb-4 leading-relaxed">
                  Doy mi consentimiento para utilizar únicamente los siguientes datos para armar el &quot;Mapa de Actores del Ecosistema Emprendedor del Partido de General Pueyrredón&quot; y publicar los mismos con el objetivo de difundir, visibilizar mi emprendimiento y procurar tener un mayor alcance.
                </p>
                <label className="flex items-center text-sm font-bold text-yellow-900 cursor-pointer">
                  <input type="checkbox" name="consentimiento" checked={formData.consentimiento} onChange={handleChange} className="mr-3 w-5 h-5 text-brand-teal focus:ring-brand-teal rounded border-gray-300" />
                  Acepto los términos de consentimiento
                </label>
              </div>
            </section>

            {/* --- BOTÓN SUBMIT --- */}
            <div className="pt-8 mt-4 border-t border-gray-200">
              <button type="submit" disabled={isLoading || success} className="w-full bg-brand-teal text-white font-bold py-4 px-4 rounded-xl hover:bg-brand-dark transition shadow-lg flex justify-center items-center text-lg disabled:opacity-70">
                {isLoading ? <span className="flex items-center"><i className="fas fa-circle-notch fa-spin mr-2"></i> Procesando...</span> : 'Aceptar y Enviar Registro'}
              </button>
              <p className="text-center mt-6 text-sm text-gray-600 pb-4">
                ¿Ya tienes cuenta? <a href="/ingresar" className="text-brand-teal font-bold hover:underline">Ingresa aquí</a>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}