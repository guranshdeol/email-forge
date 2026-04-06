import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, isSmtpConfigured } from '@/lib/smtp';
import { transformEmailHtml } from '@/lib/transform';

export async function POST(request: NextRequest) {
  try {
    if (!isSmtpConfigured()) {
      return NextResponse.json(
        { error: 'SMTP is not configured. Add SMTP settings to your .env.local file.' },
        { status: 400 }
      );
    }

    const { to, cc, bcc, subject, html } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ error: 'Missing required fields: to, subject, html' }, { status: 400 });
    }

    const transformedHtml = transformEmailHtml(html);

    const result = await sendEmail({
      to,
      cc: cc || undefined,
      bcc: bcc || undefined,
      subject,
      html: transformedHtml,
    });

    if (result.success) {
      return NextResponse.json({ success: true, messageId: result.messageId });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Send failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ configured: isSmtpConfigured() });
}
