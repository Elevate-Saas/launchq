"use client";

import * as React from "react";
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
import { BackButton } from "@/components/back-button";
import { useCreateOrganization } from "@/lib/api/organization";
import { Loader } from "@/components/ui/loader";
import { Camera, Upload } from "lucide-react";
import { FILE_UPLOAD } from "@/constants/fileUpload";

export default function CreateOrganizationPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);

  const createOrganizationMutation = useCreateOrganization();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createOrganizationMutation.mutate(
      {
        businessEmail: email,
        businessName: name,
        businessLogo: logo?.name || undefined,
      },
      {
        onSuccess: () => {
          router.push("/dashboard/organizations");
        },
      },
    );
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;

    if (file) {
      // Check file size
      if (file.size > FILE_UPLOAD.MAX_SIZE) {
        alert("File size must be less than 1MB");
        // Reset the input
        e.target.value = "";
        return;
      }

      // Check file type
      if (!FILE_UPLOAD.ALLOWED_TYPES.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, or SVG)");
        e.target.value = "";
        return;
      }
    }

    setLogo(file);
  }

  function removeLogo() {
    setLogo(null);
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
        <section className="grid gap-6 rounded-xl border p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                {logo ? (
                  <div className="relative group">
                    <img
                      src={URL.createObjectURL(logo)}
                      alt="Logo preview"
                      className="h-24 w-24 rounded-full object-cover border-2 border-border"
                    />
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center justify-center text-xs text-white"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => document.getElementById("orgLogo")?.click()}
                    className="h-24 w-24 rounded-full border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50 hover:bg-muted/70 hover:border-muted-foreground/40 transition-colors cursor-pointer"
                  >
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </button>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium">Business Logo</h3>
                <p className="text-xs text-muted-foreground">
                  PNG or SVG preferred, under 1MB
                </p>
              </div>
            </div>
            <div className="w-full sm:flex-1">
              <FormItem>
                <FormLabel htmlFor="orgLogo" className="sr-only">
                  Business Logo
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Input
                      id="orgLogo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("orgLogo")?.click()
                      }
                      className="flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      <Upload className="h-4 w-4" />
                      {logo ? "Change Logo" : "Upload Logo"}
                    </Button>
                    {logo && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={removeLogo}
                        className="text-muted-foreground hover:text-foreground w-full sm:w-auto"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-xl border p-6">
          <h2 className="text-base font-medium">Organization Details</h2>
          <div className="grid gap-4">
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
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={createOrganizationMutation.isPending}>
            {createOrganizationMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Loader size="sm" />
                Creating...
              </div>
            ) : (
              "Create Organization"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
