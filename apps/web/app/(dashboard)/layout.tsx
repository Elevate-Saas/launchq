"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/logo";
import { UserProfile } from "@/components/user-profile";
import { UserProfileSkeleton } from "@/components/user-profile-skeleton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { pageRoutes } from "@/constants/pageRoutes";
import { useUserInitializer } from "@/lib/hooks/use-user";
import { useUserStore } from "@/lib/stores/user-store";
import { useSingleQueryLoading } from "@/hooks/use-loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const authUserQuery = useUserInitializer();
  const { user, isLoading: userLoading } = useUserStore();
  const { isLoading: authUserLoading } = useSingleQueryLoading(authUserQuery);

  function isActive(href: string) {
    if (!pathname) return false;
    return pathname === href;
  }

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Desktop Sidebar */}
      <aside className="hidden border-r bg-sidebar p-4 md:block fixed left-0 top-0 h-screen w-[240px] overflow-y-auto z-10">
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
          <div className="mt-auto">
            {userLoading || authUserLoading ? (
              <UserProfileSkeleton />
            ) : (
              <UserProfile user={user} />
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden border-b bg-background p-4 flex items-center justify-between">
        <Logo asLink className="text-base" />
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] sm:w-[300px] flex flex-col"
          >
            <SheetHeader>
              <SheetTitle className="text-left">Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-6 flex-1">
              <nav className="grid gap-1 text-sm">
                {pageRoutes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "rounded-md px-3 py-2 hover:bg-muted",
                      isActive(route.href) && "bg-muted text-foreground",
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                {userLoading || authUserLoading ? (
                  <UserProfileSkeleton />
                ) : (
                  <UserProfile user={user} />
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <main className="p-6 md:ml-[240px] min-h-screen">
        <div className="mx-auto w-full max-w-6xl xl:max-w-[1400px]">
          {children}
        </div>
      </main>
    </div>
  );
}
