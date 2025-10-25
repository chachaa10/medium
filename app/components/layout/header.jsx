"use client";
import { authClient } from "@/app/lib/auth-client";
import SignOutButton from "../sign-out-button";
import { ThemeToggle } from "../theme-button";

export default function Header() {
  const { data: session } = authClient.useSession();
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="font-bold text-3xl">Medium</h1>
      </div>
      <div className="flex gap-2">
        {session && <SignOutButton />}
        <ThemeToggle />
      </div>
    </header>
  );
}
