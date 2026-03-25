import Link from 'next/link';
import Image from 'next/image'; 

export const PublicHeader = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center cursor-pointer">
          <Image 
            src="/red-intecmar.png" 
            alt="Logo de Red Intecmar"
            width={180} 
            height={48} 
            priority 
            className="object-contain min-w-[111px]" // Mantiene la proporción y asegura el ancho mínimo
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="nav-link text-gray-600 hover:text-brand-teal transition pb-1 font-medium">
            Inicio
          </Link>
          <Link href="/nosotros" className="nav-link text-gray-600 hover:text-brand-teal transition pb-1 font-medium">
            Nosotros
          </Link>
          <Link href="/novedades" className="nav-link text-gray-600 hover:text-brand-teal transition pb-1 font-medium">
            Novedades
          </Link>
          
          <div className="h-6 w-px bg-gray-300 mx-2"></div> {/* Separador */}
          
          <Link href="/registro" className="nav-link text-gray-600 hover:text-brand-teal transition pb-1 font-medium">
            Registrarme
          </Link>
          <Link href="/ingresar" className="px-5 py-2 bg-brand-teal text-white rounded-full hover:bg-brand-blue transition shadow-lg shadow-brand-teal/30 font-semibold text-sm">
            Ingresar
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600 focus:outline-none">
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>
    </header>
  );
};