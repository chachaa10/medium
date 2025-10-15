"use client";
import AuthForm from "@/app/components/features/auth/AuthForm";
import Google from "@/app/components/Google";
import { Button } from "@/app/components/ui/button";
import { authClient } from "@/app/lib/auth-client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const { data: session, isPending: loading } = authClient.useSession();
  const [haveAccount, setHaveAccount] = useState(true);

  // quite buggy
  useEffect(() => {
    if (session && !loading) {
      return redirect("/");
    }
  }, [session, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-background px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="space-y-8 mx-auto w-full max-w-md">
        <div className="text-center">
          <h1 className="font-bold text-foreground text-4xl sm:text-5xl tracking-tight">
            {haveAccount ? "Welcome back." : "Join Medium."}
          </h1>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="rounded-2xl w-full">
            <Google className="size-5" />
            {haveAccount ? "Sign in with Google" : "Sign up with Google"}
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="border-t w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Email and Password */}
        <AuthForm
          haveAccount={haveAccount}
          key={haveAccount ? "signin" : "signup"}
        />

        <p className="text-muted-foreground text-sm text-center">
          {haveAccount ? "No account?" : "Already have an account?"}
          <Button variant={"link"} onClick={() => setHaveAccount(!haveAccount)}>
            {haveAccount ? "Create one" : "Sign in"}
          </Button>
        </p>
      </div>
    </div>
  );
}
