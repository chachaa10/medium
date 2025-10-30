import { Toggle } from "@/app/components/ui/toggle";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
interface MenuBarProps {
  editor: Editor;
}
export default function MenuBar({ editor }: MenuBarProps) {
  const iconSize = "size-6 ";

  const Options = [
    {
      icon: <Bold className={iconSize} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className={iconSize} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className={iconSize} />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <Underline className={iconSize} />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      pressed: editor.isActive("underline"),
    },
    {
      icon: <Code className={iconSize} />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      pressed: editor.isActive("code"),
    },
    {
      icon: <Quote className={iconSize} />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive("blockquote"),
    },
    {
      icon: <Heading1 className={iconSize} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },

    {
      icon: <Heading2 className={iconSize} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className={iconSize} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Heading4 className={iconSize} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      pressed: editor.isActive("heading", { level: 4 }),
    },
    {
      icon: <Heading5 className={iconSize} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      pressed: editor.isActive("heading", { level: 5 }),
    },
    {
      icon: <Heading6 className={iconSize} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      pressed: editor.isActive("heading", { level: 6 }),
    },
    {
      icon: <List className={iconSize} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className={iconSize} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Undo2 className={iconSize} />,
      onClick: () => editor.chain().focus().undo().run(),
      pressed: editor.can().chain().undo().run(),
    },
    {
      icon: <Redo2 className={iconSize} />,
      onClick: () => editor.chain().focus().redo().run(),
      pressed: editor.can().chain().redo().run(),
    },
  ];

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {Options.map((option, index) => (
        <Toggle
          className="cursor-pointer"
          key={index}
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}
