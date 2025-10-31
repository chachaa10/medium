import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className}>
      <h1 className="font-bold text-3xl">Medium</h1>
    </Link>
  );
}
