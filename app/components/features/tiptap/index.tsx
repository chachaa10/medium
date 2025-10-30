"use client";
import { memo } from "react";
import MenuBar from "@/app/components/features/tiptap/menu-bar";
import Typography from "@tiptap/extension-typography";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TitleTextArea from "@/app/components/features/tiptap/title-textarea";

export const Tiptap = memo(() => {
  const editor = useEditor({
    extensions: [StarterKit, Typography],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base min-h-[400px] space-y-4 border border-gray-300 p-2 rounded-md min-w-full focus:outline-none prose-h2:text-xl prose-h3:text-lg prose-h4:text-md prose-p:text-base prose-p:text-neutral-900 dark:prose-p:text-neutral-200",
      },
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
});

Tiptap.displayName = "Tiptap";
