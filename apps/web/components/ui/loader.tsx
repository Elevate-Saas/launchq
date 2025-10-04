import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loader({ size = "md", className }: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-muted border-t-primary",
        sizeClasses[size],
        className,
      )}
    />
  );
}

export function LoaderDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex space-x-1", className)}>
      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
    </div>
  );
}

export function LoaderPulse({ className }: { className?: string }) {
  return (
    <div className={cn("flex space-x-1", className)}>
      <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
      <div className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:0.2s]" />
      <div className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:0.4s]" />
    </div>
  );
}
