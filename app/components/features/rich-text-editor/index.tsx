"use client";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "@/app/components/features/rich-text-editor/menu-bar";
import TitleTextArea from "@/app/components/features/rich-text-editor/title-textarea";
import type { Post } from "@/app/new-post/page";

interface RichTextEditorProps {
  post: Post;
  onChange: (post: Post) => void;
}
export default function RichTextEditor({
  post,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Typography],
    immediatelyRender: false,
    content: post.content,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base min-h-[400px] space-y-4 border border-gray-300 p-4 rounded-md min-w-full focus:outline-none prose-h2:text-xl prose-h3:text-lg prose-h4:text-md prose-p:text-base prose-p:text-neutral-900 dark:prose-p:text-neutral-200",
      },
    },
    onBlur: ({ editor }) => {
      onChange({
        ...post,
        content: editor.getHTML(),
      });
    },
  });

  function handleTitleChange(title: string) {
    onChange({
      ...post,
      title,
    });
  }

  return (
    <div className="space-y-4">
      {editor && (
        <>
          <MenuBar editor={editor} />
          <TitleTextArea title={post.title} onChange={handleTitleChange} />
          <EditorContent editor={editor} />
        </>
      )}
    </div>
  );
}
