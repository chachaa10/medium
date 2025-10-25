"use client";

import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import BetterAuthActionButton from "./features/auth/better-auth-action-button";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <BetterAuthActionButton
      action={async () => {
        return authClient.signOut();
      }}
      variant={"destructive"}
      onSuccess={() => {
        router.push("/auth/login");
      }}
    >
      Sign out
    </BetterAuthActionButton>
  );
}
