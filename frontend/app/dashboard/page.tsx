// frontend/src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [datosUsuario, setDatosUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Buscamos el token en el LocalStorage
    const token = localStorage.getItem('token');

    // 2. Si no hay token, lo pateamos al login directamente
    if (!token) {
      router.push('/login');
      return;
    }

    // 3. Si hay token, intentamos buscar los datos privados
    const fetchDatosPrivados = async () => {
      try {
        const res = await fetch('http://localhost:3000/auth/perfil', {
          headers: {
            'Authorization': `Bearer ${token}` // ¡Acá mandamos la llave!
          }
        });

        if (res.ok) {
          const data = await res.json();
          setDatosUsuario(data);
        } else {
          // Si el backend responde 401 (Unauthorized), el token expiró o es trucho
          localStorage.removeItem('token');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error de conexión', error);
      } finally {
        setCargando(false);
      }
    };

    fetchDatosPrivados();
  }, [router]);

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (cargando) return <h2 style={{ padding: '50px', textAlign: 'center' }}>Verificando credenciales...</h2>;

  return (
    <div style={{ padding: '50px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#e3f2fd', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        
        <h1 style={{ color: '#1565c0' }}>Panel de Control Privado</h1>
        <p>Si estás viendo esto, es porque tu JWT funcionó perfectamente.</p>

        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
          <h3>Datos que devolvió NestJS:</h3>
          <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
            {JSON.stringify(datosUsuario, null, 2)}
          </pre>
        </div>

        <button 
          onClick={cerrarSesion}
          style={{ 
            marginTop: '20px', 
            padding: '10px 15px', 
            background: '#d32f2f', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}