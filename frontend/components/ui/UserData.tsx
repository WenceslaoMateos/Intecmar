'use client';

interface UserDataProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    birthDate?: string;
    cuilCuit?: string;
    documentTypeName?: string;
    numberDocument?: string;
    genderName?: string;
    address?: string;
    cityName?: string;
    provinceName?: string;
    countryName?: string;
    cvFileName?: string;
    roles: string[];
  };
}

export const UserData = ({ user }: UserDataProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      
      {/* Título de la sección */}
      <div className="border-b border-gray-100 pb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-800 font-heading">Información Personal y de Registro</h3>
          <p className="text-xs text-gray-500">Datos registrados en el sistema bajo tu cuenta de usuario.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        
        {/* Datos Básicos */}
        <div className="space-y-4">
          <h4 className="font-bold text-brand-teal text-xs uppercase tracking-wider">1. Datos Personales</h4>
          
          <div>
            <span className="block text-gray-400 text-xs">Nombre y Apellido</span>
            <span className="font-medium text-gray-800">{user.firstName} {user.lastName}</span>
          </div>

          <div>
            <span className="block text-gray-400 text-xs">Correo Electrónico</span>
            <span className="font-medium text-gray-800">{user.email}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="block text-gray-400 text-xs">Fecha de Nacimiento</span>
              <span className="font-medium text-gray-800">{user.birthDate || 'No especificada'}</span>
            </div>
            <div>
              <span className="block text-gray-400 text-xs">Género</span>
              <span className="font-medium text-gray-800">{user.genderName || 'No especificado'}</span>
            </div>
          </div>
        </div>

        {/* Identificación y Documentación */}
        <div className="space-y-4">
          <h4 className="font-bold text-brand-teal text-xs uppercase tracking-wider">2. Identificación y Fiscal</h4>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="block text-gray-400 text-xs">Tipo y Nro. de Documento</span>
              <span className="font-medium text-gray-800">{user.documentTypeName || 'DNI'} {user.numberDocument || '-'}</span>
            </div>
            <div>
              <span className="block text-gray-400 text-xs">CUIL / CUIT</span>
              <span className="font-medium text-gray-800">{user.cuilCuit || 'No cargado'}</span>
            </div>
          </div>

          <div>
            <span className="block text-gray-400 text-xs">Currículum Vitae Adjunto</span>
            {user.cvFileName ? (
              <a href={`/uploads/${user.cvFileName}`} target="_blank" rel="noopener noreferrer" className="text-brand-teal font-medium hover:underline flex items-center gap-1 mt-0.5">
                <i className="fas fa-file-pdf text-red-500"></i> Ver CV Actual
              </a>
            ) : (
              <span className="text-gray-400 italic text-xs">Sin archivo adjunto</span>
            )}
          </div>
        </div>

      </div>

      {/* Domicilio y Localización */}
      <div className="pt-4 border-t border-gray-100 space-y-4">
        <h4 className="font-bold text-brand-teal text-xs uppercase tracking-wider">3. Ubicación y Domicilio</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="block text-gray-400 text-xs">Dirección</span>
            <span className="font-medium text-gray-800">{user.address || 'No especificada'}</span>
          </div>
          <div>
            <span className="block text-gray-400 text-xs">Localidad / Partido</span>
            <span className="font-medium text-gray-800">{user.cityName || '-'} ({user.provinceName || '-'})</span>
          </div>
          <div>
            <span className="block text-gray-400 text-xs">País</span>
            <span className="font-medium text-gray-800">{user.countryName || 'Argentina'}</span>
          </div>
        </div>
      </div>

      {/* Roles Asignados */}
      <div className="pt-4 border-t border-gray-100 space-y-3">
        <h4 className="font-bold text-brand-teal text-xs uppercase tracking-wider">4. Roles en la Red</h4>
        <div className="flex flex-wrap gap-2">
          {user.roles && user.roles.length > 0 ? (
            user.roles.map((role, idx) => (
              <span key={idx} className="bg-blue-50 text-brand-teal border border-blue-200 text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                {role}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs italic">Sin roles activos asignados</span>
          )}
        </div>
      </div>

    </div>
  );
};