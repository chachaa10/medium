"use client";

import MenuBar from "@/app/components/features/tiptap/menu-bar";
import Typography from "@tiptap/extension-typography";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TitleInput from "@/app/components/features/tiptap/title-input";

export default function Tiptap() {
  const editor = useEditor({
    extensions: [StarterKit, Typography],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert min-h-[400px] space-y-4 border border-gray-300 p-2 rounded-md focus:outline-none",
      },
    },
  });

  return (
    <div className="space-y-4">
      {editor && (
        <>
          <MenuBar editor={editor} />
          <TitleInput />
          <EditorContent editor={editor} />
        </>
      )}
    </div>
  );
}
