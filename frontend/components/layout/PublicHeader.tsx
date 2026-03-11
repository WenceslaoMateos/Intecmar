import Link from 'next/link';

export const PublicHeader = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-teal to-brand-magenta rounded-lg flex items-center justify-center text-white font-bold text-xl">
            <i className="fa-solid fa-water"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-800 tracking-tight leading-none font-heading">intecmar</span>
            <span className="text-xs text-gray-500 uppercase tracking-widest">Innovación para emprender</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="nav-link text-gray-600 hover:text-brand-teal transition pb-1">
            Inicio
          </Link>
          <Link href="/nosotros" className="nav-link text-gray-600 hover:text-brand-teal transition pb-1">
            Nosotros
          </Link>
          <Link href="/novedades" className="nav-link text-gray-600 hover:text-brand-teal transition pb-1">
            Novedades
          </Link>
          
          <div className="h-6 w-px bg-gray-300 mx-2"></div> {/* Separator */}
          
          <Link href="/registro" className="nav-link text-gray-600 hover:text-brand-teal transition pb-1">
            Registrarme
          </Link>
          <Link href="/ingresar" className="px-5 py-2 bg-brand-teal text-white rounded-full hover:bg-brand-dark transition shadow-lg shadow-brand-teal/30">
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