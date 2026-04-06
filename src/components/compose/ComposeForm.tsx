'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import EmailChipInput from './EmailChipInput';

interface ComposeFormProps {
  html: string;
  transformedHtml: string;
}

export default function ComposeForm({ html, transformedHtml }: ComposeFormProps) {
  const [toEmails, setToEmails] = useState<string[]>([]);
  const [ccEmails, setCcEmails] = useState<string[]>([]);
  const [bccEmails, setBccEmails] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [sending, setSending] = useState(false);
  const [showCcBcc, setShowCcBcc] = useState(false);

  const handleSend = async () => {
    if (toEmails.length === 0) {
      toast.error('Please enter at least one recipient');
      return;
    }
    if (!subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }
    if (!html.trim()) {
      toast.error('Email body is empty');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: toEmails.join(', '),
          cc: ccEmails.join(', ') || undefined,
          bcc: bccEmails.join(', ') || undefined,
          subject,
          html,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Email sent! Message ID: ${data.messageId}`);
      } else {
        toast.error(data.error || 'Failed to send email');
      }
    } catch {
      toast.error('Network error. Is the server running?');
    } finally {
      setSending(false);
    }
  };

  const handleCopyHtml = async () => {
    if (!transformedHtml.trim()) {
      toast.error('Nothing to copy. Write some email content first.');
      return;
    }
    try {
      await navigator.clipboard.writeText(transformedHtml);
      toast.success('Transformed HTML copied to clipboard');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = transformedHtml;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      toast.success('Transformed HTML copied to clipboard');
    }
  };

  const handleCopyRichText = async () => {
    if (!transformedHtml.trim()) {
      toast.error('Nothing to copy. Write some email content first.');
      return;
    }
    try {
      const blob = new Blob([transformedHtml], { type: 'text/html' });
      await navigator.clipboard.write([
        new ClipboardItem({ 'text/html': blob, 'text/plain': new Blob([transformedHtml], { type: 'text/plain' }) }),
      ]);
      toast.success('Rich text copied! Paste directly into your email client.');
    } catch {
      await navigator.clipboard.writeText(transformedHtml);
      toast.success('Copied as plain HTML (rich text copy not supported in this browser)');
    }
  };

  return (
    <div className="border-t border-white/[0.06] glass-panel px-4 py-3">
      <div className="flex items-center gap-3">
        <label className="text-xs text-surface-400 shrink-0 w-7">To</label>
        <EmailChipInput emails={toEmails} onChange={setToEmails} placeholder="recipient@example.com" />
        {!showCcBcc && (
          <button
            type="button"
            onClick={() => setShowCcBcc(true)}
            className="text-xs text-surface-400 hover:text-accent shrink-0"
          >
            CC/BCC
          </button>
        )}
      </div>

      {showCcBcc && (
        <div className="flex items-center gap-3 mt-2">
          <label className="text-xs text-surface-400 shrink-0 w-7">CC</label>
          <EmailChipInput emails={ccEmails} onChange={setCcEmails} placeholder="cc@example.com" />
        </div>
      )}

      {showCcBcc && (
        <div className="flex items-center gap-3 mt-2">
          <label className="text-xs text-surface-400 shrink-0 w-7">BCC</label>
          <EmailChipInput emails={bccEmails} onChange={setBccEmails} placeholder="bcc@example.com" />
        </div>
      )}

      <div className="flex items-center gap-3 mt-2">
        <label className="text-xs text-surface-400 shrink-0 w-7">Subj</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Email subject"
          className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-accent/50 transition-colors min-w-0"
        />

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyHtml}
            className="px-3 py-1.5 text-sm glass-btn text-surface-300 hover:text-white rounded-lg transition-all"
            title="Copy transformed HTML source code to clipboard"
          >
            Copy HTML
          </button>
          <button
            type="button"
            onClick={handleCopyRichText}
            className="px-3 py-1.5 text-sm glass-btn text-surface-300 hover:text-white rounded-lg transition-all"
            title="Copy as rich text - paste directly into email client"
          >
            Copy Rich Text
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={sending}
            className="px-4 py-1.5 text-sm bg-accent/90 hover:bg-accent text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
