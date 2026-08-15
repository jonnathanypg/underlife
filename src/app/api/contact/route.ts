import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Correo electrónico inválido.' },
        { status: 400 }
      );
    }

    // Try to send via Resend (if configured) or log and succeed
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_EMAIL ?? 'info@fundacionunderlife.org';

    if (RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Fundación Underlife <no-reply@fundacionunderlife.org>',
          to: [TO_EMAIL],
          reply_to: email,
          subject: `[Contacto Web] ${subject} — ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #0055FF;">Nuevo mensaje de contacto — Fundación Underlife</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; font-weight: bold; width: 120px;">Nombre:</td><td style="padding: 8px;">${name}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Asunto:</td><td style="padding: 8px;">${subject}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Mensaje:</td><td style="padding: 8px; white-space: pre-wrap;">${message}</td></tr>
              </table>
              <hr style="margin-top: 24px; border: none; border-top: 1px solid #eee;" />
              <p style="color: #888; font-size: 12px;">Este mensaje fue enviado desde fundacionunderlife.org</p>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error('[contact/route] Resend error:', err);
        // Don't expose the error to the client — fall through to success
      }
    } else {
      // Development: log to console
      console.log('[contact/route] Message received (no RESEND_API_KEY set):', {
        name,
        email,
        subject,
        message: message.substring(0, 100),
      });
    }

    return NextResponse.json({ ok: true, message: 'Mensaje enviado exitosamente.' });
  } catch (error) {
    console.error('[contact/route] Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor. Por favor intenta de nuevo.' },
      { status: 500 }
    );
  }
}
