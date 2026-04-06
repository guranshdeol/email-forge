'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/send')
      .then((res) => res.json())
      .then((data) => setConfigured(data.configured))
      .catch(() => setConfigured(false));
  }, []);

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-surface-400 mb-8">Configure your SMTP server to send emails directly from this app.</p>

        <SmtpStatus configured={configured} />

        <div className="bg-surface-900 border border-surface-700 rounded-xl p-6 mt-6">
          <h2 className="text-lg font-semibold text-white mb-4">SMTP Configuration</h2>
          <p className="text-sm text-surface-400 mb-6">
            Set these values in your <code className="bg-surface-800 px-1.5 py-0.5 rounded text-accent text-xs">.env.local</code> file
            in the project root. The app reads them on startup.
          </p>

          <EnvFileGuide />
        </div>

        <div className="bg-surface-900 border border-surface-700 rounded-xl p-6 mt-6">
          <h2 className="text-lg font-semibold text-white mb-4">Test Connection</h2>
          <p className="text-sm text-surface-400 mb-4">
            Send a test email to verify your SMTP configuration is working.
          </p>
          <TestEmailForm />
        </div>

        <div className="bg-surface-900 border border-surface-700 rounded-xl p-6 mt-6">
          <h2 className="text-lg font-semibold text-white mb-4">Common SMTP Configurations</h2>
          <div className="space-y-4">
            <SmtpExample
              name="Gmail"
              host="smtp.gmail.com"
              port="587"
              secure="false"
              requireTLS="true"
              note="Use an App Password (not your regular password). Enable 2FA first."
            />
            <SmtpExample
              name="Outlook / Office 365"
              host="smtp.office365.com"
              port="587"
              secure="false"
              requireTLS="true"
              note="Use your Microsoft account credentials."
            />
            <SmtpExample
              name="Corporate SMTP Relay"
              host="your-relay.corp.example.com"
              port="587"
              secure="false"
              requireTLS="true"
              note="Typically requires a service account. Check with your IT team."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SmtpStatus({ configured }: { configured: boolean | null }) {
  if (configured === null) {
    return (
      <div className="bg-surface-800 border border-surface-700 rounded-lg p-4 flex items-center gap-3">
        <div className="w-3 h-3 bg-surface-500 rounded-full animate-pulse" />
        <span className="text-sm text-surface-400">Checking SMTP configuration...</span>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg p-4 flex items-center gap-3 ${
      configured
        ? 'bg-emerald-950/30 border-emerald-800'
        : 'bg-amber-950/30 border-amber-800'
    }`}>
      <div className={`w-3 h-3 rounded-full ${configured ? 'bg-emerald-400' : 'bg-amber-400'}`} />
      <span className={`text-sm ${configured ? 'text-emerald-300' : 'text-amber-300'}`}>
        {configured
          ? 'SMTP is configured. You can send emails.'
          : 'SMTP is not configured. Add settings to .env.local to enable sending. Copy to clipboard always works.'}
      </span>
    </div>
  );
}

function EnvFileGuide() {
  const envContent = `# SMTP Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true
SMTP_USER=your-username@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=Your Name <your-username@example.com>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(envContent);
    toast.success('Copied .env.local template to clipboard');
  };

  return (
    <div className="relative">
      <pre className="bg-surface-950 border border-surface-700 rounded-lg p-4 text-xs text-surface-300 font-mono overflow-x-auto">
        {envContent}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 text-xs bg-surface-700 hover:bg-surface-600 text-surface-300 rounded transition-colors"
      >
        Copy
      </button>
    </div>
  );
}

function TestEmailForm() {
  const [testTo, setTestTo] = useState('');
  const [testing, setTesting] = useState(false);

  const handleTest = async () => {
    if (!testTo.trim()) {
      toast.error('Enter an email address');
      return;
    }
    setTesting(true);
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: testTo,
          subject: 'Email Forge - Test Email',
          html: '<div style="font-family: Arial, sans-serif; padding: 20px;"><h2 style="color: #4f46e5;">It works!</h2><p style="color: #334155;">Your SMTP configuration is working correctly. You can now send emails from Email Forge.</p></div>',
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Test email sent successfully! Check your inbox.');
      } else {
        toast.error(data.error || 'Failed to send test email');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="email"
        value={testTo}
        onChange={(e) => setTestTo(e.target.value)}
        placeholder="your-email@example.com"
        className="flex-1 bg-surface-800 border border-surface-600 rounded px-3 py-2 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-accent"
      />
      <button
        type="button"
        onClick={handleTest}
        disabled={testing}
        className="px-4 py-2 text-sm bg-accent hover:bg-accent-hover text-white rounded font-medium transition-colors disabled:opacity-50"
      >
        {testing ? 'Sending...' : 'Send Test'}
      </button>
    </div>
  );
}

function SmtpExample({
  name,
  host,
  port,
  secure,
  requireTLS,
  note,
}: {
  name: string;
  host: string;
  port: string;
  secure: string;
  requireTLS: string;
  note: string;
}) {
  return (
    <div className="bg-surface-800 border border-surface-700 rounded-lg p-4">
      <h3 className="text-sm font-medium text-white mb-2">{name}</h3>
      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
        <span className="text-surface-400">Host: <code className="text-surface-200">{host}</code></span>
        <span className="text-surface-400">Port: <code className="text-surface-200">{port}</code></span>
        <span className="text-surface-400">Secure: <code className="text-surface-200">{secure}</code></span>
        <span className="text-surface-400">Require TLS: <code className="text-surface-200">{requireTLS}</code></span>
      </div>
      <p className="text-xs text-surface-500">{note}</p>
    </div>
  );
}
