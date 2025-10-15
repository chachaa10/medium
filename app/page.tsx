"use client";
import Header from "@/app/components/layout/header";
import { ThemeToggle } from "@/app/components/theme-button";
import { authClient } from "@/app/lib/auth-client";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Button } from "./components/ui/button";

export default function HomePage() {
  const { data: session, isPending: loading } = authClient.useSession();

  // quite buggy
  useEffect(() => {
    if (!session && !loading) {
      return redirect("/auth/login");
    }
  }, [session, loading]);

  if (loading || !session) {
    return <Loading />;
  }

  return (
    <>
      <Header>
        <ThemeToggle />
        <Button onClick={() => authClient.signOut()} variant={"destructive"}>
          Logout
        </Button>
      </Header>
      <main>
        {/* TODO: add loading state */}
        {session && <h1>Welcome {session.user.name}</h1>}
      </main>
    </>
  );
}
