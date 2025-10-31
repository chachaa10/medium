"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RichTextEditor from "@/app/components/features/rich-text-editor";
import SubmitPostButton from "@/app/components/features/rich-text-editor/submit-post-button";
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
  const router = useRouter();

  useEffect(() => {
    const session = authClient.getSession();
    if (!session) router.push("/login");
  }, [router]);

  function handleOnChange(post: Post) {
    setPost(post);
  }

  return (
    <main className="space-y-4 mx-auto p-4 w-full max-w-[80ch]">
      <RichTextEditor post={post} onChange={handleOnChange} />

      <SubmitPostButton
        action={async () => {
          const newPost = await createPost(post);
          const authorName = await getAuthorName(newPost.authorId);
          router.push(`/@${authorName}/${newPost.slug}`);
        }}
        className="py-4 rounded-md w-full font-semibold uppercase cursor-pointer"
      />
    </main>
  );
}
