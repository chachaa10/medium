"use server";
import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "@/app/lib/auth";

export const getCurrentUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  return session;
});
