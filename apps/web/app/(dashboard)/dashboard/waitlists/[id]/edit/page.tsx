"use client";

import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BackButton } from "@/components/back-button";

export default function EditWaitlistPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <BackButton className="w-fit justify-start" />
        <h1 className="text-2xl font-semibold tracking-tight">Edit Waitlist</h1>
        <p className="text-sm text-muted-foreground">
          Update name and description for{" "}
          <span className="font-mono text-xs">{id}</span>.
        </p>
      </div>

      <Form onSubmit={onSubmit} className="grid gap-6">
        <section className="grid gap-4 rounded-xl border p-4">
          <FormItem>
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormControl>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New name"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="description">Description</FormLabel>
            <FormControl>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Updated description"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </section>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </Form>
    </div>
  );
}
