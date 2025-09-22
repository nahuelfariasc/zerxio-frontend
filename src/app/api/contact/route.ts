import { NextResponse } from "next/server";

// POST /api/contact
// Expects JSON body: { nombre, empresa?, email, telefono?, asunto, mensaje }
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, message: "Cuerpo inválido" }, { status: 400 });
    }

    const { nombre, empresa, email, telefono, asunto, mensaje } = body as Record<string, string | undefined>;

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json(
        { ok: false, message: "Faltan campos requeridos: nombre, email, asunto, mensaje" },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = "info@zerxio.com";
    const FROM_EMAIL = process.env.RESEND_FROM || "onboarding@resend.dev"; // Cambia a un remitente verificado de tu dominio

    if (!RESEND_API_KEY) {
      // Evitar fallar en desarrollo: logueamos y devolvemos 200 con un warning
      console.warn("RESEND_API_KEY no está configurada. El email no fue enviado.");
      console.info("Payload de contacto:", { nombre, empresa, email, telefono, asunto, mensaje });
      return NextResponse.json({ ok: true, message: "Modo dev: Email no enviado (falta RESEND_API_KEY)" }, { status: 200 });
    }

    const html = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
      ${empresa ? `<p><strong>Empresa:</strong> ${escapeHtml(empresa)}</p>` : ""}
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${telefono ? `<p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>` : ""}
      <p><strong>Asunto:</strong> ${escapeHtml(asunto)}</p>
      <p><strong>Mensaje:</strong><br/>${escapeHtml(mensaje).replace(/\n/g, "<br/>")}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject: `[Contacto] ${asunto}`,
        reply_to: [email],
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Error enviando email con Resend:", res.status, text);
      return NextResponse.json({ ok: false, message: "No se pudo enviar el email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/contact error:", err);
    return NextResponse.json({ ok: false, message: "Error inesperado" }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
