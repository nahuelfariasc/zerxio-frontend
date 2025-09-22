"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"

export default function Header() {
  const [open, setOpen] = useState(false)
  const [isPlansOpen, setIsPlansOpen] = useState(false)

  return (
    <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 top-0 fixed w-full z-50">
      <div className="container h-16 flex justify-between items-center px-4">
        <Link href="/" className="text-xl font-bold text-primary flex items-center gap-4">
          <Image src="/favicon.ico" alt="Zerxio Logo" className="rounded-full" width={32} height={32} />
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="text-2xl font-bold tracking-wider">
                ZERXIO
              </div>
              <div className="absolute inset-0 text-2xl font-bold tracking-wider blur-sm opacity-20">
                <span className="text-cyan-400">ZERXIO</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsPlansOpen(true)}
            onMouseLeave={() => setIsPlansOpen(false)}
          >
            <button className="flex items-center text-slate-300 hover:text-white transition-colors">
              Planes
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>

            {isPlansOpen && (
              <div className="absolute top-full left-0 pt-2 w-56">
                <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                  <div className="py-1">
                    <Link
                      href="/hosting-compartido"
                      className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      <div>
                        <div className="font-medium">Hosting Compartido</div>
                        <div className="text-sm text-slate-400">Hosting común y confiable</div>
                      </div>
                    </Link>
                    <Link
                      href="/hosting-wordpress"
                      className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      <div>
                        <div className="font-medium">WordPress Hosting</div>
                        <div className="text-sm text-slate-400">Optimizado para WordPress</div>
                      </div>
                    </Link>
                    <Link
                      href="/hosting-reseller"
                      className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      <div>
                        <div className="font-medium">Hosting Reseller</div>
                        <div className="text-sm text-slate-400">Revende hosting con cPanel</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link href="/contacto" className="text-slate-300 hover:text-white transition-colors">Contacto</Link>
          <Button
            variant="outline"
            className=""
          >
            Iniciar Sesión
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden text-slate-300 hover:text-white transition-colors"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-2 space-y-2">
          <Link 
            href="/hosting-compartido" 
            className="block py-2 text-slate-300 hover:text-white"
            onClick={() => setOpen(false)}
          >
            Hosting Compartido
          </Link>
          <Link 
            href="/wordpress-hosting" 
            className="block py-2 text-slate-300 hover:text-white"
            onClick={() => setOpen(false)}
          >
            WordPress Hosting
          </Link>
          <Link 
            href="/hosting-reseller" 
            className="block py-2 text-slate-300 hover:text-white"
            onClick={() => setOpen(false)}
          >
            Hosting Reseller
          </Link>
          <div className="border-t border-slate-800 my-2"></div>
          <Link 
            href="/contacto" 
            className="block py-2 text-slate-300 hover:text-white"
            onClick={() => setOpen(false)}
          >
            Contacto
          </Link>
          <Link 
            href="/login" 
            className="block py-2 text-slate-300 hover:text-white"
            onClick={() => setOpen(false)}
          >
            Iniciar sesión
          </Link>
        </nav>
      )}
    </header>
  )
}