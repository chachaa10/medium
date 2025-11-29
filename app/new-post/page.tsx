import { redirect } from "next/navigation";

import { Editor } from "@/app/components/features/rich-text-editor/editor";
import { getCurrentUser } from "@/app/data/users";

export default async function NewPostPage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  return <Editor />;
}
