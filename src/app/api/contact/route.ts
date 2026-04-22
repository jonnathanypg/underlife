import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendNotification, notifyAdmin } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, source = 'CONTACT_FORM' } = body;

    // 1. Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // 2. Save lead/contact in Database using Prisma
    const newLead = await prisma.lead.create({
      data: {
        name,
        email,
        subject,
        message,
        source,
      },
    });

    // 3. Send automated email to the user (Lead)
    await sendNotification({
      to: email,
      subject: 'Hemos recibido tu mensaje - Fundación Underlife',
      text: `Hola ${name},\n\nGracias por contactarte con Fundación Underlife. Hemos recibido tu mensaje y nuestro equipo se comunicará contigo pronto.\n\nDetalles de tu mensaje:\nAsunto: ${subject}\nMensaje: ${message}\n\nUn abrazo,\nEl equipo de Fundación Underlife`,
      html: `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
               <h2 style="color: #0055ff;">¡Gracias por escribir Nos comunicaremos pronto!</h2>
               <p>Hola <strong>${name}</strong>,</p>
               <p>Gracias por contactarte con Fundación Underlife. Hemos recibido tu mensaje y uno de nuestros miembros te responderá a la brevedad.</p>
               <hr style="border: 1px solid #eee;" />
               <p><strong>Asunto:</strong> ${subject}</p>
               <p><strong>Mensaje:</strong><br/>${message}</p>
               <br/>
               <p>Un abrazo solidario,<br/><strong>El equipo de Fundación Underlife</strong></p>
             </div>`,
    });

    // 4. Send internal notification to Administration
    await notifyAdmin(
      `Nuevo Contacto Web: ${subject || 'Sin Asunto'}`,
      `Se ha recibido un nuevo formulario de contacto:\n\nNombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\nMensaje:\n${message}`
    );

    return NextResponse.json({ success: true, data: newLead });
  } catch (error) {
    console.error('Error in Contact API:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
