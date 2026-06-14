'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProyectoNuevoPage() {
  const [formData, setFormData] = useState({
    nombreProyecto: '', nombreFantasia: '', emailProyecto: '', web: '', instagram: '', redesExtra: '',
    propuestaValor: '', solucionPropuesta: '', beneficiosCliente: '',
    categoria: '', comercializa: '', productosDesc: '', recursosActuales: '', anioInicio: '',
    tipoUbicacion: 'Física', domicilio: '', localidad: '', partido: '', provincia: '', pais: '',
    esFormalizado: 'NO', anioFormalizacion: '', cuit: '', tipoEmpresa: '',
    repNombre: '', repNacimiento: '', repDni: '', repTelefono: '', repEmail: '',
    cantidadColaboradores: '', cantidadSocios: '',
    prodOperaciones: '', ventasComercializacion: '', administracion: '', idTecnologia: '', otrasAreas: '',
    descEquipo: '', expPreviaEquipo: '', vinculacionesInstitucionales: '', otrasAlianzas: '',
    motivacionDesarrollo: '', areaInnovacion: '', gradoInnovacion: '',
    valProblema: '', valSegmento: '', valSolucion: '', valPropuesta: '', valModelo: '', valMVP: '',
    valLab: '', valCampo: '', valPlanta: '', valRecursos: '', validacionesAdicionales: [] as string[],
    trl: '', avanceNegocio: '', escalabilidad: '', resultadosEsperados: '',
    esTripleImpacto: 'NO', partMinorias: '', impactoGrupos: '', propositoODS: '',
    impactoEconomico: '', impactoMedioambiental: '', impactoSocial: '', certificaciones: [] as string[],
    propiedadIntelectual: [] as string[], primerasVentas: '', clientesRecurrentes: '', cantClientesRecurrentes: '',
    apoyoInstitucional: '', tipoApoyo: '', instApoyo: '', recibioFinanciamiento: '', instFinanciamiento: '', fuenteFinanciamiento: '',
    necesidades: [] as string[],
  });

  const [files, setFiles] = useState({
    constanciaAfip: null as File | null,
    cartaAval: null as File | null,
    mvpFiles: null as File | null,
    desarrolloTech: null as File | null,
    planNegocios: null as File | null,
    registroPI: null as File | null,
  });

  const [openSection, setOpenSection] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (field: string, value: string) => {
    setFormData(prev => {
      const array = prev[field as keyof typeof prev] as string[];
      if (array.includes(value)) {
        return { ...prev, [field]: array.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...array, value] };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setError('');
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError(`El archivo para ${fieldName} excede el límite de 10MB.`);
        return;
      }
      setFiles(prev => ({ ...prev, [fieldName]: selectedFile }));
    }
  };

  const toggleSection = (section: number) => {
    setOpenSection(prev => prev === section ? 0 : section);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      console.log('Datos del Proyecto listos para enviar:', formData);
      console.log('Archivos adjuntos:', files);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/perfil';
      }, 2000);
    } catch (err) {
      setError('Ocurrió un error al guardar el proyecto. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const menuItems = [
    { id: 1, title: '1. Información General' },
    { id: 2, title: '2. Formalización y Representante' },
    { id: 3, title: '3. Equipo Emprendedor' },
    { id: 4, title: '4. Innovación y Validaciones' },
    { id: 5, title: '5. Impacto y Sostenibilidad' },
    { id: 6, title: '6. Ecosistema y Necesidades' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 flex justify-center items-center fade-in">
      <div className="bg-white w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh]">

        {/* ================= PANEL IZQUIERDO ================= */}
        <div className="w-full md:w-1/4 bg-brand-dark p-6 lg:p-10 text-white flex-col relative overflow-hidden hidden md:flex shrink-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="relative z-10 mb-6 shrink-0">
            <Link
              href="/perfil"
              className="text-gray-300 hover:text-white transition flex items-center gap-2 text-xs font-bold mb-6 opacity-80 hover:opacity-100"
            >
              <i className="fas fa-arrow-left"></i> Volver al perfil
            </Link>

            <h3 className="text-2xl lg:text-3xl font-bold mb-3 font-heading leading-tight">
              Registrar<br />Proyecto
            </h3>

            <p className="text-gray-300 text-xs lg:text-sm leading-relaxed">
              Completá la información para sumar tu iniciativa al ecosistema de Intecmar.
            </p>
          </div>

          <hr className="border-gray-700 relative z-10 mb-6 opacity-50 shrink-0" />

          <div className="relative z-10 flex-grow overflow-y-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <h4 className="text-xs uppercase tracking-wider font-bold mb-4 text-gray-400">
              Progreso del formulario
            </h4>

            <ul className="space-y-3 text-xs font-medium">
              {menuItems.map(item => (
                <li
                  key={item.id}
                  className={`flex items-center cursor-pointer transition-all duration-200 ${
                    openSection === item.id
                      ? 'text-brand-teal font-bold scale-105 origin-left'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
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
        <div className="w-full md:w-3/4 p-6 md:p-10 overflow-y-auto bg-gray-50/50 custom-scrollbar relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-heading">Ficha Técnica del Proyecto</h2>
          <p className="text-sm text-gray-500 mb-8 pb-4 border-b border-gray-200">
            Haz clic en cada sección para completarla. Los campos con (*) son obligatorios.
          </p>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm">
              <i className="fas fa-exclamation-circle mr-2"></i> {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border-l-4 border-brand-success text-green-700 p-3 rounded mb-6 text-sm">
              <i className="fas fa-check-circle mr-2"></i> ¡Proyecto guardado exitosamente! Redirigiendo...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* --- SECCIÓN 1: INFORMACIÓN GENERAL --- */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection(1)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-bold text-brand-teal font-heading">
                  <i className="fas fa-info-circle mr-2"></i> 1. Información General y Ubicación
                </h3>
                <i className={`fas fa-chevron-${openSection === 1 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 1 ? 'block' : 'hidden'} p-6 border-t border-gray-200 animate-fade-in`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Nombre del proyecto / empresa *</label>
                    <input
                      type="text"
                      name="nombreProyecto"
                      value={formData.nombreProyecto}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Nombre de Fantasía</label>
                    <p className="text-[10px] text-gray-500 mb-1">Si el nombre comercial coincide con la razón social, dejalo en blanco.</p>
                    <input
                      type="text"
                      name="nombreFantasia"
                      value={formData.nombreFantasia}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">E-mail del proyecto *</label>
                    <input
                      type="email"
                      name="emailProyecto"
                      value={formData.emailProyecto}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Página Web</label>
                    <input
                      type="text"
                      name="web"
                      value={formData.web}
                      onChange={handleChange}
                      placeholder="https://"
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Instagram</label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="@miproyecto"
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Año de inicio *</label>
                    <input
                      type="number"
                      name="anioInicio"
                      value={formData.anioInicio}
                      onChange={handleChange}
                      required
                      placeholder="Ej: 2023"
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    />
                  </div>

                  <div className="md:col-span-2 mt-4">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Descripción del proyecto (Propuesta de valor) *</label>
                    <p className="text-[10px] text-gray-500 mb-1">¿Qué hace tu proyecto y qué valor genera? (Máx. 150 palabras)</p>
                    <textarea
                      name="propuestaValor"
                      value={formData.propuestaValor}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 text-sm border rounded bg-white resize-none"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Solución propuesta *</label>
                    <p className="text-[10px] text-gray-500 mb-1">¿Cuál es la solución que ofrecés para los problemas identificados?</p>
                    <textarea
                      name="solucionPropuesta"
                      value={formData.solucionPropuesta}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 text-sm border rounded bg-white resize-none"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2 mt-2 border-t border-gray-100 pt-4">
                    <label className="block text-gray-700 text-xs font-bold mb-2">Categoría del proyecto *</label>
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    >
                      <option value="" disabled>Seleccionar...</option>
                      <option value="Idea">Idea (Pre-semilla)</option>
                      <option value="Validacion">Validación de prototipo (Semilla / MVP)</option>
                      <option value="Start-up">Crecimiento temprano (Start-up)</option>
                      <option value="Madurez">Escala / Madurez (Empresa consolidada)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 mt-2 border-t border-gray-100 pt-4">
                    <label className="block text-gray-700 text-xs font-bold mb-2">Tipo de ubicación *</label>
                    <div className="flex gap-4">
                      <label className="flex items-center text-sm">
                        <input
                          type="radio"
                          name="tipoUbicacion"
                          value="Física"
                          checked={formData.tipoUbicacion === 'Física'}
                          onChange={handleChange}
                          className="mr-2 text-brand-teal"
                        />
                        Física
                      </label>
                      <label className="flex items-center text-sm">
                        <input
                          type="radio"
                          name="tipoUbicacion"
                          value="Virtual"
                          checked={formData.tipoUbicacion === 'Virtual'}
                          onChange={handleChange}
                          className="mr-2 text-brand-teal"
                        />
                        Virtual
                      </label>
                    </div>
                  </div>

                  {formData.tipoUbicacion === 'Física' && (
                    <>
                      <div>
                        <label className="block text-gray-700 text-xs font-bold mb-1">Domicilio *</label>
                        <input
                          type="text"
                          name="domicilio"
                          value={formData.domicilio}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 text-sm border rounded bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-xs font-bold mb-1">Provincia *</label>
                        <input
                          type="text"
                          name="provincia"
                          value={formData.provincia}
                          onChange={handleChange}
                          required
                          placeholder="Ej: Buenos Aires"
                          className="w-full px-3 py-2 text-sm border rounded bg-white"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* --- SECCIÓN 2: FORMALIZACIÓN --- */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection(2)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-bold text-brand-teal font-heading">
                  <i className="fas fa-file-contract mr-2"></i> 2. Formalización y Representante Legal
                </h3>
                <i className={`fas fa-chevron-${openSection === 2 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 2 ? 'block' : 'hidden'} p-6 border-t border-gray-200 animate-fade-in`}>

                <div className="mb-6 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                  <label className="block text-gray-800 text-sm font-bold mb-3">¿El emprendimiento está formalizado? *</label>
                  <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700">
                      <input
                        type="radio"
                        name="esFormalizado"
                        value="SI"
                        checked={formData.esFormalizado === 'SI'}
                        onChange={handleChange}
                        className="mr-2 w-4 h-4 text-brand-teal focus:ring-brand-teal"
                      />
                      SÍ, ES UNA EMPRESA
                    </label>
                    <label className="flex items-center cursor-pointer text-sm font-medium text-gray-700">
                      <input
                        type="radio"
                        name="esFormalizado"
                        value="NO"
                        checked={formData.esFormalizado === 'NO'}
                        onChange={handleChange}
                        className="mr-2 w-4 h-4 text-brand-teal focus:ring-brand-teal"
                      />
                      NO, ES UN PROYECTO
                    </label>
                  </div>
                </div>

                {formData.esFormalizado === 'SI' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in border-l-2 border-brand-teal pl-4 ml-2">
                    <div>
                      <label className="block text-gray-700 text-xs font-bold mb-1">Año de formalización *</label>
                      <input
                        type="number"
                        name="anioFormalizacion"
                        value={formData.anioFormalizacion}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-xs font-bold mb-1">CUIT (Sin guiones) *</label>
                      <input
                        type="text"
                        name="cuit"
                        value={formData.cuit}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-xs font-bold mb-1">Tipo de empresa *</label>
                      <select
                        name="tipoEmpresa"
                        value={formData.tipoEmpresa}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border rounded bg-white"
                      >
                        <option value="">Seleccionar...</option>
                        <option value="SA">SA</option>
                        <option value="SRL">SRL</option>
                        <option value="SAS">SAS</option>
                        <option value="Cooperativa">Cooperativa</option>
                        <option value="UP">UP</option>
                        <option value="Otra">Otra</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-xs font-bold mb-1">Constancia AFIP/ARCA *</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={e => handleFileChange(e, 'constanciaAfip')}
                        required
                        className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                      />
                    </div>

                    <div className="md:col-span-2 mt-4 border-t border-gray-100 pt-4">
                      <h4 className="font-bold text-brand-dark text-sm mb-3">Datos del Representante Legal</h4>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-xs font-bold mb-1">Apellido y Nombre *</label>
                      <input
                        type="text"
                        name="repNombre"
                        value={formData.repNombre}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-xs font-bold mb-1">DNI *</label>
                      <input
                        type="text"
                        name="repDni"
                        value={formData.repDni}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-xs font-bold mb-1">Teléfono *</label>
                      <input
                        type="text"
                        name="repTelefono"
                        value={formData.repTelefono}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-xs font-bold mb-1">Carta Aval (PDF)</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={e => handleFileChange(e, 'cartaAval')}
                        className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                      />
                    </div>
                  </div>
                )}
                {formData.esFormalizado === 'NO' && (
                  <p className="text-sm text-gray-500 italic px-4">Al no estar formalizado, no se requieren datos legales por el momento.</p>
                )}
              </div>
            </section>

            {/* --- SECCIÓN 3: EQUIPO --- */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection(3)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-bold text-brand-teal font-heading">
                  <i className="fas fa-users mr-2"></i> 3. Equipo Emprendedor
                </h3>
                <i className={`fas fa-chevron-${openSection === 3 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 3 ? 'block' : 'hidden'} p-6 border-t border-gray-200 animate-fade-in`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Cantidad total de colaboradores *</label>
                    <input
                      type="number"
                      name="cantidadColaboradores"
                      value={formData.cantidadColaboradores}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Cantidad de socios (toma de decisiones) *</label>
                    <input
                      type="number"
                      name="cantidadSocios"
                      value={formData.cantidadSocios}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    />
                  </div>

                  <div className="md:col-span-2 mt-4 border-t border-gray-100 pt-4">
                    <label className="block text-gray-700 text-xs font-bold mb-2">Vinculaciones institucionales *</label>
                    <p className="text-[10px] text-gray-500 mb-2">¿Está vinculado con Univ., CONICET, INTI, etc.? Describa brevemente.</p>
                    <textarea
                      name="vinculacionesInstitucionales"
                      value={formData.vinculacionesInstitucionales}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full px-3 py-2 text-sm border rounded bg-white resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </section>

            {/* --- SECCIÓN 4: INNOVACIÓN Y VALIDACIONES --- */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection(4)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-bold text-brand-teal font-heading">
                  <i className="fas fa-lightbulb mr-2"></i> 4. Innovación y Validaciones
                </h3>
                <i className={`fas fa-chevron-${openSection === 4 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 4 ? 'block' : 'hidden'} p-6 border-t border-gray-200 animate-fade-in`}>

                <h4 className="font-bold text-gray-800 text-sm mb-3">Grado y área de innovación</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Área dirigida *</label>
                    <select
                      name="areaInnovacion"
                      value={formData.areaInnovacion}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Producto">Producto</option>
                      <option value="Servicio">Servicio</option>
                      <option value="Proceso">Proceso</option>
                      <option value="Modelo de Negocios">Modelo de Negocios</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">Grado de Innovación *</label>
                    <select
                      name="gradoInnovacion"
                      value={formData.gradoInnovacion}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Incremental">Incremental</option>
                      <option value="Modular">Modular</option>
                      <option value="Radical">Radical</option>
                      <option value="Disruptiva">Disruptiva</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <h4 className="font-bold text-gray-800 text-sm mb-3">Validaciones de Negocio (Responder SÍ/NO)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                    {[
                      { label: '¿Problema validado?', name: 'valProblema' },
                      { label: '¿Segmento definido?', name: 'valSegmento' },
                      { label: '¿Solución validada?', name: 'valSolucion' },
                      { label: '¿Contás con MVP?',    name: 'valMVP'      },
                    ].map(({ label, name }) => (
                      <div key={name} className="flex justify-between border-b border-gray-50 pb-2">
                        <span className="text-gray-600">{label}</span>
                        <select
                          name={name}
                          value={formData[name as keyof typeof formData] as string}
                          onChange={handleChange}
                          className="border rounded bg-white text-xs px-2 py-1"
                        >
                          <option value="">--</option>
                          <option value="SI">SÍ</option>
                          <option value="NO">NO</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <label className="block text-gray-700 text-xs font-bold mb-1">Grado de Madurez Tecnológica (TRL) *</label>
                  <select
                    name="trl"
                    value={formData.trl}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border rounded bg-white"
                  >
                    <option value="">Seleccionar nivel TRL...</option>
                    <option value="1">TRL 1 - Principios básicos</option>
                    <option value="3">TRL 3 - Pruebas de laboratorio iniciales</option>
                    <option value="6">TRL 6 - Prototipo funcional probado</option>
                    <option value="9">TRL 9 - Sistema operando plenamente</option>
                  </select>
                </div>
              </div>
            </section>

            {/* --- SECCIÓN 5: IMPACTO Y SOSTENIBILIDAD --- */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection(5)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-bold text-brand-teal font-heading">
                  <i className="fas fa-leaf mr-2"></i> 5. Impacto y Sostenibilidad
                </h3>
                <i className={`fas fa-chevron-${openSection === 5 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 5 ? 'block' : 'hidden'} p-6 border-t border-gray-200 animate-fade-in`}>

                <div className="mb-4">
                  <label className="block text-gray-800 text-sm font-bold mb-2">¿Es un proyecto de Triple Impacto? *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="esTripleImpacto"
                        value="SI"
                        checked={formData.esTripleImpacto === 'SI'}
                        onChange={handleChange}
                        className="mr-2 text-brand-teal"
                      />
                      SÍ
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="esTripleImpacto"
                        value="NO"
                        checked={formData.esTripleImpacto === 'NO'}
                        onChange={handleChange}
                        className="mr-2 text-brand-teal"
                      />
                      NO
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Impacto Económico *</label>
                    <textarea
                      name="impactoEconomico"
                      value={formData.impactoEconomico}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Impacto Medioambiental *</label>
                    <textarea
                      name="impactoMedioambiental"
                      value={formData.impactoMedioambiental}
                      onChange={handleChange}
                      required
                      rows={2}
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    ></textarea>
                  </div>
                </div>
              </div>
            </section>

            {/* --- SECCIÓN 6: ECOSISTEMA --- */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleSection(6)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-bold text-brand-teal font-heading">
                  <i className="fas fa-handshake mr-2"></i> 6. Ecosistema y Necesidades
                </h3>
                <i className={`fas fa-chevron-${openSection === 6 ? 'up' : 'down'} text-gray-400`}></i>
              </button>
              <div className={`${openSection === 6 ? 'block' : 'hidden'} p-6 border-t border-gray-200 animate-fade-in`}>

                <div className="mb-6">
                  <label className="block text-gray-800 text-sm font-bold mb-3">¿En qué aspectos necesitás apoyo actualmente? *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    {[
                      'Asistencia en gestión (mentoría)',
                      'Presentación a financiamiento / subsidios',
                      'Búsqueda de proveedores / contactos',
                      'Capacitaciones técnicas',
                    ].map(necesidad => (
                      <label key={necesidad} className="flex items-start">
                        <input
                          type="checkbox"
                          checked={formData.necesidades.includes(necesidad)}
                          onChange={() => handleArrayChange('necesidades', necesidad)}
                          className="mt-1 mr-2 text-brand-teal rounded"
                        />
                        <span className="leading-tight">{necesidad}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">¿Recibió apoyo de instituciones?</label>
                    <select
                      name="apoyoInstitucional"
                      value={formData.apoyoInstitucional}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="SI">SÍ</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">¿Recibió financiamiento externo?</label>
                    <select
                      name="recibioFinanciamiento"
                      value={formData.recibioFinanciamiento}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border rounded bg-white"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="SI">SÍ</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* --- BOTONERA DE ENVÍO --- */}
            <div className="pt-8 mt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading || success}
                className="w-full bg-brand-teal text-white font-bold py-4 px-4 rounded-xl hover:bg-brand-dark transition shadow-lg flex justify-center items-center text-lg disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <i className="fas fa-circle-notch fa-spin mr-2"></i> Procesando Proyecto...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <i className="fas fa-save mr-2"></i> Registrar Proyecto en la Red
                  </span>
                )}
              </button>
              <p className="text-center mt-4 text-xs text-gray-400 pb-4">
                Al hacer clic en Registrar, confirmás que la información brindada es fidedigna.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}