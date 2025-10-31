import Link from "next/link";
import HandClapIcon from "@/app/components/features/post/hand-clap-icon";
import { getAuthorName } from "@/app/data/authors";
import { getCountClaps } from "@/app/data/claps";
import { getPosts } from "@/app/data/posts";

export default async function PostList() {
  const posts = await getPosts();

  const postsWithAuthor = await Promise.all(
    posts.map(async (post) => {
      const author = await getAuthorName(post.authorId);
      const formattedAuthorName = author.replace(" ", "").toLowerCase();
      return { ...post, author: formattedAuthorName };
    }),
  );
  return (
    <>
      {postsWithAuthor.map((post) => (
        <div className="my-4" key={post.id}>
          <Link href={`/@${post.author}/${post.id}`}>
            <h2 className="font-semibold text-xl">{post.title}</h2>
            <p className="italic">Author: {getAuthorName(post.authorId)}</p>
            <p className="mt-2 text-neutral-800 dark:text-neutral-300">
              {post.content}
            </p>

            <div className="flex items-center gap-1 mt-2">
              <HandClapIcon className="inline size-6" />
              {getCountClaps(post.id)}
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
