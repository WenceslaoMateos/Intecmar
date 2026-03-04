import { Header } from '@/components/layout/PublicHeader';
import { Footer } from '@/components/layout/PublicFooter';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // El flex-col y min-h-screen empujan el footer siempre hacia abajo
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header /> 
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
