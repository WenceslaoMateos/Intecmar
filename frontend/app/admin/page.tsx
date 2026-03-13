'use client';

import Link from 'next/link';

export default function DashboardPage() {
  
  // Datos simulados basados en tu mockup original
  const pendingRequests = [
    { id: 1, name: "María González", email: "maria@utn.edu.ar", entity: "Institución 3", date: "17/02/2026" },
    { id: 2, name: "Carlos Ruiz", email: "carlos@cluster.com", entity: "Institución 4", date: "16/02/2026" },
    { id: 3, name: "Ana Laura Silva", email: "ana@conicet.gov.ar", entity: "Institución 5", date: "15/02/2026" }
  ];

  return (
    <div className="fade-in">
      
      {/* TARJETAS DE MÉTRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Tarjeta 1 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-brand-warning">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Solicitudes Pendientes</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">3</h3>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg text-brand-warning">
              <i className="fas fa-user-clock"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">Referentes Institucionales</p>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-brand-teal">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Proyectos Activos</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">24</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg text-brand-teal">
              <i className="fas fa-rocket"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">+5 este mes</p>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-brand-magenta">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Instituciones</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">12</h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg text-brand-magenta">
              <i className="fas fa-building"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">Red Intecmar</p>
        </div>
        
        {/* Tarjeta 4 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-brand-success">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Usuarios Totales</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">156</h3>
            </div>
            <div className="p-2 bg-green-100 rounded-lg text-brand-success">
              <i className="fas fa-users"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">Emprendedores y Empresarios</p>
        </div>
      </div>

      {/* ACTIVIDAD RECIENTE Y ACCIONES RÁPIDAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Tabla de Solicitudes Recientes */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4 font-heading">Solicitudes de Referentes Recientes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Usuario</th>
                  <th className="px-4 py-3">Institución</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3 rounded-r-lg text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map(req => (
                  <tr key={req.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-900">{req.name}</td>
                    <td className="px-4 py-3">{req.entity}</td>
                    <td className="px-4 py-3">{req.date}</td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        className="text-brand-success hover:bg-green-100 p-1 rounded transition" 
                        title="Aprobar"
                        onClick={() => alert(`Aprobando a ${req.name}...`)}
                      >
                        <i className="fas fa-check"></i>
                      </button>
                      <button 
                        className="text-brand-danger hover:bg-red-100 p-1 rounded transition ml-2" 
                        title="Rechazar"
                        onClick={() => alert(`Rechazando a ${req.name}...`)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <Link href="/admin/solicitudes" className="text-brand-teal text-sm font-bold hover:underline">
              Ver todas las solicitudes
            </Link>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4 font-heading">Acciones Rápidas</h3>
          <div className="space-y-3">
            
            <Link href="/admin/instituciones" className="w-full flex items-center p-3 bg-gray-50 hover:bg-brand-teal hover:text-white rounded-lg transition group border border-gray-200">
              <div className="w-8 h-8 bg-brand-teal text-white group-hover:bg-white group-hover:text-brand-teal rounded flex items-center justify-center mr-3 transition">
                <i className="fas fa-plus"></i>
              </div>
              <span className="font-medium">Nueva Institución</span>
            </Link>
            
            <Link href="/admin/actividades" className="w-full flex items-center p-3 bg-gray-50 hover:bg-brand-magenta hover:text-white rounded-lg transition group border border-gray-200">
              <div className="w-8 h-8 bg-brand-magenta text-white group-hover:bg-white group-hover:text-brand-magenta rounded flex items-center justify-center mr-3 transition">
                <i className="fas fa-bullhorn"></i>
              </div>
              <span className="font-medium">Crear Actividad</span>
            </Link>
            
            <button 
              onClick={() => alert('Generando reporte PDF (Fase 2)...')} 
              className="w-full flex items-center p-3 bg-gray-50 hover:bg-gray-800 hover:text-white rounded-lg transition group border border-gray-200"
            >
              <div className="w-8 h-8 bg-gray-700 text-white group-hover:bg-white group-hover:text-gray-800 rounded flex items-center justify-center mr-3 transition">
                <i className="fas fa-file-download"></i>
              </div>
              <span className="font-medium">Descargar Reportes</span>
            </button>
            
          </div>
        </div>

      </div>
    </div>
  );
}