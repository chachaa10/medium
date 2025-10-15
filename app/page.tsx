"use client";
import { authClient } from "@/app/lib/auth-client";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BetterAuthActionButton from "./components/features/auth/better-auth-action-button";

export default function HomePage() {
  const { data: session, isPending: loading } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data == null) {
        router.push("/auth/login");
      }
    });
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <BetterAuthActionButton
        action={() => {
          return authClient.signOut();
        }}
        onClick={() => router.push("/auth/login")}
        variant={"destructive"}
      >
        Sign out
      </BetterAuthActionButton>
      <main>{session && <h1>Welcome {session.user.name}</h1>}</main>
    </>
  );
}
