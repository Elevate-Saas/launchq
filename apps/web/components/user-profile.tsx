"use client";

import { useRouter } from "next/navigation";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOut } from "@/lib/api/auth";
import { ICurrentUser } from "@launchq/core";

interface UserProfileProps {
  user: any;
}

export function UserProfile({ user }: UserProfileProps) {
  const router = useRouter();
  const signOutMutation = useSignOut();
  const activeUser = user.data;

  const handleSignOut = () => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/sign-in");
      },
    });
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-muted/50 transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {getInitials(activeUser?.name || null)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {activeUser?.name || activeUser?.email || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {activeUser?.email}
            </p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {activeUser?.name || activeUser?.email || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {activeUser?.email}
            </p>
            {activeUser?.role && (
              <p className="text-xs leading-none text-muted-foreground capitalize">
                {activeUser.role.toLowerCase().replace("_", " ")}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/account")}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/settings")}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-destructive focus:text-destructive"
          disabled={signOutMutation.isPending}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>
            {signOutMutation.isPending ? "Signing out..." : "Sign out"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
