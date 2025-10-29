"use client";

import { ActionButton } from "@/app/components/ui/action-button";
import type { ComponentProps } from "react";

export default function BetterAuthActionButton({
  action,
  successMessage,
  onSuccess,
  ...props
}: Omit<ComponentProps<typeof ActionButton>, "action"> & {
  action: () => Promise<{ error: null | { message?: string } }>;
  successMessage?: string;
  onSuccess?: () => void;
}) {
  return (
    <ActionButton
      {...props}
      action={async () => {
        const result = await action();
        if (result.error) {
          return {
            error: true,
            message: result.error.message || "Action failed",
          };
        } else {
          if (onSuccess) {
            onSuccess();
          }
          return { error: false, message: successMessage };
        }
      }}
    ></ActionButton>
  );
}
