"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Form = ({ className, ...props }: React.ComponentProps<"form">) => {
  return (
    <form data-slot="form" className={cn("grid gap-6", className)} {...props} />
  );
};

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-item"
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
}

function FormLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="form-label"
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
}

function FormControl({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-control"
      className={cn("grid gap-1", className)}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="form-description"
      className={cn("text-[13px] text-muted-foreground", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      role="alert"
      data-slot="form-message"
      className={cn("text-[13px] text-destructive", className)}
      {...props}
    />
  );
}

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage };
