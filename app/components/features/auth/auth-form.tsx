"use client";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { LoadingSwap } from "@/app/components/ui/loading-swap";
import { PasswordInput } from "@/app/components/ui/password-input";
import { authClient } from "@/app/lib/auth-client";
import type { UserSignin, UserSignup } from "@/app/lib/types";
import { UserSigninSchema, UserSignupSchema } from "@/app/lib/types/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AuthFormProps {
  haveAccount: boolean;
}

export default function AuthForm(props: AuthFormProps) {
  const { haveAccount } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UserSignup | UserSignin>({
    resolver: zodResolver(haveAccount ? UserSigninSchema : UserSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: UserSignup | UserSignin) {
    setIsSubmitting(true);
    if (haveAccount) {
      handleSignIn(data as UserSignin);
    } else {
      handleSignUp(data as UserSignup);
    }
  }

  async function handleSignUp(data: UserSignup) {
    await authClient.signUp.email(
      {
        ...data,
        callbackURL: "/",
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Something went wrong");
          setIsSubmitting(false);
        },
        onSuccess: () => {
          window.location.replace("/");
        },
      },
    );
  }

  async function handleSignIn(data: UserSignin) {
    await authClient.signIn.email(
      {
        ...data,
        callbackURL: "/",
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Invalid Credentials");
          setIsSubmitting(false);
        },
        onSuccess: () => {
          window.location.replace("/");
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {!haveAccount && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {!haveAccount && <FormMessage />}
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field}></PasswordInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <LoadingSwap isLoading={isSubmitting}>
            {haveAccount ? "Login" : "Sign Up"}
          </LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
