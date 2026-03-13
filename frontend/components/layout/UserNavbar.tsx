'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const UserNavbar = () => {
  const pathname = usePathname();

  // Función para determinar si el link está activo (para pintar el ícono y texto)
  const isActive = (path: string) => {
    // Retorna true si la ruta actual coincide con el path que le pasamos
    return pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center h-16">
          
          {/* Lado Izquierdo: Logo & Buscador */}
          <div className="flex items-center gap-4">
            {/* Logo (Lleva a Inicio) */}
            <Link href="/" className="w-8 h-8 bg-gradient-to-br from-brand-teal to-brand-magenta rounded flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-90 transition">
              <i className="fa-solid fa-water text-xs"></i>
            </Link>
            
            {/* Buscador (Se oculta en celulares) */}
            <div className="relative hidden md:block">
              <i className="fas fa-search absolute left-3 top-2.5 text-gray-400 text-sm"></i>
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-gray-100 text-sm rounded-md pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-brand-teal transition"
              />
            </div>
          </div>

          {/* Lado Derecho: Iconos de Navegación */}
          <ul className="flex items-center gap-1 sm:gap-6 text-gray-500">
            
            {/* Icono: Explorar */}
            <li>
              <Link href="/explorar" className="flex flex-col items-center group px-2">
                <i className={`fas fa-compass text-lg transition ${isActive('/explorar') ? 'text-brand-teal' : 'group-hover:text-brand-teal'}`}></i>
                <span className={`text-[10px] hidden sm:block mt-1 ${isActive('/explorar') ? 'text-brand-teal font-bold' : 'group-hover:text-brand-teal'}`}>
                  Explorar
                </span>
              </Link>
            </li>

            {/* Icono: Mi Perfil */}
            <li>
              <Link href="/perfil" className="flex flex-col items-center group px-2">
                <i className={`fas fa-user-circle text-lg transition ${isActive('/perfil') ? 'text-brand-teal' : 'group-hover:text-brand-teal'}`}></i>
                <span className={`text-[10px] hidden sm:block mt-1 ${isActive('/perfil') ? 'text-brand-teal font-bold' : 'group-hover:text-brand-teal'}`}>
                  Mi Perfil
                </span>
              </Link>
            </li>

            {/* Avatar del Usuario */}
            <li className="pl-2 sm:pl-4">
              <Link href="/perfil">
                <img 
                  src="https://ui-avatars.com/api/?name=Juan+Perez&background=0f3c4c&color=fff" 
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border border-gray-200 hover:border-brand-teal transition cursor-pointer"
                />
              </Link>
            </li>

            {/* Botón de Cerrar Sesión */}
            <li className="pl-2 sm:pl-4 border-l border-gray-200 ml-1">
              <Link 
                href="/" 
                onClick={() => alert('Cerrando sesión de usuario...')}
                className="flex flex-col items-center group px-2"
                title="Cerrar sesión"
              >
                <i className="fas fa-sign-out-alt text-lg text-gray-400 group-hover:text-brand-danger transition"></i>
                <span className="text-[10px] hidden sm:block mt-1 text-gray-400 group-hover:text-brand-danger transition">
                  Salir
                </span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};