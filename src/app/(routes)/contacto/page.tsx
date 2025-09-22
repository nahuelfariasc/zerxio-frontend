import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, Clock, MessageSquare, ArrowLeft, Send, Headphones, Globe, Zap } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils";

export default function Contacto() {
  return (
    <div className="min-h-screen text-white relative">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-slate-900"></div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent font-mono tracking-wide">
              Contáctanos
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              ¿Tienes preguntas sobre nuestros servicios? Nuestro equipo de expertos está aquí para ayudarte las 24
              horas del día.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative z-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className={cn(
                  "relative p-10 rounded-xl border border-cyan-400/20 bg-slate-900/80 backdrop-blur-sm",
                  "transition-all duration-500 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10",
                  "flex flex-col h-full"
                )}>
              <CardHeader className="p-0">
                <CardTitle className="text-white text-2xl">Envíanos un Mensaje</CardTitle>
                <CardDescription className="text-slate-400">
                  Completa el formulario y te responderemos en menos de 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-slate-300">
                      Nombre
                    </Label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre completo"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa" className="text-slate-300">
                      Empresa (Opcional)
                    </Label>
                    <Input
                      id="empresa"
                      placeholder="Nombre de tu empresa"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-slate-300">
                    Teléfono (Opcional)
                  </Label>
                  <Input
                    id="telefono"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asunto" className="text-slate-300">
                    Asunto
                  </Label>
                  <select
                    id="asunto"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="">Selecciona un tema</option>
                    <option value="hosting-compartido">Hosting Compartido</option>
                    <option value="wordpress-hosting">WordPress Hosting</option>
                    <option value="hosting-reseller">Hosting Reseller</option>
                    <option value="soporte-tecnico">Soporte Técnico</option>
                    <option value="facturacion">Facturación</option>
                    <option value="ventas">Consulta de Ventas</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje" className="text-slate-300">
                    Mensaje
                  </Label>
                  <Textarea
                    id="mensaje"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={5}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 resize-none"
                  />
                </div>

                <Button className="w-full cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-slate-900 font-semibold transition-all duration-30">
                  Enviar Mensaje
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Otras Formas de Contacto</h2>

                <Card className={cn(
                  "relative p-10 rounded-xl border border-cyan-400/20 bg-slate-900/80 backdrop-blur-sm",
                  "transition-all duration-500 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10",
                  "flex flex-col h-full"
                )}>
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">Email</h3>
                        <p className="text-slate-300 mb-1">info@zerxio.com</p>
                        <p className="text-slate-400 text-sm mt-2">Respuesta en menos de 24 horas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* <Card className={cn(
                  "relative p-10 rounded-xl border border-cyan-400/20 bg-slate-900/80 backdrop-blur-sm",
                  "transition-all duration-500 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10",
                  "flex flex-col h-full"
                )}>
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-400/10 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">Teléfono</h3>
                        <p className="text-slate-300 mb-1">+1 (555) 123-ZERO</p>
                        <p className="text-slate-400 text-sm mt-2">Disponible 24/7</p>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-800/50 relative z-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Preguntas Frecuentes</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Encuentra respuestas rápidas a las consultas más comunes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">¿Cuánto tiempo toma activar mi hosting?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Tu hosting se activa automáticamente después del pago. Recibirás los datos de acceso por email en
                  menos de 5 minutos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">¿Ofrecen garantía de devolución?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Sí, ofrecemos garantía de devolución de 30 días sin preguntas. Si no estás satisfecho, te devolvemos
                  tu dinero.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">¿Puedo migrar mi sitio web existente?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Por supuesto. Nuestro equipo técnico te ayuda gratuitamente a migrar tu sitio web desde tu proveedor
                  actual.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">¿Qué métodos de pago aceptan?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Aceptamos tarjetas de crédito/débito, PayPal, transferencias bancarias y criptomonedas principales.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}