import { getAuthorName } from "@/app/data/authors";
import { getPostBySlug } from "@/app/data/posts";

export default async function PostPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const authorName = await getAuthorName(post.authorId);

  return (
    <main className="mx-auto w-full max-w-[80ch] container">
      <h1 className="font-extrabold text-3xl">{post.title}</h1>
      <p className="font-semibold text-lg italic">Author: {authorName}</p>
      <p className="text-shadow-neutral-100">{post.content}</p>
    </main>
  );
}
