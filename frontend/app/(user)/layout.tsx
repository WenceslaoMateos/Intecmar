import { UserNavbar } from '@/components/layout/UserNavbar';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Fondo gris clarito tipo red social (LinkedIn style) y contenedor flex
    <div className="bg-[#f3f2ef] min-h-screen flex flex-col">
      
      {/* Barra superior fija (Navbar) */}
      <UserNavbar />

      {/* Contenedor principal centrado donde irán las páginas (Perfil, Explorar) */}
      <main className="flex-grow container mx-auto px-4 py-6 max-w-6xl fade-in">
        {children}
      </main>
      
    </div>
  );
}