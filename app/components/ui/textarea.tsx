import * as React from "react";

import { cn } from "@/app/lib/utils/tailwind-merge";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex bg-transparent dark:bg-input/30 disabled:opacity-50 shadow-xs border border-input aria-invalid:border-destructive focus-visible:border-ring rounded-md outline-none aria-invalid:ring-destructive/20 focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:aria-invalid:ring-destructive/40 w-full min-h-16 placeholder:text-muted-foreground transition-[color,box-shadow] field-sizing-content disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
