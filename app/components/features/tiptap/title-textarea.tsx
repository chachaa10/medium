"use client";
import { Textarea } from "@/app/components/ui/textarea";

export default function TitleTextArea() {
  return (
    <Textarea
      placeholder="What's on your mind?"
      className="dark:bg-transparent bg-none p-4 border-gray-300 focus-visible:border-gray-300 focus-visible:ring-0 font-bold text-xl order"
    />
  );
}
