import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminHeader } from '@/components/layout/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Contenedor principal: Ocupa toda la pantalla y oculta el scroll general
    <div className="bg-gray-100 flex h-screen overflow-hidden">
      
      {/* Sidebar a la izquierda (fijo) */}
      <AdminSidebar />

      {/* Columna derecha: Ocupa el resto del espacio (flex-1) */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Topbar arriba */}
        <AdminHeader />

        {/* Contenedor de las vistas dinámicas (children) */}
        {/* Acá es donde aparece la barrita de scroll si el contenido es muy largo */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 fade-in">
          {children}
        </div>
        
      </main>
      
    </div>
  );
}