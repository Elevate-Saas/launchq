"use client";

import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Chrome } from "lucide-react";
import { Logo } from "@/components/logo";
import { useSignUp } from "@/lib/api/auth";
import { Loader } from "@/components/ui/loader";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signUpMutation = useSignUp();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signUpMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
      },
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-2">
      <div className="relative hidden border-r bg-gradient-to-b from-primary/10 to-transparent p-8 md:block">
        <div className="mx-auto flex h-full max-w-md flex-col justify-between">
          <header className="flex items-center gap-3">
            <Logo asLink className="text-base" />
          </header>
          <main className="grid gap-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              Launch with momentum
            </h2>
            <p className="text-sm text-muted-foreground">
              Build your audience with waitlists, referrals, and leaderboards
              that delight.
            </p>
            <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />{" "}
                Double-sided rewards
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" /> Embeddable
                signup widgets
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />{" "}
                Export-ready analytics
              </li>
            </ul>
          </main>
          <footer className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LaunchQ
          </footer>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-6 grid gap-1 text-center md:text-left">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Join LaunchQ in minutes.
            </p>
          </div>

          <div className="grid gap-4">
            <Button variant="outline" type="button" className="w-full">
              {/* UI only; wire this to Clerk Google later */}
              <Chrome className="size-4" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          <Form onSubmit={onSubmit} className="mt-4">
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <FormDescription>Must be at least 8 characters.</FormDescription>
              <FormMessage />
            </FormItem>

            <Button
              type="submit"
              className="w-full"
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Loader size="sm" />
                  Creating...
                </div>
              ) : (
                "Create account"
              )}
            </Button>
          </Form>

          <p className="mt-6 px-8 text-center text-sm text-muted-foreground md:px-0 md:text-left">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
