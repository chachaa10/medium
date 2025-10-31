"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { LoadingSwap } from "@/app/components/ui/loading-swap";

export default function SubmitPostButton({
  className,
  action,
}: {
  className?: string;
  action: () => Promise<void>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setIsSubmitting(true);
    await action();
    setIsSubmitting(false);
  }

  return (
    <Button
      onClick={handleSubmit}
      className={className}
      disabled={isSubmitting}
    >
      <LoadingSwap isLoading={isSubmitting}>Submit</LoadingSwap>
    </Button>
  );
}
