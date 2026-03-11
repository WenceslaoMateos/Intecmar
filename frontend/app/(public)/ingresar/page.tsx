'use client'; // Le decimos a Next.js que este componente usa interactividad en el navegador (por el formulario)

import Link from 'next/link';

export default function IngresarPage() {
  
  // Función temporal para simular el login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    alert('En el futuro (Fase 2), esto enviará tu email y contraseña a Nest.js para entrar al sistema.');
  };

  return (
    // Reemplazamos min-h-screen por py-16 para que se adapte bien al espacio entre el Header y el Footer
    <div className="bg-gray-100 flex justify-center items-center py-16 px-4 fade-in">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        
        {/* Título y Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-teal to-brand-magenta rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            <i className="fa-solid fa-water"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido de nuevo</h2>
          <p className="text-gray-500 text-sm">Ingresa a tu panel de gestión</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-gray-400"></i>
              </div>
              <input 
                type="email" 
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300" 
                placeholder="tu@email.com"
                required 
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-400"></i>
              </div>
              <input 
                type="password" 
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300" 
                placeholder="********"
                required 
              />
            </div>
            <div className="text-right mt-2">
              <Link href="#" className="text-xs text-brand-teal hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-brand-dark text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition transform active:scale-95 shadow-md mb-4"
          >
            Ingresar
          </button>
        </form>
        
        {/* Separador */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs">O</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Enlace de Registro */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            {/* El link real hacia la página de registro */}
            <Link href="/registro" className="text-brand-teal font-bold hover:underline">
              Regístrate
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}