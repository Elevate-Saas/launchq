"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
};

function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  id,
  name,
  className,
}: SwitchProps) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = typeof checked === "boolean";
  const isOn = isControlled ? checked : internal;

  function toggle() {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-disabled={disabled}
      id={id}
      name={name}
      onClick={toggle}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border transition-colors",
        isOn ? "bg-primary border-primary" : "bg-muted border-input",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block size-4 translate-x-0.5 rounded-full bg-background shadow-sm ring-1 ring-inset ring-black/10 transition-transform",
          isOn && "translate-x-[18px]",
        )}
      />
    </button>
  );
}

export { Switch };
