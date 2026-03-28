'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegistroPage() {
  const router = useRouter();

  // Estados actualizados para coincidir con la Base de Datos
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState(''); 
  
  // Estados para manejo de la interfaz
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Función asíncrona para manejar el registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validación básica
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden. Por favor, verifícalas.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName: nombre, 
          lastName: apellido, 
          email: email, 
          password: password,
          birthDate: birthDate,
          role: rol 
        }),
      });

      if (!response.ok) {
        const dataError = await response.json().catch(() => ({}));
        throw new Error(dataError.message || 'Error al registrar el usuario.');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/ingresar');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 py-16 px-4 flex justify-center items-center fade-in">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Lado Izquierdo */}
        <div className="w-full md:w-1/3 bg-brand-dark p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <h3 className="text-3xl font-bold mb-6 relative z-10 font-heading">Únete a la Red</h3>
          <p className="text-gray-300 mb-6 relative z-10 text-sm leading-relaxed">
            Al registrarte podrás acceder a contenido exclusivo, postular a convocatorias y conectar con referentes.
          </p>
          
          <ul className="space-y-4 text-sm text-gray-300 relative z-10">
            <li className="flex items-center"><i className="fas fa-check text-brand-teal mr-3"></i> Acceso a capacitaciones</li>
            <li className="flex items-center"><i className="fas fa-check text-brand-teal mr-3"></i> Perfil profesional</li>
            <li className="flex items-center"><i className="fas fa-check text-brand-teal mr-3"></i> Networking</li>
          </ul>
        </div>

        {/* Lado Derecho: Formulario */}
        <div className="w-full md:w-2/3 p-10 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 font-heading">Crear una cuenta</h2>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i> {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border-l-4 border-brand-success text-green-700 p-3 rounded mb-6 text-sm flex items-center">
              <i className="fas fa-check-circle mr-2"></i> ¡Registro exitoso! Redirigiendo al ingreso...
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                <input 
                  type="text" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300 transition" 
                  placeholder="Pepe"
                  required 
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                <input 
                  type="text" 
                  value={apellido} 
                  onChange={(e) => setApellido(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300 transition" 
                  placeholder="Argento"
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300 transition" 
                  placeholder="pepe@ejemplo.com"
                  required 
                />
              </div>
              {/* Fecha de Nacimiento */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Fecha de Nacimiento</label>
                <input 
                  type="date" 
                  value={birthDate} 
                  onChange={(e) => setBirthDate(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300 transition" 
                  required 
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Selecciona tus Roles</label>
              <select value={rol} onChange={(e) => setRol(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300 bg-white transition" required>
                <option value="" disabled>-- Seleccionar --</option>
                <option value="Emprendedor/a Incipiente">Emprendedor (Tengo una idea/proyecto)</option>
                <option value="Empresario/a maduro">Empresario (Tengo empresa registrada)</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Docente o Facilitador/a">Docente / Investigador</option>
                <option value="Inversor/a">Inversor / Mentor</option>
                <option value="Referente Institucional">Solicitar ser Referente Institucional</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300 transition" 
                  placeholder="********"
                  required 
                  minLength={6} 
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Confirmar Contraseña</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal border-gray-300 transition" 
                  placeholder="********"
                  required 
                  minLength={6} 
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading || success} className="w-full bg-brand-teal text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-dark transition transform active:scale-95 shadow-lg flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? <><i className="fas fa-circle-notch fa-spin mr-2"></i> Registrando...</> : 'Registrarse'}
            </button>
            
            <p className="text-center mt-6 text-sm text-gray-600">
              ¿Ya tienes cuenta? <Link href="/ingresar" className="text-brand-teal font-bold hover:underline">Ingresa aquí</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}