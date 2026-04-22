import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  // If SMTP_USE_TLS is true, secure is usually false in nodemailer (uses STARTTLS on port 587)
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

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
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || 'Fundación Underlife'}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function notifyAdmin(subject: string, text: string) {
  return sendNotification({
    to: process.env.ADMIN_EMAIL || '',
    subject: `[ADMIN NOTIFICATION] ${subject}`,
    text,
  });
}
