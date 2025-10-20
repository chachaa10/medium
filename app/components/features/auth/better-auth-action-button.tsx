"use client";

import type { ComponentProps } from "react";
import { ActionButton } from "../../ui/action-button";

export default function BetterAuthActionButton({
  action,
  successMessage,
  ...props
}: Omit<ComponentProps<typeof ActionButton>, "action"> & {
  action: () => Promise<{ error: null | { message?: string } }>;
  successMessage?: string;
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
          return { error: false, message: successMessage };
        }
      }}
    ></ActionButton>
  );
}
