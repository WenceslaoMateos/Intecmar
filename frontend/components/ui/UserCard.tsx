'use client';

import Link from 'next/link';

interface UserCardProps {
  user: {
    id_user: number;
    firstName: string;
    lastName: string;
    roles: string[]; // Ej: ['Investigador/a', 'Mentor/a']
    educationLevel?: string; // Ej: "Universitario Completo"
    degree?: string; // Ej: "Ingeniería Informática"
    knowledgeArea?: string; // Ej: "Tecnología y Sistemas"
    email?: string;
    avatarUrl?: string;
  };
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition duration-300 flex flex-col justify-between">
      
      {/* Cabecera del Usuario: Avatar y Nombre */}
      <div className="flex items-start gap-4">
        <img 
          src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=0f3c4c&color=fff`} 
          alt={`${user.firstName} ${user.lastName}`}
          className="w-14 h-14 rounded-full border-2 border-white shadow-sm shrink-0 object-cover"
        />
        
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-gray-800 text-base truncate">
            {user.firstName} {user.lastName}
          </h4>
          
          {/* Roles del usuario (Badges) */}
          <div className="flex flex-wrap gap-1 mt-1">
            {user.roles.map((role, index) => (
              <span key={index} className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-md">
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Formación y Experiencia Profesional */}
      <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
        {user.degree && (
          <p className="flex items-center truncate">
            <i className="fas fa-graduation-cap text-brand-teal w-4 mr-2 shrink-0"></i>
            <span className="font-medium text-gray-700">{user.degree}</span> 
            {user.educationLevel && <span className="text-gray-400 ml-1">({user.educationLevel})</span>}
          </p>
        )}
        
        {user.knowledgeArea && (
          <p className="flex items-center truncate">
            <i className="fas fa-brain text-brand-teal w-4 mr-2 shrink-0"></i>
            <span>Área: {user.knowledgeArea}</span>
          </p>
        )}
      </div>

      {/* Botones de Acción (Contacto / Ver Perfil) */}
      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
        {user.email && (
          <a 
            href={`mailto:${user.email}`} 
            className="flex-1 text-center text-xs bg-gray-50 border border-gray-200 text-gray-700 font-bold py-1.5 rounded-lg hover:border-brand-teal hover:text-brand-teal transition shadow-sm"
          >
            <i className="fas fa-envelope mr-1"></i> Contactar
          </a>
        )}
        
        <Link 
          href={`/perfil/${user.id_user}`}
          className="text-xs bg-brand-dark text-white font-bold px-4 py-1.5 rounded-lg hover:bg-gray-800 transition shadow-sm"
        >
          Ver Perfil
        </Link>
      </div>

    </div>
  );
};