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
import {
  PasswordInput,
  PasswordInputStrengthChecker,
} from "@/app/components/ui/password-input";
import { authClient } from "@/app/lib/auth-client";
import {
  UserSignInSchema,
  UserSignUpSchema,
  type UserSignIn,
  type UserSignUp,
} from "@/app/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AuthFormProps {
  haveAccount: boolean;
}

export default function AuthForm(props: AuthFormProps) {
  const router = useRouter();
  const { haveAccount } = props;

  const form = useForm<UserSignUp | UserSignIn>({
    resolver: zodResolver(haveAccount ? UserSignInSchema : UserSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  function onSubmit(data: UserSignUp | UserSignIn) {
    if (haveAccount) {
      handleSignIn(data as UserSignIn);
    } else {
      handleSignUp(data as UserSignUp);
    }
  }

  async function handleSignUp(data: UserSignUp) {
    await authClient.signUp.email(
      {
        ...data,
        callbackURL: "/",
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Something went wrong");
        },
        onSuccess: () => {
          router.push("/");
        },
      },
    );
  }

  async function handleSignIn(data: UserSignIn) {
    await authClient.signIn.email(
      {
        ...data,
        callbackURL: "/",
        rememberMe: true,
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Invalid Credentials");
        },
        onSuccess: () => {
          router.push("/");
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
                <PasswordInput {...field}>
                  {!haveAccount && <PasswordInputStrengthChecker />}
                </PasswordInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <LoadingSwap isLoading={isSubmitting}>
            {haveAccount ? "Sign In" : "Sign Up"}
          </LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
