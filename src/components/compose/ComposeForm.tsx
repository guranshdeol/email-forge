'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface ComposeFormProps {
  html: string;
  transformedHtml: string;
}

export default function ComposeForm({ html, transformedHtml }: ComposeFormProps) {
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [sending, setSending] = useState(false);
  const [showCcBcc, setShowCcBcc] = useState(false);

  const handleSend = async () => {
    if (!to.trim()) {
      toast.error('Please enter a recipient');
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
        body: JSON.stringify({ to, cc, bcc, subject, html }),
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
    <div className="border-t border-surface-700 bg-surface-900 px-4 py-3">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <label className="text-xs text-surface-400 shrink-0 w-8">To</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="recipient@example.com"
            className="flex-1 bg-surface-800 border border-surface-600 rounded px-3 py-1.5 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-accent min-w-0"
          />
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
          <>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <label className="text-xs text-surface-400 shrink-0 w-8">CC</label>
              <input
                type="text"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
                placeholder="cc@example.com"
                className="flex-1 bg-surface-800 border border-surface-600 rounded px-3 py-1.5 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-accent min-w-0"
              />
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <label className="text-xs text-surface-400 shrink-0 w-8">BCC</label>
              <input
                type="text"
                value={bcc}
                onChange={(e) => setBcc(e.target.value)}
                placeholder="bcc@example.com"
                className="flex-1 bg-surface-800 border border-surface-600 rounded px-3 py-1.5 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-accent min-w-0"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <label className="text-xs text-surface-400 shrink-0 w-8">Subj</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
            className="flex-1 bg-surface-800 border border-surface-600 rounded px-3 py-1.5 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-accent min-w-0"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyHtml}
            className="px-3 py-1.5 text-sm bg-surface-700 hover:bg-surface-600 text-white rounded transition-colors"
            title="Copy transformed HTML source code to clipboard"
          >
            Copy HTML
          </button>
          <button
            type="button"
            onClick={handleCopyRichText}
            className="px-3 py-1.5 text-sm bg-surface-700 hover:bg-surface-600 text-white rounded transition-colors"
            title="Copy as rich text - paste directly into email client"
          >
            Copy Rich Text
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={sending}
            className="px-4 py-1.5 text-sm bg-accent hover:bg-accent-hover text-white rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
