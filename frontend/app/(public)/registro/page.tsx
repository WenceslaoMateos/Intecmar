'use client'; // Usamos 'use client' porque hay un formulario interactivo

import Link from 'next/link';

export default function RegistroPage() {
  
  // Función temporal para simular el registro
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert('En la Fase 2 del sistema, esto enviará tus datos al backend Nest.js para crear la cuenta y asignar tu rol.');
  };

  return (
    <div className="bg-gray-100 py-16 px-4 flex justify-center items-center fade-in">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Lado Izquierdo: Información y Beneficios */}
        <div className="w-full md:w-1/3 bg-brand-dark p-12 text-white flex flex-col justify-center relative overflow-hidden">
          {/* Fondo de textura simulado */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <h3 className="text-3xl font-bold mb-6 relative z-10 font-heading">Únete a la Red</h3>
          <p className="text-gray-300 mb-6 relative z-10 text-sm leading-relaxed">
            Al registrarte podrás acceder a contenido exclusivo, postular a convocatorias y conectar con referentes.
          </p>
          
          <ul className="space-y-4 text-sm text-gray-300 relative z-10">
            <li className="flex items-center">
              <i className="fas fa-check text-brand-teal mr-3"></i> Acceso a capacitaciones
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-brand-teal mr-3"></i> Perfil profesional
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-brand-teal mr-3"></i> Networking
            </li>
          </ul>
        </div>

        {/* Lado Derecho: Formulario */}
        <div className="w-full md:w-2/3 p-10 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 font-heading">Crear una cuenta</h2>
          
          <form onSubmit={handleRegister}>
            {/* Fila: Nombre y Apellido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300" 
                  placeholder="Juan"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300" 
                  placeholder="Pérez"
                  required
                />
              </div>
            </div>

            {/* Fila: Correo */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300" 
                placeholder="juan@ejemplo.com"
                required
              />
            </div>

            {/* Fila: Rol */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Selecciona tu Rol Principal</label>
              <select 
                defaultValue="" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300 bg-white"
                required
              >
                <option value="" disabled>-- Seleccionar --</option>
                <option value="emprendedor">Emprendedor (Tengo una idea/proyecto)</option>
                <option value="empresario">Empresario (Tengo empresa registrada)</option>
                <option value="estudiante">Estudiante</option>
                <option value="docente">Docente / Investigador</option>
                <option value="inversor">Inversor / Mentor</option>
                <option value="referente">Solicitar ser Referente Institucional</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Los roles de Referente Institucional requieren validación del administrador.</p>
            </div>

            {/* Fila: Contraseñas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300" 
                  placeholder="********"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Confirmar Contraseña</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300" 
                  placeholder="********"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-teal text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-dark transition transform active:scale-95 shadow-lg"
            >
              Registrarse
            </button>
            
            <p className="text-center mt-6 text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link href="/ingresar" className="text-brand-teal font-bold hover:underline">
                Ingresa aquí
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}