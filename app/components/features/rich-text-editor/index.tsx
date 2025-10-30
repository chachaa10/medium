"use client";
import MenuBar from "@/app/components/features/rich-text-editor/menu-bar";
import Typography from "@tiptap/extension-typography";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TitleTextArea from "@/app/components/features/rich-text-editor/title-textarea";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}
export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Typography],
    immediatelyRender: false,
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base min-h-[400px] space-y-4 border border-gray-300 p-4 rounded-md min-w-full focus:outline-none prose-h2:text-xl prose-h3:text-lg prose-h4:text-md prose-p:text-base prose-p:text-neutral-900 dark:prose-p:text-neutral-200",
      },
    },
    onBlur: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="space-y-4">
      {editor && (
        <>
          <MenuBar editor={editor} />
          <TitleTextArea />
          <EditorContent editor={editor} />
        </>
      )}
    </div>
  );
}
