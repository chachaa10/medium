export default async function AuthorPage({
  params,
}: {
  params: Promise<{ author: string }>;
}) {
  const { author } = await params;
  return (
    <main>
      <h1>Author: @{author}</h1>
    </main>
  );
}
