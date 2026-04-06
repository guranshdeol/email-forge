'use client';

import { useState, useRef, KeyboardEvent } from 'react';

interface EmailChipInputProps {
  emails: string[];
  onChange: (emails: string[]) => void;
  placeholder?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailChipInput({ emails, onChange, placeholder }: EmailChipInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addEmail = (raw: string) => {
    const email = raw.trim().toLowerCase();
    if (!email) return;
    if (!EMAIL_RE.test(email)) return;
    if (emails.includes(email)) return;
    onChange([...emails, email]);
    setInput('');
  };

  const removeEmail = (index: number) => {
    onChange(emails.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab' || e.key === ',') {
      e.preventDefault();
      addEmail(input);
    }
    if (e.key === 'Backspace' && !input && emails.length > 0) {
      removeEmail(emails.length - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    const parts = text.split(/[,;\s]+/).filter(Boolean);
    const valid = parts.filter((p) => EMAIL_RE.test(p.trim().toLowerCase()));
    if (valid.length) {
      const unique = valid.map((v) => v.trim().toLowerCase()).filter((v) => !emails.includes(v));
      onChange([...emails, ...unique]);
    }
  };

  const handleBlur = () => {
    if (input.trim()) addEmail(input);
  };

  return (
    <div
      className="flex flex-wrap items-center gap-1 flex-1 min-w-0 bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-1 focus-within:border-accent/50 transition-colors cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {emails.map((email, i) => (
        <span
          key={`${email}-${i}`}
          className="inline-flex items-center gap-1 bg-accent/20 text-accent-hover border border-accent/30 rounded-md px-2 py-0.5 text-xs max-w-[200px]"
        >
          <span className="truncate">{email}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeEmail(i);
            }}
            className="shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center hover:bg-accent/40 transition-colors text-accent-hover/70 hover:text-white"
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={handleBlur}
        placeholder={emails.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] bg-transparent text-sm text-white placeholder-surface-500 focus:outline-none py-0.5"
      />
    </div>
  );
}
