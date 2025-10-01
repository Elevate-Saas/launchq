"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { pageRoutes } from "@/constants/pageRoutes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (!pathname) return false;
    return pathname === href;
  }

  return (
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="hidden border-r bg-sidebar p-4 md:block">
        <div className="flex h-full flex-col gap-6">
          <div className="px-2">
            <Logo asLink className="text-base" />
          </div>
          <nav className="grid gap-1 text-sm">
            {pageRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "rounded-md px-3 py-2 hover:bg-muted",
                  isActive(route.href) && "bg-muted text-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto grid gap-1 text-xs text-muted-foreground">
            <span>Growth & Bloom theme</span>
          </div>
        </div>
      </aside>
      <main className="p-6">
        <div className="mx-auto w-full max-w-6xl xl:max-w-[1400px]">
          {children}
        </div>
      </main>
    </div>
  );
}
