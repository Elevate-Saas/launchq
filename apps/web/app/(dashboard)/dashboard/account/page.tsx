"use client";

import * as React from "react";
import { useState } from "react";

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
import { BackButton } from "@/components/back-button";

export default function AccountPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function onUpdateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function onChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <BackButton className="w-fit justify-start" />
        <h1 className="text-2xl font-semibold tracking-tight">My Account</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal details and password.
        </p>
      </div>

      <section className="grid gap-4 rounded-xl border p-4">
        <h2 className="text-base font-medium">Profile</h2>
        <Form onSubmit={onUpdateProfile} className="grid gap-4 md:grid-cols-2">
          <FormItem>
            <FormLabel htmlFor="fullName">Full Name</FormLabel>
            <FormControl>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </FormControl>
            <FormDescription>
              Used for notifications and sign-in.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit">Save Profile</Button>
          </div>
        </Form>
      </section>

      <section className="grid gap-4 rounded-xl border p-4">
        <h2 className="text-base font-medium">Change Password</h2>
        <Form onSubmit={onChangePassword} className="grid gap-4 md:grid-cols-3">
          <FormItem>
            <FormLabel htmlFor="currentPassword">Current Password</FormLabel>
            <FormControl>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="newPassword">New Password</FormLabel>
            <FormControl>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="confirmPassword">
              Confirm New Password
            </FormLabel>
            <FormControl>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <FormDescription>Use at least 8 characters.</FormDescription>
            <FormMessage />
          </FormItem>
          <div className="md:col-span-3 flex justify-end">
            <Button type="submit">Update Password</Button>
          </div>
        </Form>
      </section>
    </div>
  );
}
