import nodemailer from 'nodemailer';

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  requireTLS: boolean;
  user: string;
  password: string;
  from: string;
}

export interface EmailPayload {
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  html: string;
}

function getSmtpConfig(): SmtpConfig {
  return {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    requireTLS: process.env.SMTP_REQUIRE_TLS !== 'false',
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    from: process.env.SMTP_FROM || '',
  };
}

export function isSmtpConfigured(): boolean {
  const config = getSmtpConfig();
  return !!(config.host && config.user && config.password && config.from);
}

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const config = getSmtpConfig();

  if (!config.host || !config.user || !config.password) {
    return { success: false, error: 'SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD in your .env.local file.' };
  }

  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: config.requireTLS,
    tls: { minVersion: 'TLSv1.2' },
    auth: {
      user: config.user,
      pass: config.password,
    },
  });

  try {
    const info = await transport.sendMail({
      from: config.from,
      to: payload.to,
      cc: payload.cc || undefined,
      bcc: payload.bcc || undefined,
      subject: payload.subject,
      html: payload.html,
    });
    return { success: true, messageId: info.messageId };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown SMTP error';
    return { success: false, error: message };
  }
}
