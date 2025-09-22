"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      nombre: String(data.get("nombre") || ""),
      empresa: String(data.get("empresa") || ""),
      email: String(data.get("email") || ""),
      telefono: String(data.get("telefono") || ""),
      asunto: String(data.get("asunto") || ""),
      mensaje: String(data.get("mensaje") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.ok === false) {
        throw new Error(json?.message || "No se pudo enviar tu mensaje");
      }

      setStatus("success");
      form.reset();
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error inesperado");
      setStatus("error");
    }
  }

  return (
    <form className="space-y-6 p-0" onSubmit={onSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre" className="text-slate-300">Nombre</Label>
          <Input id="nombre" name="nombre" placeholder="Tu nombre completo" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="empresa" className="text-slate-300">Empresa (Opcional)</Label>
          <Input id="empresa" name="empresa" placeholder="Nombre de tu empresa" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-300">Email</Label>
        <Input id="email" name="email" type="email" placeholder="tu@email.com" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono" className="text-slate-300">Teléfono (Opcional)</Label>
        <Input id="telefono" name="telefono" type="tel" placeholder="+54 9 11 1234-5678" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="asunto" className="text-slate-300">Asunto</Label>
        <select id="asunto" name="asunto" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:border-cyan-400 focus:outline-none" required>
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
        <Label htmlFor="mensaje" className="text-slate-300">Mensaje</Label>
        <Textarea id="mensaje" name="mensaje" placeholder="Cuéntanos cómo podemos ayudarte..." rows={5} className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 resize-none" required />
      </div>

      <div className="space-y-3">
        <Button type="submit" disabled={status === "loading"} className="w-full cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-slate-900 font-semibold transition-all duration-30">
          {status === "loading" ? "Enviando..." : (
            <span className="inline-flex items-center">
              Enviar Mensaje
              <Send className="ml-2 w-4 h-4" />
            </span>
          )}
        </Button>
        {status === "success" && (
          <p className="text-green-400 text-sm">¡Mensaje enviado con éxito! Te responderemos pronto.</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
      </div>
    </form>
  );
}
