import { getCurrentUser } from "@/app/data/users";
import { redirect } from "next/navigation";
import PostList from "./components/features/post/post-list";

export default async function HomePage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto p-2 max-w-[80ch] container">
      <h1 className="font-bold text-4xl">Home Page</h1>
      {session && (
        <h1 className="font-semibold text-lg">{session?.user.name}</h1>
      )}

      <PostList />
    </main>
  );
}
