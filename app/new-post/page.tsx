"use client";
import RichTextEditor from "@/app/components/features/rich-text-editor";
import SubmitPostButton from "@/app/components/features/rich-text-editor/submit-post-button";
import { redirect } from "next/navigation";
import { authClient } from "../lib/auth-client";
import { useState } from "react";

export default function NewPostPage() {
  const [post, setPost] = useState("");
  const session = authClient.getSession();

  if (!session) {
    redirect("/login");
  }

  function handleOnChange(content: string) {
    setPost(content);
    console.log(content);
  }

  return (
    <main className="space-y-4 mx-auto p-4 w-full max-w-[80ch]">
      <RichTextEditor content={post} onChange={handleOnChange} />

      <SubmitPostButton className="py-4 rounded-md w-full font-semibold uppercase cursor-pointer" />
    </main>
  );
}
