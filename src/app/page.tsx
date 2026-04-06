'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import EmailPreview from '@/components/preview/EmailPreview';
import ComposeForm from '@/components/compose/ComposeForm';
import TemplateGallery from '@/components/templates/TemplateGallery';

const CodeEditor = dynamic(() => import('@/components/editor/CodeEditor'), { ssr: false });

const DEFAULT_HTML = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
  <tr>
    <td style="background-color: #ffffff; padding: 32px;">
      <h1 style="color: #1e293b; font-size: 24px; margin: 0 0 16px;">Hello!</h1>
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0;">
        Start editing this email or choose a template to get started.
        The preview on the right updates in real-time with email-safe transformations.
      </p>
    </td>
  </tr>
</table>`;

export default function ComposePage() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [transformedHtml, setTransformedHtml] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const transformHtml = useCallback(async (rawHtml: string) => {
    try {
      const res = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: rawHtml }),
      });
      const data = await res.json();
      if (data.html) {
        setTransformedHtml(data.html);
      }
    } catch {
      setTransformedHtml(rawHtml);
    }
  }, []);

  const handleHtmlChange = useCallback(
    (newHtml: string) => {
      setHtml(newHtml);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => transformHtml(newHtml), 500);
    },
    [transformHtml]
  );

  useEffect(() => {
    transformHtml(html);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTemplateSelect = (templateHtml: string) => {
    setHtml(templateHtml);
    transformHtml(templateHtml);
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 border-b border-surface-700 bg-surface-900 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold text-white">Compose</h1>
          <button
            type="button"
            onClick={() => setShowTemplates(true)}
            className="px-3 py-1 text-xs bg-surface-800 border border-surface-600 text-surface-300 hover:text-white hover:border-surface-500 rounded transition-colors"
          >
            Templates
          </button>
        </div>
        <div className="text-xs text-surface-500">
          {transformedHtml ? `${(new TextEncoder().encode(transformedHtml).length / 1024).toFixed(1)} KB` : ''}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 flex flex-col border-r border-surface-700 min-w-0">
          <div className="flex items-center px-3 py-1.5 border-b border-surface-700 bg-surface-900">
            <span className="text-xs text-surface-400 font-medium">HTML</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor value={html} onChange={handleHtmlChange} />
          </div>
        </div>

        <div className="w-1/2 flex flex-col min-w-0">
          <EmailPreview html={transformedHtml} />
        </div>
      </div>

      <ComposeForm html={html} transformedHtml={transformedHtml} />

      {showTemplates && (
        <TemplateGallery onSelect={handleTemplateSelect} onClose={() => setShowTemplates(false)} />
      )}
    </>
  );
}
