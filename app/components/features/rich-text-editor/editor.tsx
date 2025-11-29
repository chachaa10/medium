"use client";

import Link from "next/link";
import { useState } from "react";

import RichTextEditor from "@/app/components/features/rich-text-editor";
import SubmitPostButton from "@/app/components/features/rich-text-editor/submit-post-button";
import { Button } from "@/app/components/ui/button";
import { createPost } from "@/app/data/posts";

export interface Post {
  title: string;
  content: string;
  status: "draft" | "published" | "archived";
}

export function Editor() {
  const [post, setPost] = useState<Post>({
    title: "",
    content: "",
    status: "draft",
  });

  function handleOnChange(post: Post) {
    setPost(post);
  }

  return (
    <main className="space-y-4 mx-auto p-4 pt-20 w-full max-w-[80ch]">
      <RichTextEditor onChange={handleOnChange} post={post} />

      <div className="gap-4 grid grid-cols-2">
        <Button
          asChild
          className="bg-rose-600 hover:bg-rose-700/80 text-white cursor-pointer"
        >
          <Link href="/">Cancel</Link>
        </Button>
        <SubmitPostButton
          action={() => {
            return createPost(post);
          }}
          className="bg-blue-600 hover:bg-blue-700/80 py-4 rounded-md font-semibold text-white cursor-pointer"
        />
      </div>
    </main>
  );
}
