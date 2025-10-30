import { getCurrentUser } from "@/app/data/users";
import { redirect } from "next/navigation";

export default async function NewPostPage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <h1>New Post</h1>
    </main>
  );
}
