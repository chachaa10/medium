import Tiptap from "@/app/components/features/tiptap";
import SubmitPostButton from "@/app/components/features/tiptap/submit-post-button";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../data/users";

export default async function NewPostPage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="space-y-4 mx-auto p-4 w-full max-w-[80ch]">
      <Tiptap />

      <SubmitPostButton className="py-4 rounded-md w-full font-semibold uppercase cursor-pointer" />
    </main>
  );
}
