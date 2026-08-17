'use client';

import { useState } from 'react';
import Link from 'next/link';

// Definimos la interfaz TypeScript para las props del componente
interface ProjectCardProps {
  project: {
    id_project: number;
    name: string;
    fantasyName?: string;
    description: string;
    solution?: string;
    category: string;
    email?: string;
    webpage?: string;
    instagram?: string;
    linkedin?: string;
    isOwner: boolean; // ¿El usuario logueado es integrante de este proyecto?
  };
  isAdmin: boolean; // ¿El usuario logueado es Administrador del sistema?
}

export const ProjectCard = ({ project, isAdmin }: ProjectCardProps) => {
  const [interestRequested, setInterestRequested] = useState(false);

  // Regla de permisos: Puede ver la info privada si es integrante (isOwner) o si es Administrador
  const canViewPrivateInfo = project.isOwner || isAdmin;

  const handleRequestInterest = () => {
    // Aquí conectarás luego con tu endpoint del backend para registrar el interés
    setInterestRequested(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-300">
      
      {/* ========================================== */}
      {/* VISTA PÚBLICA (Información General)         */}
      {/* ========================================== */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
          <div>
            <span className="text-xs font-bold text-brand-teal uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
              {project.category}
            </span>
            <h3 className="text-xl font-bold text-gray-800 mt-2 font-heading">{project.name}</h3>
            {project.fantasyName && (
              <p className="text-xs text-gray-500 italic">({project.fantasyName})</p>
            )}
          </div>

          {/* Botonera de acciones rápidas */}
          <div className="flex items-center gap-2">
            {/* Si es el dueño, ve botón de editar */}
            {project.isOwner && (
              <Link 
                href={`/perfil/proyectos/editar/${project.id_project}`}
                className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:border-brand-teal hover:text-brand-teal transition font-bold shadow-sm"
              >
                <i className="fas fa-pen mr-1"></i> Editar
              </Link>
            )}

            {/* Si no es integrante ni admin, cuenta con el Botón de Interés */}
            {!canViewPrivateInfo && (
              <button 
                onClick={handleRequestInterest}
                disabled={interestRequested}
                className={`text-xs px-4 py-2 rounded-lg font-bold transition shadow-sm ${
                  interestRequested 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                    : 'bg-brand-dark text-white hover:bg-gray-800'
                }`}
              >
                {interestRequested ? (
                  <><i className="fas fa-check mr-1"></i> Solicitud Enviada</>
                ) : (
                  'Quiero ser parte'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Descripción general pública */}
        <p className="text-gray-600 text-sm leading-relaxed mt-3">
          {project.description}
        </p>

        {/* Redes y contacto público básico */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-gray-400 text-sm">
          {project.webpage && (
            <a href={project.webpage} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition">
              <i className="fas fa-globe"></i>
            </a>
          )}
          {project.linkedin && (
            <a href={project.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition">
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {project.instagram && (
            <a href={project.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition">
              <i className="fab fa-instagram"></i>
            </a>
          )}
        </div>
      </div>

      {/* ========================================== */}
      {/* VISTA PRIVADA (Información Completa)       */}
      {/* ========================================== */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        {canViewPrivateInfo ? (
          <div className="space-y-3 fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <i className="fas fa-lock-open text-[10px]"></i> Vista Privada (Autorizado)
              </span>
            </div>

            {project.solution && (
              <div className="text-sm">
                <span className="font-bold text-gray-700 block text-xs uppercase tracking-wider">Solución Propuesta:</span>
                <p className="text-gray-600 mt-1">{project.solution}</p>
              </div>
            )}

            <div className="pt-2 text-xs text-gray-500 flex items-center gap-4">
              <span><i className="fas fa-envelope mr-1 text-gray-400"></i> {project.email || 'Sin email de contacto'}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-gray-400 text-xs py-1">
            <span className="flex items-center gap-2">
              <i className="fas fa-lock text-gray-400"></i> Información confidencial restringida a integrantes y administración.
            </span>
          </div>
        )}
      </div>

    </div>
  );
};