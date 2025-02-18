import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import {
    BoldIcon,
    ItalicIcon,
    ListBulletIcon,
    ChatBubbleBottomCenterTextIcon as QuoteIcon,
    LinkIcon,
    QueueListIcon as ListNumberedIcon,
} from '@heroicons/react/24/outline';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="border-b border-gray-200 p-2 flex gap-1">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive('bold') ? 'bg-gray-100' : ''
                }`}
            >
                <BoldIcon className="h-5 w-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive('italic') ? 'bg-gray-100' : ''
                }`}
            >
                <ItalicIcon className="h-5 w-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive('bulletList') ? 'bg-gray-100' : ''
                }`}
            >
                <ListBulletIcon className="h-5 w-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive('orderedList') ? 'bg-gray-100' : ''
                }`}
            >
                <ListNumberedIcon className="h-5 w-5" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive('blockquote') ? 'bg-gray-100' : ''
                }`}
            >
                <QuoteIcon className="h-5 w-5" />
            </button>
            <button
                onClick={() => {
                    const url = window.prompt('Enter URL');
                    if (url) {
                        editor.chain().focus().setLink({ href: url }).run();
                    }
                }}
                className={`p-2 rounded hover:bg-gray-100 ${
                    editor.isActive('link') ? 'bg-gray-100' : ''
                }`}
            >
                <LinkIcon className="h-5 w-5" />
            </button>
        </div>
    );
};

export default function RichTextEditor({
    content,
    onChange,
    placeholder = 'Start writing...',
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder,
            }),
            Link.configure({
                openOnClick: false,
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="border rounded-lg overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent
                editor={editor}
                className="prose max-w-none p-4 min-h-[200px] focus:outline-none"
            />
        </div>
    );
} 