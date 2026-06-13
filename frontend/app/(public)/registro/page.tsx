'use client'; 

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Select from 'react-select';

export default function RegistroPage() {
  // =========================================================================
  // 1. ESTADOS PARA LOS CATÁLOGOS DINÁMICOS (BD)
  // =========================================================================
  const [rolesDB, setRolesDB] = useState<any[]>([]);
  const [docTypesDB, setDocsDB] = useState<any[]>([]);
  const [gendersDB, setGendersDB] = useState<any[]>([]);
  const [institutionsDB, setInstitutionsDB] = useState<any[]>([]);
  const [countriesDB, setCountriesDB] = useState<any[]>([]);
  const [provincesDB, setProvincesDB] = useState<any[]>([]);
  const [countiesDB, setCountiesDB] = useState<any[]>([]);
  const [citiesDB, setCitiesDB] = useState<any[]>([]);

  // =========================================================================
  // 2. ESTADO UNIFICADO DEL FORMULARIO
  // =========================================================================
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', fechaNacimiento: '', 
    tipoDocumento: '', numeroDocumento: '', 
    cuil: '', genero: '',
    domicilio: '', localidad: '', partido: '', provincia: '', pais: '',
    roles: [] as string[], 
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
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [showRoleGuide, setShowRoleGuide] = useState(false);
  const [mounted, setMounted] = useState(false);

  // =========================================================================
  // 3.FETCH DE DATOS AL CARGAR LA PÁGINA
  // =========================================================================
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const [resRoles, resDocs, resGenders, resInst, resCountries] = await Promise.all([
          api.get('/roles').catch(() => ({ data: [] })), 
          api.get('/type_documents').catch(() => ({ data: [] })),
          api.get('/genders').catch(() => ({ data: [] })),
          api.get('/institutions').catch(() => ({ data: [] })),
          api.get('/countries').catch(() => ({ data: [] }))
        ]);

        setRolesDB(resRoles.data || []);
        setDocsDB(resDocs.data || []);
        setGendersDB(resGenders.data || []);
        setInstitutionsDB(resInst.data || []);
        setCountriesDB(resCountries.data || []);
      } catch (err) {
        console.error("Error al cargar catálogos desde la BD", err);
      }
    };
    fetchCatalogos();
  }, []);
  

  // effect en cascada: Si cambia el País, buscamos sus Provincias
  useEffect(() => {
    if (formData.pais) {
      api.get('/provinces')
         .then(res => setProvincesDB(res.data || []))
         .catch(err => console.error("Error cargando provincias", err));
    } else {
      setProvincesDB([]);
    }
    setFormData(prev => ({ ...prev, provincia: '', partido: '', localidad: '' }));
    setCountiesDB([]);
    setCitiesDB([]);
  }, [formData.pais]); 
  
  // effect en cascada: Si cambia la Provincia, buscamos sus Partidos
  useEffect(() => {
    if (formData.provincia) {
      api.get(`/counties/${formData.provincia}`)
         .then(res => setCountiesDB(res.data || []))
         .catch(err => console.error("Error cargando partidos", err));
    } else {
      setCountiesDB([]); 
    }
  }, [formData.provincia]);

  // effect en cascada: Si cambia el Partido, buscamos sus Localidades
  useEffect(() => {
    if (formData.partido) {
      api.get(`/cities/${formData.partido}`)
         .then(res => setCitiesDB(res.data || []))
         .catch(err => console.error("Error cargando localidades", err));
    } else {
      setCitiesDB([]);
    }
  }, [formData.partido]);

  // =========================================================================
  // 4. LÓGICA CONDICIONAL DE ROLES
  // =========================================================================
  const hasBusinessRole = formData.roles.some(roleName => roleName.includes('Emprendedor') || roleName.includes('Empresario'));
  const isReferente = formData.roles.some(roleName => roleName.includes('Referente Institucional'));
  const isOtro = formData.roles.some(roleName => {
    return !roleName.includes('Emprendedor') && !roleName.includes('Empresario') && !roleName.includes('Referente Institucional');
  });

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
  // 5. MANEJADORES DE EVENTOS
  // =========================================================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      if (name === 'provincia') {
        // Si cambia la provincia, borramos el partido y la localidad que había elegido
        setFormData(prev => ({ ...prev, provincia: value, partido: '', localidad: '' }));
      } else if (name === 'partido') {
        // Si cambia el partido, borramos la localidad
        setFormData(prev => ({ ...prev, partido: value, localidad: '' }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
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

  const handleAddRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRoleId = e.target.value; 
    if (newRoleId && !formData.roles.includes(newRoleId)) {
      setFormData(prev => ({ ...prev, roles: [...prev.roles, newRoleId] }));
    }
    e.target.value = ""; 
  };

  const handleRemoveRole = (roleIdToRemove: string) => {
    setFormData(prev => ({ ...prev, roles: prev.roles.filter(id => id !== roleIdToRemove) }));
  };

  const toggleSection = (section: number) => {
    setOpenSection(prev => prev === section ? 0 : section);
  };

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden. Por favor, verifíquelas.');
      setOpenSection(7);
      return;
    }

    if (formData.roles.length === 0) {
      setError('Debes seleccionar al menos un rol en la sección de Perfil.');
      setOpenSection(3);
      return;
    }

    if (cvFile && cvFile.size > 10 * 1024 * 1024) {
      setError('El Curriculum Vitae excede el tamaño máximo permitido de 10 MB.');
      setOpenSection(4);
      return;
    }

    setIsLoading(true);

    try {
      const submitData = new FormData();

      submitData.append('firstName', formData.nombre);
      submitData.append('lastName', formData.apellido);
      submitData.append('email', formData.email);
      submitData.append('password', formData.password);
      submitData.append('birthDate', formData.fechaNacimiento);
      submitData.append('typeDocument', formData.tipoDocumento); 
      submitData.append('numberDocument', formData.numeroDocumento);
      submitData.append('cuilCuit', formData.cuil);
      submitData.append('gender', formData.genero); 
      submitData.append('roles', JSON.stringify(formData.roles)); 
      
      if (isReferente) {
        submitData.append('institucionReferente', formData.institucionReferente);
      }

      if (cvFile) {
        submitData.append('cvFile', cvFile);
      }

      const response = await api.post('/register', submitData);
      const data = response.data;

      const token = data.access_token || data.token;
      if (token) {
        document.cookie = `auth_token=${token}; path=/; max-age=604800; SameSite=Strict; Secure`;
      }

      setSuccess(true);
      
      setTimeout(() => { 
        window.location.href = token ? '/perfil' : '/ingresar'; 
      }, 2000);

    } catch (err: any) {
      const backendMessage = err.response?.data?.message;
      setError(backendMessage || 'Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 flex justify-center items-center fade-in">
      <div className="bg-white w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh]">
        
        {/* ================= PANEL IZQUIERDO ================= */}
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

        {/* ================= FORMULARIO DERECHO ================= */}
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
                    <label className="block text-gray-700 text-xs font-bold mb-1">Tipo de documento *</label>
                    <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white">
                      <option value="" disabled>Seleccionar</option>
                      {docTypesDB.map((doc: any) => (
                        <option key={doc.id_DocumentType} value={doc.id_DocumentType}>
                          {doc.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Número de documento *</label>
                    <input type="text" name="numeroDocumento" placeholder="Ej: 29333444" value={formData.numeroDocumento} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">CUIL/T *</label>
                    <input type="text" name="cuil" placeholder="Ej: 20293334445" value={formData.cuil} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Género *</label>
                    <select name="genero" value={formData.genero} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white">
                      <option value="" disabled>Seleccionar</option>
                      {gendersDB.map((gen: any) => (
                        <option key={gen.id_gender} value={gen.id_gender}>
                          {gen.description}
                        </option>
                      ))}
                    </select>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* País */}
                  <div className="lg:col-span-2">
                    <label className="block text-gray-700 text-xs font-bold mb-1">País *</label>
                    {/* CORRECCIÓN: Verificamos mounted para solucionar hidratación */}
                    {mounted && (
                      <Select
                        instanceId="select-pais"
                        options={countriesDB.map(c => ({ value: c.id_country, label: c.name }))}
                        onChange={(opt: any) => handleChange({ target: { name: 'pais', value: opt.value } } as any)}
                        placeholder="Buscar país..."
                        isSearchable
                        className="text-sm"
                      />
                    )}
                  </div>

                  {/* Provincia */}
                  <div className="lg:col-span-2">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Provincia *</label>
                    {mounted && (
                      <Select
                        instanceId="select-provincia"
                        options={provincesDB.map(p => ({ value: p.id_province, label: p.name }))}
                        onChange={(opt: any) => handleChange({ target: { name: 'provincia', value: opt.value } } as any)}
                        placeholder="Buscar provincia..."
                        isSearchable
                        className="text-sm"
                      />
                    )}
                  </div>

                  {/* Partido */}
                  <div className="lg:col-span-2">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Partido / Departamento *</label>
                    {mounted && (
                      <Select
                        instanceId="select-partido"
                        options={countiesDB.map(c => ({ value: c.id_county, label: c.name }))}
                        onChange={(opt: any) => handleChange({ target: { name: 'partido', value: opt.value } } as any)}
                        isDisabled={!formData.provincia}
                        placeholder={formData.provincia ? "Buscar partido..." : "Primero seleccione provincia..."}
                        isSearchable
                        className="text-sm"
                      />
                    )}
                  </div>

                  {/* Localidad */}
                  <div className="lg:col-span-2">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Localidad / Ciudad *</label>
                    {mounted && (
                      <Select
                        instanceId="select-localidad"
                        options={citiesDB.map(c => ({ value: c.id_city, label: c.name }))}
                        onChange={(opt: any) => handleChange({ target: { name: 'localidad', value: opt.value } } as any)}
                        isDisabled={!formData.partido}
                        placeholder={formData.partido ? "Buscar localidad..." : "Primero seleccione partido..."}
                        isSearchable
                        className="text-sm"
                      />
                    )}
                  </div>
                  
                  <div className="lg:col-span-4 mt-2">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Domicilio *</label>
                    <input type="text" name="domicilio" value={formData.domicilio} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded bg-white" placeholder="Ej: Av. Colón 1234" />
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
                <div className="mb-6 border-b border-blue-200/50 pb-6">
                  <label className="block text-gray-800 text-sm font-bold mb-3">Tus roles seleccionados *</label>
                  
                  {formData.roles.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.roles.map(roleName => (
                        <span key={roleName} className="bg-brand-teal text-white px-3 py-1.5 rounded-full text-sm flex items-center shadow-sm">
                          {roleName}
                          <button type="button" onClick={() => handleRemoveRole(roleName)} className="ml-2 text-white/80 hover:text-white transition">
                            <i className="fas fa-times-circle"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                   ) : (
                    <p className="text-sm text-gray-500 mb-4 italic bg-white p-3 rounded border border-dashed border-gray-300">
                      Aún no has seleccionado ningún rol.
                    </p>
                  )}
                  
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-gray-800 text-xs font-bold text-gray-500">Añadir otro rol a tu perfil</label>
                    <button 
                      type="button" 
                      onClick={() => setShowRoleGuide(true)}
                      className="text-xs text-brand-teal hover:text-brand-dark transition font-medium flex items-center bg-blue-50/50 hover:bg-blue-100 px-2 py-1 rounded shadow-sm"
                    >
                      <i className="fas fa-question-circle mr-1"></i> ¿Qué es cada rol?
                    </button>
                  </div>

                  <select 
                    value="" 
                    onChange={handleAddRole} 
                    className="w-full md:w-1/2 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white shadow-sm font-medium focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                  >
                    <option value="" disabled>-- Seleccionar Rol --</option>
                    {rolesDB.map((rol: any) => {
                      const name = rol.name;
                      const isBusiness = name.includes('Emprendedor') || name.includes('Empresario');
                      
                      const isDisabled = formData.roles.includes(name) || (isBusiness && hasBusinessRole);

                      return (
                        <option key={name} value={name} disabled={isDisabled}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                  
                  {hasBusinessRole && (
                    <p className="text-xs text-brand-dark mt-2 bg-blue-50 inline-block px-2 py-1 rounded border border-blue-100">
                      <i className="fas fa-info-circle mr-1"></i> 
                      Has seleccionado un rol de negocio. Se tomará este como tu nivel máximo de experiencia.
                    </p>
                  )}
                </div>
                <div className="space-y-6">
                  {hasBusinessRole && (
                    <div className="space-y-4 animate-fade-in pl-4 border-l-2 border-brand-teal">
                      <h4 className="text-brand-teal font-bold text-sm mb-2"><i className="fas fa-briefcase"></i> Datos de Emprendimiento/Empresa</h4>
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
                      <h4 className="text-brand-magenta font-bold text-sm mb-2"><i className="fas fa-building"></i> Datos de Institución (Referente)</h4>
                      <div>
                        <label className="block text-gray-700 text-xs font-bold mb-2">¿A qué institución pertenece?</label>
                        <select name="institucionReferente" value={formData.institucionReferente} onChange={handleChange} className="w-full md:w-1/2 px-3 py-2 text-sm border rounded bg-white">
                          <option value="">Seleccionar institución...</option>
                          {institutionsDB.map((inst: any) => (
                            <option key={inst.id_institution} value={inst.id_institution}>
                              {inst.name}
                            </option>
                          ))}
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

                  {isOtro && (
                    <div className="space-y-4 animate-fade-in pl-4 border-l-2 border-gray-400">
                      <h4 className="text-gray-600 font-bold text-sm mb-2"><i className="fas fa-users"></i> Motivaciones de Participación</h4>
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
                    {hasBusinessRole ? 'Cursos realizados (Selección múltiple)' : 'Cursos realizados relacionados con el acompañamiento a emprendedores:'}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                    {hasBusinessRole ? (
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
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <label className="block text-gray-700 text-xs font-bold mb-1">Curriculum Vitae (Opcional)</label>
                  <p className="text-xs text-gray-500 mb-2">Formato: PDF. Máx. 10 MB.</p>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={(e) => setCvFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-brand-teal/10 file:text-brand-teal hover:file:bg-brand-teal/20 transition cursor-pointer border border-gray-200 rounded-full bg-gray-50 p-1" 
                  />
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

      {/* --- MODAL: GUÍA DE ROLES --- */}
      {showRoleGuide && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm fade-in"
          onClick={() => setShowRoleGuide(false)} 
        >
          <div 
            className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative flex flex-col max-h-[90vh]" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button 
              onClick={() => setShowRoleGuide(false)} 
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition"
            >
              <i className="fas fa-times"></i>
            </button>
            
            {/* Cabecera del Modal */}
            <div className="mb-6 border-b border-gray-100 pb-4 pr-8 shrink-0">
              <h3 className="text-2xl font-bold font-heading text-gray-800">Guía de Roles</h3>
              <p className="text-sm text-gray-500 mt-1">Conoce en detalle qué significa cada rol dentro del ecosistema de Intecmar.</p>
            </div>
            
            {/* Lista Scrolleable (El .map de las descripciones) */}
            <div className="overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {rolesDB.map((rol: any, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-brand-teal/30 transition">
                  <h4 className="font-bold text-brand-teal text-base mb-1">{rol.name}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {rol.description || 'Sin descripción disponible.'}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Pie del Modal */}
            <div className="pt-6 mt-2 border-t border-gray-100 flex justify-end shrink-0">
              <button 
                onClick={() => setShowRoleGuide(false)}
                className="px-6 py-2.5 bg-brand-dark text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition shadow-md"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}