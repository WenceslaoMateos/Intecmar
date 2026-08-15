'use client';

import { usePathname } from 'next/navigation';

export const AdminHeader = () => {
  const pathname = usePathname();

  // Diccionario automático para saber qué título poner según la URL
  const getPageTitle = () => {
    if (!pathname) return 'Panel de Administración';
    if (pathname.includes('/dashboard')) return 'Resumen General';
    if (pathname.includes('/solicitudes')) return 'Gestión de Solicitudes';
    if (pathname.includes('/instituciones')) return 'Gestión de Instituciones';
    if (pathname.includes('/usuarios')) return 'Base de Usuarios';
    if (pathname.includes('/programas')) return 'Gestión de Programas';
    if (pathname.includes('/actividades')) return 'Gestión de Actividades';
    if (pathname.includes('/proyectos')) return 'Supervisión de Proyectos';
    
    return 'Panel de Administración'; // Título por defecto
  };

  return (
    <header className="h-16 bg-white shadow-sm flex justify-between items-center px-6 z-10 shrink-0">
      
      {/* Título Dinámico */}
      <h2 className="text-xl font-bold text-gray-800 font-heading">
        {getPageTitle()}
      </h2>
      
    </header>
  );
};