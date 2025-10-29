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
    <main>
      <h1>{posts.title}</h1>
      <p>Author: {authorName}</p>
      <p>{posts.content}</p>
    </main>
  );
}
