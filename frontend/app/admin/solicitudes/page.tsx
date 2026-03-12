'use client';

import { useState } from 'react';

export default function SolicitudesPage() {
  
  // Usamos useState para guardar las solicitudes. 
  // Esto nos permite eliminarlas de la pantalla cuando las aprobamos o rechazamos.
  const [requests, setRequests] = useState([
    { id: 1, name: "María González", email: "maria@utn.edu.ar", entity: "Institución 3", date: "17/02/2026" },
    { id: 2, name: "Carlos Ruiz", email: "carlos@cluster.com", entity: "Institución 4", date: "16/02/2026" },
    { id: 3, name: "Ana Laura Silva", email: "ana@conicet.gov.ar", entity: "Institución 5", date: "15/02/2026" }
  ]);

  // Función para simular la aprobación
  const handleAprobar = (name: string, id: number) => {
    alert(`Has aprobado a ${name} como Referente Institucional.`);
    // Filtramos la lista para quitar al usuario que acabamos de aprobar
    setRequests(requests.filter(req => req.id !== id));
  };

  // Función para simular el rechazo
  const handleRechazar = (name: string, id: number) => {
    if(confirm(`¿Estás seguro de que deseas rechazar la solicitud de ${name}?`)) {
      setRequests(requests.filter(req => req.id !== id));
    }
  };

  return (
    <div className="fade-in">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        
        {/* Cabecera de la tarjeta */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <p className="text-gray-600">
            Usuarios que solicitan ser validados como <strong>Referente Institucional</strong>.
          </p>
          <div className="text-sm flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
            <span className="inline-block w-3 h-3 bg-brand-warning rounded-full mr-2 shadow-inner"></span> 
            <span className="font-bold text-gray-700">{requests.length} Pendientes</span>
          </div>
        </div>

        {/* Tabla de Solicitudes */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 rounded-tl-lg">Usuario / Email</th>
                <th className="px-6 py-4">Institución a Representar</th>
                <th className="px-6 py-4 text-center rounded-tr-lg">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Si hay solicitudes, se mapean. Si no, se muestra un mensaje de éxito. */}
              {requests.length > 0 ? (
                requests.map(req => (
                  <tr key={req.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {req.name}<br/>
                      <span className="text-gray-400 font-normal text-xs">{req.email}</span>
                    </td>
                    <td className="px-6 py-4">{req.entity}</td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button 
                        onClick={() => handleAprobar(req.name, req.id)}
                        className="bg-brand-success text-white px-4 py-1.5 rounded-md hover:bg-green-600 transition shadow-sm font-bold text-xs"
                      >
                        <i className="fas fa-check mr-1"></i> Aprobar
                      </button>
                      <button 
                        onClick={() => handleRechazar(req.name, req.id)}
                        className="bg-brand-danger text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition shadow-sm font-bold text-xs"
                      >
                        <i className="fas fa-times mr-1"></i> Rechazar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                /* ESTADO VACÍO: Cuando están todos aprobados */
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 text-brand-success text-2xl">
                      <i className="fas fa-check-double"></i>
                    </div>
                    <p className="text-gray-500 font-medium">¡Todo al día!</p>
                    <p className="text-gray-400 text-xs mt-1">No hay más solicitudes pendientes de revisión.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}