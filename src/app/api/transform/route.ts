import { NextRequest, NextResponse } from 'next/server';
import { transformEmailHtml } from '@/lib/transform';

export async function POST(request: NextRequest) {
  try {
    const { html } = await request.json();

    if (!html || typeof html !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid "html" field' }, { status: 400 });
    }

    const transformed = transformEmailHtml(html);
    return NextResponse.json({ html: transformed });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Transform failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
