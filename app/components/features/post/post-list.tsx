import { getAuthorName } from "@/app/data/author";
import { getPosts } from "@/app/data/post";

export default async function PostList() {
  const posts = await getPosts();
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Author: {getAuthorName(post.authorId)}</p>
        </div>
      ))}
    </>
  );
}
