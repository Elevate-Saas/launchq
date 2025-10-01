import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = React.ComponentProps<"a"> & {
  asLink?: boolean;
};

export function Logo({ className, asLink = true, ...props }: LogoProps) {
  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      <span className="inline-flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        LQ
      </span>
      <span className="text-base">LaunchQ</span>
    </span>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label="LaunchQ Home" className={cn(className)}>
        {content}
      </Link>
    );
  }

  return content;
}
