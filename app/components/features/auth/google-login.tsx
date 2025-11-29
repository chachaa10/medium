"use client";

import BetterAuthActionButton from "@/app/components/features/auth/better-auth-action-button";
import Google from "@/app/components/features/auth/google-icon";
import { authClient } from "@/app/lib/auth-client";

interface GoogleLoginProps {
  haveAccount: boolean;
}

export default function GoogleLogin({ haveAccount }: GoogleLoginProps) {
  return (
    <div className="space-y-4">
      {/* TODO: handle loading and error state */}
      <BetterAuthActionButton
        action={() => {
          return authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
          });
        }}
        className="rounded-2xl w-full"
        variant="outline"
      >
        <Google className="size-5" />
        {haveAccount ? "Sign in with Google" : "Sign up with Google"}
      </BetterAuthActionButton>
    </div>
  );
}
