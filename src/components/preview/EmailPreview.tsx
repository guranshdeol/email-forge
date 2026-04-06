'use client';

import { useState } from 'react';

interface EmailPreviewProps {
  html: string;
}

export default function EmailPreview({ html }: EmailPreviewProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [view, setView] = useState<'preview' | 'source'>('preview');

  const previewHtml =
    mode === 'dark'
      ? `<div style="background-color: #1a1a2e; min-height: 100vh; padding: 0; margin: 0;">
          <style>
            * { color-scheme: dark; }
            @media (prefers-color-scheme: light) { :root { color-scheme: dark; } }
          </style>
          ${html}
        </div>`
      : html;

  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; padding: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        ${mode === 'dark' ? 'body { background-color: #1a1a2e; color: #e0e0e0; }' : 'body { background-color: #ffffff; }'}
      </style>
    </head>
    <body>${previewHtml}</body>
    </html>
  `;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-surface-700 bg-surface-900 px-3">
        <div className="flex items-center">
          <TabBtn active={view === 'preview'} onClick={() => setView('preview')} label="Preview" />
          <TabBtn active={view === 'source'} onClick={() => setView('source')} label="Source" />
        </div>
        {view === 'preview' && (
          <div className="flex items-center gap-1 py-1">
            <ModeBtn active={mode === 'light'} onClick={() => setMode('light')} label="Light" />
            <ModeBtn active={mode === 'dark'} onClick={() => setMode('dark')} label="Dark" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto bg-surface-800">
        {view === 'preview' ? (
          <iframe
            srcDoc={iframeSrcDoc}
            className="w-full h-full border-0"
            sandbox="allow-same-origin"
            title="Email Preview"
          />
        ) : (
          <pre className="p-4 text-xs text-surface-300 font-mono whitespace-pre-wrap break-all overflow-auto h-full">
            {html || '<empty>'}
          </pre>
        )}
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors relative ${
        active ? 'text-white' : 'text-surface-400 hover:text-surface-200'
      }`}
    >
      {label}
      {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
    </button>
  );
}

function ModeBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1 text-xs rounded transition-colors ${
        active ? 'bg-surface-700 text-white' : 'text-surface-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}
