"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/app/components/layout/header";
import { authClient } from "./lib/auth-client";
import Loading from "./loading";

export default function HomePage() {
  const { data: session, isPending: loading } = authClient.useSession();

  // TODO: remove this code and make a middleware
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
      <Header />
      <main>{session && <h1>Welcome {session.user.name}</h1>}</main>
    </>
  );
}
