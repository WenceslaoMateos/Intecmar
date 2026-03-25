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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className="bg-gray-50 font-sans antialiased text-gray-800 flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}