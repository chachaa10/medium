"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { LoadingSwap } from "@/app/components/ui/loading-swap";

export default function SubmitPostButton({
  className,
}: {
  className?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit() {
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Submitting post...");
      setIsSubmitting(false);
    }, 2000);
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
