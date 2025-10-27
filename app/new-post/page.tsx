import { redirect } from "next/navigation";
import { getCurrentUser } from "../data/user";

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
