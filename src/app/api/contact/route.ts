import { NextResponse } from 'next/server';
import { notifyAdmin, sendNotification } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      city, 
      intention, 
      subOption, 
      mode, 
      availability, 
      subject, 
      message 
    } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'El nombre y el correo electrónico son requeridos.' },
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

    const intentionLabels: Record<string, string> = {
      volunteering: '🤝 Voluntariado y Talento Divergente',
      donation: '💝 Donaciones y Filantropía',
      alliance: '🏛️ Alianza Estratégica / RSE',
      justice: '⚖️ Justicia Digital / Apoyo Comunitario',
      general: '💬 Consulta General / Mensaje',
    };

    const formattedSubject = subject || intentionLabels[intention] || 'Nuevo Contacto Web';
    const readableIntention = intentionLabels[intention] || intention || 'General';

    // Format plain text summary
    const textSummary = `
Nuevo contacto conversacional recibido desde fundacionunderlife.org:

- Nombre: ${name}
- Email: ${email}
- Teléfono/WhatsApp: ${phone || 'No especificado'}
- Ciudad/País: ${city || 'No especificado'}
- Objetivo/Intención: ${readableIntention}
- Subcategoría/Área: ${subOption || 'N/A'}
- Modalidad/Formato: ${mode || 'N/A'}
- Disponibilidad/Alcance: ${availability || 'N/A'}
- Mensaje / Notas:
${message || 'Sin mensaje adicional'}
    `.trim();

    // 1. Notify Admin via SMTP (Nodemailer)
    try {
      await notifyAdmin(
        `[${readableIntention}] ${name} (${city || 'Ecuador'})`,
        textSummary
      );
    } catch (smtpErr) {
      console.warn('[contact/route] SMTP notification bypassed:', smtpErr);
    }

    // 2. Also try Resend if configured in environment
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_EMAIL ?? 'info@fundacionunderlife.org';

    if (RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Fundación Underlife <no-reply@fundacionunderlife.org>',
            to: [TO_EMAIL],
            reply_to: email,
            subject: `[${readableIntention}] ${name} — Contacto Conversacional`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                  <h2 style="color: #0055FF; margin: 0; font-size: 1.4rem;">Fundación Underlife</h2>
                </div>
                <div style="background: #f8fafc; border-left: 4px solid #0055FF; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
                  <strong style="color: #1e293b; font-size: 1.1rem;">${readableIntention}</strong>
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
                  <tr><td style="padding: 8px 0; font-weight: bold; width: 140px; color: #64748b;">Nombre:</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0055FF;">${email}</a></td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Teléfono / WhatsApp:</td><td style="padding: 8px 0;">${phone || 'No especificado'}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Ciudad / Ubicación:</td><td style="padding: 8px 0;">${city || 'No especificado'}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Especialidad / Interés:</td><td style="padding: 8px 0;">${subOption || 'N/A'}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Modalidad / Formato:</td><td style="padding: 8px 0;">${mode || 'N/A'}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Disponibilidad:</td><td style="padding: 8px 0;">${availability || 'N/A'}</td></tr>
                </table>
                <div style="margin-top: 20px; padding: 16px; background: #f1f5f9; border-radius: 8px;">
                  <div style="font-weight: bold; color: #475569; margin-bottom: 6px; font-size: 13px;">Mensaje o notas adicionales:</div>
                  <div style="white-space: pre-wrap; color: #1e293b; font-size: 14px; line-height: 1.6;">${message || 'Sin mensaje adicional'}</div>
                </div>
                <hr style="margin-top: 24px; border: none; border-top: 1px solid #e2e8f0;" />
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">Enviado desde el formulario conversacional de fundacionunderlife.org</p>
              </div>
            `,
          }),
        });
      } catch (resendErr) {
        console.warn('[contact/route] Resend send error:', resendErr);
      }
    }

    return NextResponse.json({ 
      ok: true, 
      success: true, 
      message: 'Mensaje procesado exitosamente.' 
    });
  } catch (error: any) {
    console.error('[contact/route] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor. Por favor intenta de nuevo.' },
      { status: 500 }
    );
  }
}
