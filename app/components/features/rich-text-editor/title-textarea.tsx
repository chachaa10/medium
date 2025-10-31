"use client";
import { Textarea } from "@/app/components/ui/textarea";

interface TitleTextAreaProps {
  title: string;
  onChange: (title: string) => void;
}

export default function TitleTextArea({ title, onChange }: TitleTextAreaProps) {
  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value);
  }

  return (
    <Textarea
      placeholder="What's on your mind?"
      value={title}
      onChange={handleTextChange}
      className="dark:bg-transparent bg-none p-4 border-gray-300 focus-visible:border-gray-300 focus-visible:ring-0 font-bold text-xl"
    />
  );
}
