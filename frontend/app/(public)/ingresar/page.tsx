'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function IngresarPage() {
  const router = useRouter();
  
  // Estados para capturar los datos del formulario y manejar errores/carga
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Función asíncrona para manejar el login real
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user: {
            email, 
            password
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas o usuario no registrado.');
      }

      const data = await response.json();
      
      // extrae el token del backend (Asumiendo que Nest.js devuelve { access_token: "..." })
      const token = data.access_token; 

      // Actualziación de cookies
      // toda la página (path=/) y dura 1 día (max-age=86400)
      document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Strict`;

      // Redirigimos al panel protegido
      router.push('/perfil');
      
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor.');
      
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center py-16 px-4 fade-in">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        
        {/* Título y Logo */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido de nuevo</h2>
          <p className="text-gray-500 text-sm">Ingresa a tu panel de gestión</p>
        </div>

        {/* Mensaje de Error (Si lo hay) */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300 transition" 
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300 transition" 
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
            disabled={isLoading}
            className="w-full bg-brand-dark text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition transform active:scale-95 shadow-md mb-4 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isLoading ? (
              <><i className="fas fa-circle-notch fa-spin mr-2"></i> Ingresando...</>
            ) : (
              'Ingresar'
            )}
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
            <Link href="/registro" className="text-brand-teal font-bold hover:underline">
              Regístrate
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}