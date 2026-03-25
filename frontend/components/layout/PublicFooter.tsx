import Link from 'next/link';
import Image from 'next/image'; 

export const PublicFooter = () => {
  return (
    <footer className="bg-brand-dark text-white py-10 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo y descripción */}
        <div className="col-span-1 md:col-span-2">
          
          {/* Logo Blanco */}
          <Link href="/" className="inline-block mb-4">
            <Image 
              src="/intecmar-blanco.png" 
              alt="Logo Intecmar"
              width={160} 
              height={45}
              className="object-contain min-w-[111px]" // Mantiene la proporción y respeta el manual
            />
          </Link>
          
          <p className="text-gray-300 text-sm leading-relaxed max-w-sm mt-2">
            Conectando comunidad y tecnología para impulsar la innovación y los emprendimientos del futuro. Una red de apoyo para el desarrollo regional.
          </p>
        </div>

        {/* Enlaces Rápidos */}
        <div>
          <h4 className="font-bold mb-4 text-brand-teal">Enlaces Rápidos</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:text-white transition">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/nosotros" className="hover:text-white transition">
                Red de Instituciones
              </Link>
            </li>
            <li>
              <Link href="/novedades" className="hover:text-white transition">
                Actividades
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="font-bold mb-4 text-brand-teal">Contacto</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <i className="fas fa-envelope mr-2"></i>
              <a href="mailto:contacto@intecmar.edu.ar" className="hover:text-white transition">
                contacto@intecmar.edu.ar
              </a>
            </li>
            <li>
              <i className="fas fa-phone mr-2"></i>
              <a href="tel:+542231234567" className="hover:text-white transition">
                +54 223 123 4567
              </a>
            </li>
            <li>
              <i className="fas fa-map-marker-alt mr-2"></i>
              <span>Mar del Plata, Argentina</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-xs text-gray-400">
        &copy; 2026 Intecmar. Todos los derechos reservados.
      </div>
    </footer>
  );
};