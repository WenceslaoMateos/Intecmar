'use client';

import { useState } from 'react';

export default function AuthPage() {
  // Estados para controlar el formulario
  const [esLogin, setEsLogin] = useState(true); // true = Login, false = Registro
  const [usuario, setUsuario] = useState('');
  const [pass, setPass] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' }); // tipo: 'exito' o 'error'

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje({ texto: 'Procesando...', tipo: 'info' });

    // Decidimos a qué endpoint pegarle según el estado
    const endpoint = esLogin ? 'login' : 'register';
    
    try {
      const res = await fetch(`http://localhost:3000/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, pass }),
      });

      const data = await res.json();

      if (res.ok) {
        if (esLogin) {
          // Si es login exitoso, guardamos el token
          localStorage.setItem('token', data.access_token);
          setMensaje({ texto: '¡Login exitoso! Token guardado en tu navegador.' + data.access_token, tipo: 'exito' });
        } else {
          // Si es registro exitoso, le avisamos y lo pasamos a la pantalla de login
          setMensaje({ texto: '¡Cuenta creada! Ahora por favor iniciá sesión.', tipo: 'exito' });
          setEsLogin(true);
          setPass(''); // Limpiamos la contraseña por seguridad
        }
      } else {
        // Si el backend tira un error (ej: usuario ya existe, mala contraseña)
        setMensaje({ texto: `Error: ${data.message || 'Algo falló'}`, tipo: 'error' });
      }
    } catch (error) {
      setMensaje({ texto: 'Error de conexión con el servidor.', tipo: 'error' });
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#f9f9f9', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {esLogin ? 'Iniciar Sesión' : 'Crear Cuenta Nueva'}
        </h2>

        <form onSubmit={manejarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Nombre de usuario" 
            value={usuario} 
            onChange={(e) => setUsuario(e.target.value)} 
            required
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            required
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          
          <button 
            type="submit" 
            style={{ 
              padding: '12px', 
              background: esLogin ? '#0070f3' : '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {esLogin ? 'Ingresar' : 'Registrarme'}
          </button>
        </form>

        {/* Mensajes de feedback para el usuario */}
        {mensaje.texto && (
          <div style={{ 
            marginTop: '20px', 
            padding: '10px', 
            borderRadius: '5px',
            textAlign: 'center',
            backgroundColor: mensaje.tipo === 'error' ? '#ffebee' : '#e8f5e9',
            color: mensaje.tipo === 'error' ? '#c62828' : '#2e7d32'
          }}>
            {mensaje.texto}
          </div>
        )}

        {/* Botón para alternar entre Login y Registro */}
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          {esLogin ? '¿No tenés cuenta?' : '¿Ya tenés una cuenta?'}
          <button 
            type="button"
            onClick={() => {
              setEsLogin(!esLogin);
              setMensaje({ texto: '', tipo: '' }); // Limpiamos mensajes al cambiar
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#0070f3', 
              textDecoration: 'underline', 
              cursor: 'pointer',
              marginLeft: '5px'
            }}
          >
            {esLogin ? 'Registrate acá' : 'Iniciá sesión acá'}
          </button>
        </p>

      </div>
    </div>
  );
}