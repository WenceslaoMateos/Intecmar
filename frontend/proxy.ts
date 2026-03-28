import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // 1. Buscamos el token de sesión (que tu backend Nest.js generó) en las cookies
  const token = request.cookies.get('auth_token')?.value;

  // 2. Si el usuario NO tiene token, lo redirigimos al login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Si tiene token, la solicitud continúa normalmente hacia la página
  return NextResponse.next();
}

// 4. Configuramos QUÉ rutas queremos que pasen por este guardia
export const config = {
  matcher: [
    // Protege rutas específicas y todos sus subniveles usando /:path*
    '/perfil/:path*',
    '/admin/:path*',
    
    // Opcional: Proteger TODA la app excepto login, api y archivos estáticos
    // '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
};