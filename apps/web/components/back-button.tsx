"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className={className}
    >
      <ChevronLeft className="size-4" />
      Back
    </Button>
  );
}
