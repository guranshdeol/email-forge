'use client';

interface EditorTabsProps {
  activeTab: 'code' | 'visual';
  onTabChange: (tab: 'code' | 'visual') => void;
}

export default function EditorTabs({ activeTab, onTabChange }: EditorTabsProps) {
  return (
    <div className="flex items-center border-b border-surface-700 bg-surface-900">
      <Tab active={activeTab === 'code'} onClick={() => onTabChange('code')} label="Code" />
      <Tab active={activeTab === 'visual'} onClick={() => onTabChange('visual')} label="Visual" />
    </div>
  );
}

function Tab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors relative ${
        active
          ? 'text-white'
          : 'text-surface-400 hover:text-surface-200'
      }`}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
      )}
    </button>
  );
}
