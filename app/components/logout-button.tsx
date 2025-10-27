"use client";

import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import BetterAuthActionButton from "./features/auth/better-auth-action-button";

export default function Logout() {
  const router = useRouter();
  return (
    <BetterAuthActionButton
      action={async () => {
        return authClient.signOut();
      }}
      variant={"destructive"}
      onSuccess={() => {
        router.refresh();
      }}
    >
      Logout
    </BetterAuthActionButton>
  );
}
