"use client";

import Google from "@/app/components/google-icon";
import { Button } from "@/app/components/ui/button";
import { authClient } from "@/app/lib/auth-client";
import BetterAuthActionButton from "./better-auth-action-button";

interface GoogleLoginProps {
  haveAccount: boolean;
}

export default function GoogleLogin({ haveAccount }: GoogleLoginProps) {
  return (
    <div className="space-y-4">
      {/* TODO: handle loading and error state */}
      <BetterAuthActionButton
        variant="outline"
        className="rounded-2xl w-full"
        action={() => {
          return authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
          });
        }}
      >
        <Google className="size-5" />
        {haveAccount ? "Sign in with Google" : "Sign up with Google"}
      </BetterAuthActionButton>
    </div>
  );
}
