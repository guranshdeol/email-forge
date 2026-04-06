'use client';

import { emailTemplates, EmailTemplate } from './templates';

interface TemplateGalleryProps {
  onSelect: (html: string) => void;
  onClose: () => void;
}

export default function TemplateGallery({ onSelect, onClose }: TemplateGalleryProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-8">
      <div className="glass-modal rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div>
            <h2 className="text-lg font-semibold text-white">Choose a Template</h2>
            <p className="text-sm text-surface-400 mt-0.5">Start with an email-safe template and customize it</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-surface-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {emailTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onClick={() => {
                  onSelect(template.html);
                  onClose();
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ template, onClick }: { template: EmailTemplate; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left glass-surface rounded-xl p-4 hover:border-accent/40 transition-all group hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="w-full h-28 bg-white/[0.03] rounded-lg mb-3 flex items-center justify-center overflow-hidden border border-white/[0.04]">
        <div
          className="transform scale-[0.15] origin-top-left w-[600px] pointer-events-none"
          dangerouslySetInnerHTML={{ __html: template.html }}
        />
      </div>
      <h3 className="text-sm font-medium text-white group-hover:text-accent-hover transition-colors">
        {template.name}
      </h3>
      <p className="text-xs text-surface-400 mt-1 line-clamp-2">{template.description}</p>
    </button>
  );
}
