import { getAuthorName } from "@/app/data/authors";
import { getPostById } from "@/app/data/posts";

export default async function PostPage({
  params,
}: {
  params: Promise<{ posts: string }>;
}) {
  const { posts: postId } = await params;
  const posts = await getPostById(postId);
  const authorName = await getAuthorName(posts.authorId);

  return (
    <main className="mx-auto w-full max-w-[80ch] container">
      <h1 className="font-extrabold text-3xl">{posts.title}</h1>
      <p className="font-semibold text-lg italic">Author: {authorName}</p>
      <p className="text-shadow-neutral-100">{posts.content}</p>
    </main>
  );
}
