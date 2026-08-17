'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { UserData } from '@/components/ui/UserData';

export default function PerfilPage() {
  
  // Estado dinámico para el rol de Administrador obtenido mediante JWT y Backend
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Datos simulados del usuario logueado (para el componente UserData)
  const [userData] = useState({
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@example.com",
    birthDate: "1992-05-15",
    cuilCuit: "20345678901",
    documentTypeName: "DNI",
    numberDocument: "34567890",
    genderName: "Masculino",
    address: "Av. Colón 2300",
    cityName: "Mar del Plata",
    provinceName: "Buenos Aires",
    countryName: "Argentina",
    cvFileName: "cv_juan_perez.pdf",
    roles: ["Emprendedor/a con empresa en marcha", "Desarrollador"]
  });

  // Datos simulados de los proyectos del usuario
  const [userProjects] = useState([
    { 
      id_project: 1, 
      name: "EcoSustrato", 
      fantasyName: "EcoSustratos S.A.",
      category: "Crecimiento temprano", 
      description: "Desarrollo de sustratos ecológicos a partir de residuos de la industria cervecera local.",
      solution: "Proceso biotecnológico de compostaje acelerado con subproductos industriales.",
      email: "contacto@ecosustrato.com",
      webpage: "https://ecosustrato.com",
      linkedin: "https://linkedin.com/company/ecosustrato",
      isOwner: true 
    },
    { 
      id_project: 2, 
      name: "App Deporte Local", 
      fantasyName: "MatchDeporte",
      category: "Validación de prototipo", 
      description: "Plataforma móvil para conectar deportistas amateurs y organizar partidos en la ciudad.",
      solution: "App nativa con pasarela de reservas de canchas y matching por nivel de juego.",
      email: "hola@deportelocal.ar",
      instagram: "https://instagram.com/deportelocal",
      isOwner: true 
    }
  ]);

  // Hook para verificar el rol real mediante el JWT y el endpoint del backend
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(c => c.trim().startsWith('auth_token='));
        
        if (tokenCookie) {
          const token = tokenCookie.split('=')[1];
          const payloadBase64 = token.split('.')[1];
          const decodedPayload = JSON.parse(atob(payloadBase64));
          const userId = decodedPayload.id_user || decodedPayload.sub; 

          if (userId) {
            const response = await fetch(`http://localhost:3000/roles/${userId}`, {
              headers: {
                'Authorization': `Bearer ${token}` 
              }
            });

            if (response.ok) {
              const roles = await response.json();
              const hasAdminRole = roles.some((r: any) => r.name === 'Administrador' || r.id_role === 1);
              setIsAdmin(hasAdminRole);
            }
          }
        }
      } catch (err) {
        console.error('Error al verificar roles en el perfil:', err);
      }
    };

    checkUserRole();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in">
      
      {/* ========================================== */}
      {/* COLUMNA IZQUIERDA (Perfil detallado y Proyectos) */}
      {/* ========================================== */}
      <div className="lg:col-span-2 space-y-6">
          
        {/* TARJETA DE PERFIL (Header visual + Componente UserData) */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          
          {/* Banner de fondo (Portada) */}
          <div className="h-32 bg-gradient-to-r from-brand-dark to-brand-teal relative">
          </div>
          
          <div className="px-6 pb-6 relative">
            {/* Foto de Perfil (Avatar) */}
            <div className="relative -mt-16 mb-4 flex justify-between items-end">
              <img 
                src="https://ui-avatars.com/api/?name=Juan+Perez&size=128&background=fff&color=0f3c4c" 
                alt="Juan Pérez"
                className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white object-cover"
              />
              
              <Link 
                href="/perfil/editar"
                className="text-xs bg-white border border-brand-teal text-brand-teal px-4 py-2 rounded-lg font-bold hover:bg-brand-teal hover:text-white transition shadow-sm flex items-center gap-1 mb-2"
              >
                <i className="fas fa-pen"></i> Editar Perfil
              </Link>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-800 font-heading leading-tight">Juan Pérez</h1>
              <p className="text-gray-600 font-medium mt-1">Emprendedor Tecnológico | Desarrollador Full Stack</p>
              <p className="text-gray-400 text-sm mt-1 flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-gray-300"></i> Mar del Plata, Argentina
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm mb-2 uppercase tracking-wider">Sobre mí</h3>
              <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                Apasionado por crear soluciones tecnológicas con impacto social. Actualmente enfocado en proyectos de economía circular y desarrollo web sostenible. Buscando mentores en el área de finanzas.
              </p>
            </div>
          </div>
        </div>


        {/* TIMELINE DE PROYECTOS (Integrando la ProjectCard modularizada) */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-800 font-heading flex items-center gap-2">
              <i className="fas fa-rocket text-brand-teal"></i> Mis Proyectos
            </h2>
            <Link 
              href="/perfil/proyectos/nuevo" 
              className="flex items-center gap-2 text-white bg-brand-magenta hover:bg-purple-800 px-5 py-2 rounded-full text-sm font-bold transition shadow-sm"
            >
              <i className="fas fa-plus"></i> Nuevo Proyecto
            </Link>
          </div>

          <div className="space-y-6">
            {userProjects.map((proj) => (
              <ProjectCard 
                key={proj.id_project} 
                project={proj} 
                isAdmin={isAdmin} 
              />
            ))}
          </div>
        </div>

      </div>

     </div> 
  );
}