import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import PostList from "@/app/components/features/post/post-list";
import PostSkeleton from "@/app/components/features/post/skeleton";
import { Button } from "@/app/components/ui/button";
import { getCurrentUser } from "@/app/data/users";

export default async function HomePage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto p-2 w-full max-w-[80ch] container">
      <h1 className="font-bold text-4xl">Home Page</h1>
      <Button
        asChild
        className="bg-green-700 hover:bg-green-800 text-neutral-50"
      >
        <Link href="/new-post">New Post</Link>
      </Button>

      <Suspense fallback={<PostSkeleton />}>
        <PostList />
      </Suspense>
    </main>
  );
}
