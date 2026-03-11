import type { Metadata } from 'next';
import './globals.css'; 

export const metadata: Metadata = {
  title: 'Intecmar - Red de Innovación',
  description: 'Conectando comunidad y tecnología para impulsar la innovación.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 font-sans antialiased text-gray-800 flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}