'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface SmtpFormData {
  host: string;
  port: number;
  secure: boolean;
  requireTLS: boolean;
  user: string;
  password: string;
  from: string;
}

const EMPTY_FORM: SmtpFormData = {
  host: '',
  port: 587,
  secure: false,
  requireTLS: true,
  user: '',
  password: '',
  from: '',
};

export default function SettingsPage() {
  const [form, setForm] = useState<SmtpFormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setForm({
          host: data.host || '',
          port: data.port || 587,
          secure: !!data.secure,
          requireTLS: data.requireTLS !== false,
          user: data.user || '',
          password: data.password || '',
          from: data.from || '',
        });
        setConfigured(data._hasPassword && !!data.host);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!form.host.trim()) {
      toast.error('SMTP host is required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('SMTP settings saved');
        setConfigured(true);
      } else {
        toast.error(data.error || 'Failed to save');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const applyPreset = (preset: { host: string; port: number; secure: boolean; requireTLS: boolean }) => {
    setForm((prev) => ({ ...prev, ...preset }));
    toast.success('Preset applied. Fill in your credentials and save.');
  };

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-surface-400 mb-8">Configure your SMTP server to send emails directly from this app.</p>

        <SmtpStatus configured={configured} loading={loading} />

        <div className="glass-surface rounded-2xl p-6 mt-6">
          <h2 className="text-lg font-semibold text-white mb-6">SMTP Configuration</h2>

          {loading ? (
            <div className="text-surface-400 text-sm">Loading settings...</div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="SMTP Host" value={form.host} onChange={(v) => setForm({ ...form, host: v })} placeholder="smtp.example.com" />
                <Field label="Port" value={String(form.port)} onChange={(v) => setForm({ ...form, port: Number(v) || 587 })} placeholder="587" type="number" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Username" value={form.user} onChange={(v) => setForm({ ...form, user: v })} placeholder="user@example.com" />
                <Field label="Password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} placeholder="••••••••" type="password" />
              </div>

              <Field label="From Address" value={form.from} onChange={(v) => setForm({ ...form, from: v })} placeholder="Your Name <user@example.com>" />

              <div className="flex items-center gap-6 pt-2">
                <Toggle label="Use implicit TLS (port 465)" checked={form.secure} onChange={(v) => setForm({ ...form, secure: v })} />
                <Toggle label="Require STARTTLS" checked={form.requireTLS} onChange={(v) => setForm({ ...form, requireTLS: v })} />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2 text-sm bg-accent/90 hover:bg-accent text-white rounded-lg font-medium transition-all disabled:opacity-50 backdrop-blur-sm"
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
                <span className="text-xs text-surface-500">Encrypted and stored locally (never committed to git)</span>
              </div>
            </div>
          )}
        </div>

        <div className="glass-surface rounded-2xl p-6 mt-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Presets</h2>
          <p className="text-sm text-surface-400 mb-4">Click a preset to auto-fill server settings, then add your credentials.</p>
          <div className="grid grid-cols-3 gap-3">
            <PresetBtn
              name="Gmail"
              sub="smtp.gmail.com"
              onClick={() => applyPreset({ host: 'smtp.gmail.com', port: 587, secure: false, requireTLS: true })}
            />
            <PresetBtn
              name="Outlook 365"
              sub="smtp.office365.com"
              onClick={() => applyPreset({ host: 'smtp.office365.com', port: 587, secure: false, requireTLS: true })}
            />
            <PresetBtn
              name="Yahoo"
              sub="smtp.mail.yahoo.com"
              onClick={() => applyPreset({ host: 'smtp.mail.yahoo.com', port: 465, secure: true, requireTLS: false })}
            />
          </div>
        </div>

        <div className="glass-surface rounded-2xl p-6 mt-6">
          <h2 className="text-lg font-semibold text-white mb-4">Test Connection</h2>
          <p className="text-sm text-surface-400 mb-4">Send a test email to verify your configuration works.</p>
          <TestEmailForm />
        </div>
      </div>
    </div>
  );
}

function SmtpStatus({ configured, loading }: { configured: boolean; loading: boolean }) {
  if (loading) {
    return (
      <div className="glass-surface rounded-xl p-4 flex items-center gap-3">
        <div className="w-3 h-3 bg-surface-500 rounded-full animate-pulse" />
        <span className="text-sm text-surface-400">Checking SMTP configuration...</span>
      </div>
    );
  }

  return (
    <div className={`rounded-xl p-4 flex items-center gap-3 backdrop-blur-md ${
      configured
        ? 'bg-emerald-500/10 border border-emerald-500/20'
        : 'bg-amber-500/10 border border-amber-500/20'
    }`}>
      <div className={`w-3 h-3 rounded-full ${configured ? 'bg-emerald-400' : 'bg-amber-400'}`} />
      <span className={`text-sm ${configured ? 'text-emerald-300' : 'text-amber-300'}`}>
        {configured
          ? 'SMTP is configured. You can send emails.'
          : 'SMTP is not configured. Fill in the form below or use Copy to Clipboard on the compose page.'}
      </span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-surface-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full glass-input rounded-lg px-3 py-2 text-sm text-white placeholder-surface-500 focus:outline-none transition-all"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors ${checked ? 'bg-accent' : 'bg-white/10'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${checked ? 'translate-x-4' : ''}`} />
      </button>
      <span className="text-xs text-surface-400">{label}</span>
    </label>
  );
}

function PresetBtn({ name, sub, onClick }: { name: string; sub: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-btn rounded-xl p-3 text-left hover:border-accent/30 transition-all"
    >
      <div className="text-sm font-medium text-white">{name}</div>
      <div className="text-xs text-surface-500 mt-0.5">{sub}</div>
    </button>
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
        className="flex-1 glass-input rounded-lg px-3 py-2 text-sm text-white placeholder-surface-500 focus:outline-none"
      />
      <button
        type="button"
        onClick={handleTest}
        disabled={testing}
        className="px-4 py-2 text-sm bg-accent/90 hover:bg-accent text-white rounded-lg font-medium transition-all disabled:opacity-50 backdrop-blur-sm"
      >
        {testing ? 'Sending...' : 'Send Test'}
      </button>
    </div>
  );
}
