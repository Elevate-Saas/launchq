"use client";

import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BackButton } from "@/components/back-button";

export default function CreateWaitlistPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emailVerification, setEmailVerification] = useState(true);
  const [referralsEnabled, setReferralsEnabled] = useState(true);
  const [spotBoosts, setSpotBoosts] = useState(1);
  const [referralToken, setReferralToken] = useState("Points");
  const [emailDashboardLink, setEmailDashboardLink] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <BackButton className="w-fit justify-start" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Create Waitlist
        </h1>
        <p className="text-sm text-muted-foreground">
          Configure your waitlist and referral settings. No backend wired yet.
        </p>
      </div>

      <Form onSubmit={onSubmit} className="grid gap-6">
        <section className="grid gap-4 rounded-xl border p-4">
          <h2 className="text-base font-medium">Details</h2>
          <FormItem>
            <FormLabel htmlFor="name">Waitlist Name</FormLabel>
            <FormControl>
              <Input
                id="name"
                placeholder="e.g., LaunchQ Early Access"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="description">Waitlist Description</FormLabel>
            <FormControl>
              <Textarea
                id="description"
                placeholder="Briefly describe your waitlist."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormDescription>
              Shown on your signup widget and landing page.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </section>

        <section className="grid gap-4 rounded-xl border p-4">
          <h2 className="text-base font-medium">Verification</h2>
          <FormItem>
            <div className="flex items-center justify-between gap-4">
              <div className="grid gap-1">
                <FormLabel>Email Verification</FormLabel>
                <FormDescription>
                  Require users to confirm their email after signup.
                </FormDescription>
              </div>
              <Switch
                checked={emailVerification}
                onCheckedChange={setEmailVerification}
              />
            </div>
            <FormMessage />
          </FormItem>
        </section>

        <section className="grid gap-4 rounded-xl border p-4">
          <h2 className="text-base font-medium">Referral System</h2>
          <FormItem>
            <div className="flex items-center justify-between gap-4">
              <div className="grid gap-1">
                <FormLabel>Enable Referrals</FormLabel>
                <FormDescription>
                  Let users invite friends and climb the leaderboard.
                </FormDescription>
              </div>
              <Switch
                checked={referralsEnabled}
                onCheckedChange={(v) => {
                  setReferralsEnabled(v);
                  if (!v) setEmailNotifications(false);
                }}
              />
            </div>
            <FormMessage />
          </FormItem>

          <div className="grid gap-4 md:grid-cols-2">
            <FormItem>
              <FormLabel htmlFor="spotBoosts">
                Spot Boosts (points per referral)
              </FormLabel>
              <FormControl>
                <Input
                  id="spotBoosts"
                  type="number"
                  min={0}
                  step={1}
                  value={spotBoosts}
                  onChange={(e) =>
                    setSpotBoosts(parseInt(e.target.value || "0", 10))
                  }
                />
              </FormControl>
              <FormDescription>
                How many leaderboard points a referral grants.
              </FormDescription>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="referralToken">
                Referral Token (incentive type)
              </FormLabel>
              <FormControl>
                <Select
                  id="referralToken"
                  value={referralToken}
                  onChange={(e) => setReferralToken(e.target.value)}
                >
                  <option value="Points">Points</option>
                  <option value="Credits">Credits</option>
                  <option value="Early Access">Early Access</option>
                  <option value="Discount">Discount</option>
                  <option value="Cash Reward">Cash Reward</option>
                  <option value="Gift">Gift</option>
                </Select>
              </FormControl>
              <FormDescription>
                What users earn for successful referrals.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </div>
        </section>

        <section className="grid gap-4 rounded-xl border p-4">
          <h2 className="text-base font-medium">Notifications</h2>
          <FormItem>
            <div className="flex items-center justify-between gap-4">
              <div className="grid gap-1">
                <FormLabel>Email Dashboard Link</FormLabel>
                <FormDescription>
                  Send a link so users can track their referrals and position.
                </FormDescription>
              </div>
              <Switch
                checked={emailDashboardLink}
                onCheckedChange={setEmailDashboardLink}
              />
            </div>
            <FormMessage />
          </FormItem>

          <FormItem>
            <div className="flex items-center justify-between gap-4">
              <div className="grid gap-1">
                <FormLabel>Email Notifications</FormLabel>
                <FormDescription>
                  Notify users about referral milestones. Disabled if referrals
                  are off.
                </FormDescription>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                disabled={!referralsEnabled}
              />
            </div>
            <FormMessage />
          </FormItem>
        </section>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Create Waitlist</Button>
        </div>
      </Form>
    </div>
  );
}
