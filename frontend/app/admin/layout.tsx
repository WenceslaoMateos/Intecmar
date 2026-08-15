import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminHeader } from '@/components/layout/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white flex h-screen overflow-hidden">
      
      {/* Sidebar a la izquierda (fijo) */}
      <AdminSidebar />

      {/* Columna derecha: Ocupa el resto del espacio */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Topbar arriba */}
        <AdminHeader />

        {/* Contenedor de las vistas dinámicas*/}
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6 fade-in">
          {children}
        </div>
        
      </main>
      
    </div>
  );
}