import nodemailer from 'nodemailer';

export async function sendNotification({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  // If SMTP credentials are not configured, skip gracefully
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return { success: true, bypassed: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || 'Fundación Underlife'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.warn('Error sending email (non-blocking):', error);
    return { success: false, error };
  }
}

export async function notifyAdmin(subject: string, text: string) {
  if (!process.env.ADMIN_EMAIL) {
    return { success: true, bypassed: true };
  }
  return sendNotification({
    to: process.env.ADMIN_EMAIL,
    subject: `[ADMIN NOTIFICATION] ${subject}`,
    text,
  });
}
