import { getPosts } from "@/app/actions/post.actions";
import Header from "@/app/components/layout/header";
import { ThemeToggle } from "@/app/components/theme-button";

export default async function HomePage() {
  const posts = await getPosts();
  return (
    <>
      <Header>
        {/* <ThemeToggle /> */}
        {/*  */}
      </Header>
      <main>
        <h1>Home Page</h1>

        {posts.map((post) => {
          return (
            <div key={post.postId}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          );
        })}
      </main>
    </>
  );
}
