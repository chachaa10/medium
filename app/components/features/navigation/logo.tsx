"use client";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/")}
      variant={"link"}
      className="hover:no-underline cursor-pointer"
    >
      <h1 className="font-bold text-3xl">Medium</h1>
    </Button>
  );
}
