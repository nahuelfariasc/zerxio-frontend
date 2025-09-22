import Link from "next/link"

export default function Footer() {
    return (
      <footer className="bg-slate-900 border-t border-slate-800 py-12 relative z-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative">
                  <div className="text-2xl font-bold tracking-wider">
                    ZERXIO
                  </div>
                  <div className="absolute inset-0 text-2xl font-bold tracking-wider blur-sm opacity-20">
                    <span className="text-cyan-400">ZERXIO</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 mb-4">
                Hosting premium que acelera tu éxito online con tecnología de vanguardia.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Hosting</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Hosting Compartido
                  </Link>
                </li>
                <li>
                  <Link href="/wordpress-hosting" className="hover:text-white transition-colors">
                    WordPress Hosting
                  </Link>
                </li>
                <li>
                  <Link href="/hosting-reseller" className="hover:text-white transition-colors">
                    Hosting Reseller
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/contacto" className="hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Términos
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">&copy; {new Date().getFullYear()} Zerxio. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    )
  }