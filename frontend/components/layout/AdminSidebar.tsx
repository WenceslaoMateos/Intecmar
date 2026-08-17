'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export const AdminSidebar = () => {
  const pathname = usePathname();

  // Función auxiliar para saber si un link está activo
  const getActiveClasses = (path: string) => {
    if (pathname === path) {
      return 'bg-brand-teal/20 border-l-4 border-brand-magenta text-white font-medium';
    }
    return 'border-l-4 border-transparent text-white/80 hover:bg-white/10 hover:text-white transition';
  };

  return (
    <aside className="w-64 bg-brand-dark flex flex-col flex-shrink-0 h-screen transition-all duration-300">
      
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center w-full py-6 cursor-pointer">
        <Image 
          src="/intecmar-blanco.png" 
          alt="Logo de Red Intecmar"
          width={180} 
          height={48} 
          priority 
          className="object-contain" 
        />
      </Link>

      {/* User Profile Snippet (Opción 1 - Ícono de Escudo) */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center border-2 border-brand-magenta shadow-sm">
            <i className="fas fa-user-shield text-white text-sm"></i>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold">Administrador</h4>
            <p className="text-white/60 text-[11px] uppercase tracking-wider">Gestor del Sistema</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          <li>
            <Link 
              href="/admin" 
              className={`flex items-center px-6 py-3 text-sm ${getActiveClasses('/admin')}`}
            >
              <i className="fas fa-tachometer-alt w-6 mr-3"></i>
              <span>Resumen</span>
            </Link>
          </li>
          
          <li className="px-6 pt-4 pb-2 text-xs uppercase font-bold text-white/60 tracking-wider">
            Gestión
          </li>
          
          <li>
            <Link 
              href="/admin/solicitudes" 
              className={`flex items-center justify-between px-6 py-3 text-sm ${getActiveClasses('/admin/solicitudes')}`}
            >
              <div className="flex items-center">
                <i className="fas fa-user-check w-6 mr-3"></i> 
                <span>Solicitudes</span>
              </div>
              <span className="bg-brand-magenta text-white text-[10px] px-2 py-0.5 rounded-full">3</span>
            </Link>
          </li>
          
          <li>
            <Link 
              href="/admin/instituciones" 
              className={`flex items-center px-6 py-3 text-sm ${getActiveClasses('/admin/instituciones')}`}
            >
              <i className="fas fa-building w-6 mr-3"></i>
              <span>Instituciones</span>
            </Link>
          </li>
          
          <li>
            <Link 
              href="/admin/usuarios" 
              className={`flex items-center px-6 py-3 text-sm ${getActiveClasses('/admin/usuarios')}`}
            >
              <i className="fas fa-users w-6 mr-3"></i>
              <span>Usuarios</span>
            </Link>
          </li>

          {/* NUEVA SECCIÓN: PROGRAMAS */}
          <li>
            <Link 
              href="/admin/programas" 
              className={`flex items-center px-6 py-3 text-sm ${getActiveClasses('/admin/programas')}`}
            >
              <i className="fas fa-layer-group w-6 mr-3"></i>
              <span>Programas</span>
            </Link>
          </li>
          
          <li>
            <Link 
              href="/admin/actividades" 
              className={`flex items-center px-6 py-3 text-sm ${getActiveClasses('/admin/actividades')}`}
            >
              <i className="fas fa-calendar-alt w-6 mr-3"></i>
              <span>Actividades</span>
            </Link>
          </li>
          
          <li>
            <Link 
              href="/admin/proyectos" 
              className={`flex items-center px-6 py-3 text-sm ${getActiveClasses('/admin/proyectos')}`}
            >
              <i className="fas fa-rocket w-6 mr-3"></i>
              <span>Proyectos</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer Actions (Volver al perfil & Logout) */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <Link 
          href="/perfil" 
          className="flex items-center px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded transition group"
        >
          <i className="fas fa-arrow-left w-6 mr-3 transition-transform group-hover:-translate-x-1"></i>
          <span>Volver a mi Perfil</span>
        </Link>

        <Link 
          href="/" 
          className="flex items-center px-4 py-2 text-sm text-white/80 hover:text-red-400 hover:bg-red-500/10 rounded transition"
          onClick={() => alert('Cerrando sesión...')}
        >
          <i className="fas fa-sign-out-alt w-6 mr-3"></i>
          <span>Cerrar Sesión</span>
        </Link>
      </div>
      
    </aside>
  );
};