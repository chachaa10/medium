export default function ProfilePage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Profile: {params.slug}</h1>
    </div>
  );
}
