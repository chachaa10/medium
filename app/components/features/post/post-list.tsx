import { getAuthorName } from "@/app/data/author";
import { getPosts } from "@/app/data/post";

export default async function PostList() {
  const posts = await getPosts();
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h2 className="font-semibold text-xl">{post.title}</h2>
          <p className="italic">Author: {getAuthorName(post.authorId)}</p>
          <p className="text-neutral-800 dark:text-neutral-300">
            {post.content}
          </p>
        </div>
      ))}
    </>
  );
}
