import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { encrypt, decrypt } from '@/lib/crypto';

const CONFIG_DIR = path.join(process.cwd(), '.data');
const CONFIG_FILE = path.join(CONFIG_DIR, 'smtp-config.json');

interface StoredSettings {
  host: string;
  port: number;
  secure: boolean;
  requireTLS: boolean;
  user: string;
  password: string;
  from: string;
}

function readConfig(): StoredSettings | null {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch {
    // fall through
  }
  return null;
}

function writeConfig(config: StoredSettings): void {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), { mode: 0o600 });
}

export async function GET() {
  const saved = readConfig();
  if (saved) {
    const hasPassword = !!saved.password;
    return NextResponse.json({
      ...saved,
      password: hasPassword ? '••••••••' : '',
      _hasPassword: hasPassword,
    });
  }

  return NextResponse.json({
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    requireTLS: process.env.SMTP_REQUIRE_TLS !== 'false',
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD ? '••••••••' : '',
    from: process.env.SMTP_FROM || '',
    _hasPassword: !!process.env.SMTP_PASSWORD,
    _source: 'env',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const existing = readConfig();

    let passwordToStore: string;
    if (body.password === '••••••••') {
      passwordToStore = existing?.password || '';
    } else {
      passwordToStore = body.password ? encrypt(body.password) : '';
    }

    const config: StoredSettings = {
      host: body.host || '',
      port: Number(body.port) || 587,
      secure: !!body.secure,
      requireTLS: body.requireTLS !== false,
      user: body.user || '',
      password: passwordToStore,
      from: body.from || '',
    };

    writeConfig(config);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
