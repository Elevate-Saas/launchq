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

export default function CreateOrganizationPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <BackButton className="w-fit justify-start" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Create Organization
        </h1>
        <p className="text-sm text-muted-foreground">
          Set up a new tenant for your team.
        </p>
      </div>

      <Form onSubmit={onSubmit} className="grid gap-6">
        <section className="grid gap-4 rounded-xl border p-4">
          <h2 className="text-base font-medium">Organization Details</h2>
          <FormItem>
            <FormLabel htmlFor="orgEmail">Business Email</FormLabel>
            <FormControl>
              <Input
                id="orgEmail"
                type="email"
                placeholder="ops@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="orgName">Business Name</FormLabel>
            <FormControl>
              <Input
                id="orgName"
                placeholder="Your company name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="orgLogo">Business Logo</FormLabel>
            <FormControl>
              <Input
                id="orgLogo"
                type="file"
                accept="image/*"
                onChange={(e) => setLogo(e.target.files?.[0] ?? null)}
              />
            </FormControl>
            <FormDescription>
              PNG or SVG preferred, under 1MB. Selected: {logo?.name ?? "None"}
            </FormDescription>
            <FormMessage />
          </FormItem>
        </section>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </Form>
    </div>
  );
}
