'use client';

import { useState } from 'react';

export default function UsuariosPage() {
  
  // 1. Datos simulados de los usuarios de la red
  const [users] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@gmail.com", initials: "JP", role: "Emprendedor", roleColor: "bg-gray-100 text-gray-600", status: "ACTIVO" },
    { id: 2, name: "Marta López", email: "marta.lopez@empresa.com", initials: "ML", role: "Empresario", roleColor: "bg-blue-100 text-blue-600", status: "ACTIVO" },
    { id: 3, name: "Carlos Ruiz", email: "carlos@universidad.edu.ar", initials: "CR", role: "Estudiante", roleColor: "bg-green-100 text-green-700", status: "PENDIENTE" },
    { id: 4, name: "Laura Gómez", email: "laura.g@conicet.gov.ar", initials: "LG", role: "Docente / Investigador", roleColor: "bg-purple-100 text-purple-600", status: "ACTIVO" },
    { id: 5, name: "Diego Fernández", email: "diego@inversiones.com", initials: "DF", role: "Inversor / Mentor", roleColor: "bg-yellow-100 text-yellow-700", status: "INACTIVO" },
    { id: 6, name: "Ana Silva", email: "ana.silva@institucion1.edu.ar", initials: "AS", role: "Referente", roleColor: "bg-brand-teal text-white", status: "ACTIVO" },
  ]);

  // 2. Estados para el buscador y los filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Todos los roles');

  // 3. Lógica para filtrar la tabla en tiempo real
  const filteredUsers = users.filter(user => {
    // Filtro por búsqueda (nombre o email)
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por rol
    const matchesRole = selectedRole === 'Todos los roles' || user.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="fade-in">
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        
        {/* Barra de Búsqueda y Filtros */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 bg-gray-50/50">
          
          {/* Buscador de texto */}
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Buscar usuario por nombre o email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition shadow-sm"
            />
          </div>

          {/* Filtro por Rol */}
          <select 
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal shadow-sm min-w-[180px]"
          >
            <option value="Todos los roles">Todos los roles</option>
            <option value="Emprendedor">Emprendedor</option>
            <option value="Empresario">Empresario</option>
            <option value="Estudiante">Estudiante</option>
            <option value="Docente / Investigador">Docente / Investigador</option>
            <option value="Inversor / Mentor">Inversor / Mentor</option>
            <option value="Referente">Referente</option>
          </select>

          {/* Botón de exportar (Simulado) */}
          <button 
            onClick={() => alert('Generando listado CSV...')}
            className="bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-sm shrink-0"
          >
            <i className="fas fa-download"></i> Exportar
          </button>
        </div>

        {/* Tabla de Usuarios */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id} className="bg-white border-b border-gray-50 hover:bg-gray-50/80 transition">
                    
                    {/* Columna: Usuario (Avatar + Nombre + Email) */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 border border-gray-200 shrink-0">
                        {user.initials}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                      </div>
                    </td>

                    {/* Columna: Rol */}
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border border-white/20 ${user.roleColor}`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Columna: Estado */}
                    <td className="px-6 py-4">
                      {user.status === 'ACTIVO' && <span className="text-brand-success font-bold text-xs flex items-center gap-1"><i className="fas fa-circle text-[8px]"></i> ACTIVO</span>}
                      {user.status === 'INACTIVO' && <span className="text-gray-400 font-bold text-xs flex items-center gap-1"><i className="fas fa-circle text-[8px]"></i> INACTIVO</span>}
                      {user.status === 'PENDIENTE' && <span className="text-brand-warning font-bold text-xs flex items-center gap-1"><i className="fas fa-circle text-[8px]"></i> PENDIENTE</span>}
                    </td>

                    {/* Columna: Acciones */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-brand-teal transition bg-white border border-gray-100 rounded shadow-sm hover:shadow" title="Ver Perfil">
                          <i className="fas fa-user"></i>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-brand-magenta transition bg-white border border-gray-100 rounded shadow-sm hover:shadow" title="Editar Rol">
                          <i className="fas fa-shield-alt"></i>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-brand-danger transition bg-white border border-gray-100 rounded shadow-sm hover:shadow" title="Suspender Usuario">
                          <i className="fas fa-ban"></i>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                /* ESTADO VACÍO: Si la búsqueda no arroja resultados */
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300 text-2xl">
                      <i className="fas fa-search"></i>
                    </div>
                    <p className="text-gray-500 font-medium">No se encontraron usuarios</p>
                    <p className="text-gray-400 text-xs mt-1">Intenta con otro término de búsqueda o cambia los filtros.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Paginación (Simulada visualmente) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
          <span>Mostrando {filteredUsers.length} resultados</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 bg-white rounded hover:bg-gray-100 transition disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 border border-gray-200 bg-brand-teal text-white rounded font-bold">1</button>
            <button className="px-3 py-1 border border-gray-200 bg-white rounded hover:bg-gray-100 transition">Siguiente</button>
          </div>
        </div>

      </div>
    </div>
  );
}