'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; 
import Image from 'next/image'; 

export const UserNavbar = () => {
  const pathname = usePathname();
  const router = useRouter(); 
  const [userRole, setUserRole] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getRoleFromToken = () => {
      try {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(c => c.trim().startsWith('auth_token='));
        
        if (tokenCookie) {
          const token = tokenCookie.split('=')[1];
          const payloadBase64 = token.split('.')[1];
          const decodedPayload = JSON.parse(atob(payloadBase64));
          
          // ==========================================
          // DEBUGGING CLAVE PARA TU TESIS
          // Abre la consola del navegador (F12) para ver la estructura exacta del token
          // ==========================================
          console.log("Payload del JWT:", decodedPayload);
          
          // Ajusta '.role' por la propiedad exacta que muestre el console.log
          // Por ejemplo: podría ser decodedPayload.role_name o decodedPayload.rol
          setUserRole(decodedPayload.role); 
        }
      } catch (err: any) {
        setError(err.message || 'Error al decodificar el token.');
      }
    };

    getRoleFromToken();
  }, []);

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault(); 
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/ingresar');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center h-24 py-2">
          
          {/* Lado Izquierdo: Logo & Buscador */}
          <div className="flex items-center gap-4 h-full">
            <Link href="/explorar" className="flex items-center cursor-pointer h-full">
              <Image 
                src="/red-intecmar.png" 
                alt="Logo de Red Intecmar"
                width={180} 
                height={64}
                priority 
                className="object-contain min-w-[111px] h-full" 
              />
            </Link>
            
            <div className="relative hidden md:block ml-4">
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
            
            {/* Ícono Admin: visible solo para administradores */}
            <li className="pl-2 sm:pl-4 min-w-[90px] flex justify-center">
              {userRole === 'Administrador' && (
                <Link 
                  href="/admin/dashboard" 
                  className="flex items-center justify-center px-4 py-1.5 rounded-full bg-purple-100 border border-purple-300 hover:bg-purple-200 transition cursor-pointer text-purple-800 font-bold text-xs shadow-sm"
                  title="Panel de Control del Sistema"
                >
                  <i className="fas fa-shield-alt mr-2"></i> Admin
                </Link>
              )}
            </li>

            {/* Icono: Explorar */}
            <li>
              <Link href="/explorar" className="flex flex-col items-center group px-2">
                <i className={`fas fa-compass text-lg transition ${isActive('/explorar') ? 'text-brand-teal' : 'group-hover:text-brand-teal'}`}></i>
                <span className={`text-[10px] hidden sm:block mt-1 ${isActive('/explorar') ? 'text-brand-teal font-bold' : 'group-hover:text-brand-teal'}`}>
                  Explorar
                </span>
              </Link>
            </li>


            {/* Icono: Mi Perfil (Siempre visible para todos los usuarios) */}
            <li>
              <Link href="/perfil" className="flex flex-col items-center group px-2">
                <i className={`fas fa-user-circle text-lg transition ${isActive('/perfil') ? 'text-brand-teal' : 'group-hover:text-brand-teal'}`}></i>
                <span className={`text-[10px] hidden sm:block mt-1 ${isActive('/perfil') ? 'text-brand-teal font-bold' : 'group-hover:text-brand-teal'}`}>
                  Mi Perfil
                </span>
              </Link>
            </li>

            {/* Botón de Cerrar Sesión */}
            <li className="pl-2 sm:pl-4 border-l border-gray-200 ml-1">
              <a 
                href="#" 
                onClick={handleLogout}
                className="flex flex-col items-center group px-2 cursor-pointer"
                title="Cerrar sesión"
              >
                <i className="fas fa-sign-out-alt text-lg text-gray-400 group-hover:text-red-500 transition"></i>
                <span className="text-[10px] hidden sm:block mt-1 text-gray-400 group-hover:text-red-500 transition">
                  Salir
                </span>
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};