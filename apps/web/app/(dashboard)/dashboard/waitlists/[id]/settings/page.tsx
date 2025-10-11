"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  Trash2,
  Copy,
  ExternalLink,
  Users,
  Mail,
  Shield,
  Settings as SettingsIcon,
  Globe,
} from "lucide-react";

export default function WaitlistSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  // Form state
  const [name, setName] = useState("LaunchQ");
  const [description, setDescription] = useState(
    "Join the waitlist for LaunchQ early access",
  );
  const [emailVerification, setEmailVerification] = useState(true);
  const [referralsEnabled, setReferralsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [publicWaitlist, setPublicWaitlist] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);
  const [maxReferrals, setMaxReferrals] = useState(10);
  const [referralReward, setReferralReward] = useState("Priority boost");

  const [copied, setCopied] = useState(false);

  const handleCopyWaitlistId = async () => {
    await navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    // Save logic here
    console.log("Saving settings...");
  };

  const handleDelete = () => {
    // Delete logic here
    console.log("Deleting waitlist...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Waitlist Settings</h2>
          <p className="text-sm text-muted-foreground">
            Configure your waitlist preferences and behavior
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Waitlist Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter waitlist name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your waitlist"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Waitlist ID</Label>
                <div className="flex items-center gap-2">
                  <Input value={id} readOnly className="flex-1" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyWaitlistId}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signup Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Signup Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Require users to verify their email address
                  </p>
                </div>
                <Switch
                  checked={emailVerification}
                  onCheckedChange={setEmailVerification}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Waitlist</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow public access to signup page
                  </p>
                </div>
                <Switch
                  checked={publicWaitlist}
                  onCheckedChange={setPublicWaitlist}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-approve Signups</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically approve new signups
                  </p>
                </div>
                <Switch
                  checked={autoApprove}
                  onCheckedChange={setAutoApprove}
                />
              </div>
            </CardContent>
          </Card>

          {/* Referral Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Referral Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Referrals</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to refer others for rewards
                  </p>
                </div>
                <Switch
                  checked={referralsEnabled}
                  onCheckedChange={setReferralsEnabled}
                />
              </div>

              {referralsEnabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="maxReferrals">
                      Maximum Referrals per User
                    </Label>
                    <Input
                      id="maxReferrals"
                      type="number"
                      value={maxReferrals}
                      onChange={(e) => setMaxReferrals(Number(e.target.value))}
                      min="1"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referralReward">Referral Reward</Label>
                    <Input
                      id="referralReward"
                      value={referralReward}
                      onChange={(e) => setReferralReward(e.target.value)}
                      placeholder="e.g., Priority boost, Early access"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for new signups
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Waitlist Status */}
          <Card>
            <CardHeader>
              <CardTitle>Waitlist Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Signups</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Referrals</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Created</span>
                <span className="text-sm text-muted-foreground">Today</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <a
                  href={`https://getwaitlist.com/waitlist/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Public Page
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <a href={`/dashboard/waitlists/${id}/widget`}>
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Widget Builder
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <a href={`/dashboard/waitlists/${id}/analytics`}>
                  <Globe className="h-4 w-4 mr-2" />
                  View Analytics
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete a waitlist, there is no going back. Please be
                certain.
              </p>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Waitlist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
