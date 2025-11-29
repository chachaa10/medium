"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { LoadingSwap } from "@/app/components/ui/loading-swap";

export default function SubmitPostButton({
  className,
  action,
}: {
  className?: string;
  action: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit() {
    setIsSubmitting(true);
    action();
    setIsSubmitting(false);
  }

  return (
    <Button
      className={className}
      disabled={isSubmitting}
      onClick={handleSubmit}
    >
      <LoadingSwap isLoading={isSubmitting}>Submit</LoadingSwap>
    </Button>
  );
}
