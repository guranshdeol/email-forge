'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { useEffect, useCallback } from 'react';

interface VisualEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export default function VisualEditor({ value, onChange }: VisualEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Image,
      Link.configure({ openOnClick: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('Image URL:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    const url = window.prompt('Link URL:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const insertTable = useCallback(() => {
    if (editor) {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="h-full flex flex-col tiptap-editor">
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-surface-700 bg-surface-900 flex-wrap">
        <ToolBtn
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="B"
          title="Bold"
          bold
        />
        <ToolBtn
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="I"
          title="Italic"
          italic
        />
        <ToolBtn
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          label="S"
          title="Strikethrough"
          strike
        />
        <Divider />
        <ToolBtn
          active={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          label="H1"
          title="Heading 1"
        />
        <ToolBtn
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="H2"
          title="Heading 2"
        />
        <ToolBtn
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          label="H3"
          title="Heading 3"
        />
        <Divider />
        <ToolBtn
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="&bull;"
          title="Bullet list"
        />
        <ToolBtn
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          label="1."
          title="Numbered list"
        />
        <ToolBtn
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          label="&ldquo;"
          title="Quote"
        />
        <Divider />
        <ToolBtn
          active={editor.isActive({ textAlign: 'left' })}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          label="&#8676;"
          title="Align left"
        />
        <ToolBtn
          active={editor.isActive({ textAlign: 'center' })}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          label="&#8596;"
          title="Align center"
        />
        <ToolBtn
          active={editor.isActive({ textAlign: 'right' })}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          label="&#8677;"
          title="Align right"
        />
        <Divider />
        <ToolBtn onClick={addLink} label="🔗" title="Insert link" />
        <ToolBtn onClick={addImage} label="🖼" title="Insert image" />
        <ToolBtn onClick={insertTable} label="⊞" title="Insert table" />
      </div>

      <div className="flex-1 overflow-auto bg-surface-900">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}

function ToolBtn({
  active,
  onClick,
  label,
  title,
  bold,
  italic,
  strike,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
  title: string;
  bold?: boolean;
  italic?: boolean;
  strike?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 text-xs rounded transition-colors ${
        active ? 'bg-accent text-white' : 'text-surface-400 hover:text-white hover:bg-surface-700'
      } ${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''} ${strike ? 'line-through' : ''}`}
      dangerouslySetInnerHTML={{ __html: label }}
    />
  );
}

function Divider() {
  return <div className="w-px h-5 bg-surface-700 mx-1" />;
}
