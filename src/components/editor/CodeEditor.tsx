'use client';

import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language="html"
        theme="vs-dark"
        value={value}
        onChange={(val) => onChange(val || '')}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: 'on',
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          padding: { top: 12 },
          automaticLayout: true,
          tabSize: 2,
          renderWhitespace: 'none',
          bracketPairColorization: { enabled: true },
          suggest: { showWords: false },
        }}
      />
    </div>
  );
}
