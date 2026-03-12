'use client'; // Necesario porque usamos usePathname para saber en qué ruta estamos

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AdminSidebar = () => {
  const pathname = usePathname();

  // Función auxiliar para saber si un link está activo
  // Devuelve las clases de CSS correspondientes (fondo oscuro y borde magenta) si coincide la ruta
  const getActiveClasses = (path: string) => {
    if (pathname === path) {
      return 'bg-brand-teal/20 border-l-4 border-brand-magenta text-white';
    }
    return 'border-l-4 border-transparent text-gray-400 hover:bg-gray-700 hover:text-white transition';
  };

  return (
    <aside className="w-64 bg-brand-dark text-gray-300 flex flex-col flex-shrink-0 h-screen transition-all duration-300">
      
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 bg-gray-900/30">
        <div className="w-8 h-8 bg-gradient-to-br from-brand-teal to-brand-magenta rounded flex items-center justify-center text-white font-bold mr-3">
          <i className="fa-solid fa-water text-xs"></i>
        </div>
        <span className="text-white font-bold font-heading text-lg tracking-wide">ADMIN</span>
      </div>

      {/* User Profile Snippet */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <img 
            src="https://ui-avatars.com/api/?name=Admin+User&background=1a6b7d&color=fff" 
            alt="Avatar Administrador"
            className="w-10 h-10 rounded-full border-2 border-brand-magenta"
          />
          <div>
            <h4 className="text-white text-sm font-bold">Administrador</h4>
            <span className="text-xs text-brand-success flex items-center gap-1">
              <i className="fas fa-circle text-[8px]"></i> En línea
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          <li>
            <Link 
              href="/admin/dashboard" 
              className={`flex items-center px-6 py-3 text-sm ${getActiveClasses('/admin/dashboard')}`}
            >
              <i className="fas fa-tachometer-alt w-6"></i>
              <span>Resumen</span>
            </Link>
          </li>
          
          <li className="px-6 pt-4 pb-2 text-xs uppercase font-bold text-gray-500 tracking-wider">
            Gestión
          </li>
          
          <li>
            <Link 
              href="/admin/solicitudes" 
              className={`flex items-center justify-between px-6 py-3 text-sm ${getActiveClasses('/admin/solicitudes')}`}
            >
              <div className="flex items-center">
                <i className="fas fa-user-check w-6"></i> 
                <span>Solicitudes</span>
              </div>
              {/* Etiqueta de notificaciones (simulada por ahora) */}
              <span className="bg-brand-magenta text-white text-[10px] px-2 py-0.5 rounded-full">3</span>
            </Link>
          </li>
          
          <li>
            <Link 
              href="/admin/instituciones" 
              className={`flex items-center px-6 py-3 text-sm ${getActiveClasses('/admin/instituciones')}`}
            >
              <i className="fas fa-building w-6"></i>
              <span>Instituciones</span>
            </Link>
          </li>
          
          <li>
            <Link 
              href="/admin/usuarios" 
              className={`flex items-center px-6 py-3 text-sm ${getActiveClasses('/admin/usuarios')}`}
            >
              <i className="fas fa-users w-6"></i>
              <span>Usuarios</span>
            </Link>
          </li>
          
          <li>
            <Link 
              href="/admin/actividades" 
              className={`flex items-center px-6 py-3 text-sm ${getActiveClasses('/admin/actividades')}`}
            >
              <i className="fas fa-calendar-alt w-6"></i>
              <span>Actividades</span>
            </Link>
          </li>
          
          <li>
            <Link 
              href="/admin/proyectos" 
              className={`flex items-center px-6 py-3 text-sm ${getActiveClasses('/admin/proyectos')}`}
            >
              <i className="fas fa-rocket w-6"></i>
              <span>Proyectos</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <Link 
          href="/" 
          className="flex items-center px-4 py-2 text-sm text-gray-400 hover:text-white transition"
          onClick={() => alert('Cerrando sesión...')}
        >
          <i className="fas fa-sign-out-alt w-6"></i>
          <span>Cerrar Sesión</span>
        </Link>
      </div>
      
    </aside>
  );
};