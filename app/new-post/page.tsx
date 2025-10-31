"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import RichTextEditor from "@/app/components/features/rich-text-editor";
import SubmitPostButton from "@/app/components/features/rich-text-editor/submit-post-button";
import { Button } from "../components/ui/button";
import { getAuthorName } from "../data/authors";
import { createPost } from "../data/posts";
import { authClient } from "../lib/auth-client";

export interface Post {
  title: string;
  content: string;
  status: "draft" | "published" | "archived";
}

export default function NewPostPage() {
  const [post, setPost] = useState<Post>({
    title: "",
    content: "",
    status: "draft",
  });

  const { data: session, isPending: loading } = authClient.useSession();

  useEffect(() => {
    if (!session && !loading) {
      redirect("/login");
    }
  }, [session, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  function handleOnChange(post: Post) {
    setPost(post);
  }

  return (
    <main className="space-y-4 mx-auto p-4 w-full max-w-[80ch]">
      <RichTextEditor post={post} onChange={handleOnChange} />

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
