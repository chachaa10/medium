"use client";

import { useRouter } from "next/navigation";
import BetterAuthActionButton from "@/app/components/features/auth/better-auth-action-button";
import { authClient } from "@/app/lib/auth-client";

export default function Logout() {
  const router = useRouter();
  return (
    <BetterAuthActionButton
      action={async () => {
        return authClient.signOut();
      }}
      className="cursor-pointer"
      variant={"destructive"}
      onSuccess={() => {
        router.refresh();
      }}
    >
      Logout
    </BetterAuthActionButton>
  );
}
