import { redirect } from "next/navigation";
import { Suspense } from "react";
import PostList from "@/app/components/features/post/post-list";
import PostSkeleton from "@/app/components/features/post/skeleton";
import { getCurrentUser } from "@/app/data/users";

export default async function HomePage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto p-2 pt-20 max-w-[80ch] container">
      <h1 className="font-bold text-4xl">Home Page</h1>

      <Suspense fallback={<PostSkeleton />}>
        <PostList />
      </Suspense>
    </main>
  );
}
