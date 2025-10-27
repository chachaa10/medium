import { getCurrentUser } from "@/app/data/user";
import { redirect } from "next/navigation";
import PostList from "./components/features/post/post-list";

export default async function HomePage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Home Page</h1>
      {session && <h1>{session?.user.name}</h1>}

      <PostList />
    </main>
  );
}
