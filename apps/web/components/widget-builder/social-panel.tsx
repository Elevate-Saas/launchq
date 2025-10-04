"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink } from "lucide-react";

interface SocialConfig {
  socialMessage: string;
  successMessagePlatforms: {
    twitter: boolean;
    whatsapp: boolean;
    telegram: boolean;
    facebook: boolean;
    linkedin: boolean;
    email: boolean;
    reddit: boolean;
  };
  ogTitle: string;
  ogDescription: string;
}

interface SocialPanelProps {
  config: SocialConfig;
  onConfigChange: (config: SocialConfig) => void;
}

export function SocialPanel({ config, onConfigChange }: SocialPanelProps) {
  const updateConfig = (updates: Partial<SocialConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const updatePlatform = (
    platform: keyof SocialConfig["successMessagePlatforms"],
    checked: boolean,
  ) => {
    updateConfig({
      successMessagePlatforms: {
        ...config.successMessagePlatforms,
        [platform]: checked,
      },
    });
  };

  const previewTweet = () => {
    const message =
      config.socialMessage ||
      "I'm {priority} on LaunchQ https://getwaitlist.com/waitlist/30227?ref_id=123456";
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Social Media Sharing Message */}
      <div className="space-y-3">
        <div>
          <Label className="text-sm font-medium">
            Social Media Sharing Message
          </Label>
          <p className="text-xs text-muted-foreground mt-1">
            Configure a default message for users to share their referral links
            on social media. You can use {"{priority}"} and {"{referral_link}"}{" "}
            as variables. Leave blank for default.
          </p>
        </div>
        <Textarea
          value={config.socialMessage}
          onChange={(e) => updateConfig({ socialMessage: e.target.value })}
          placeholder="I'm {priority} on LaunchQ https://getwaitlist.com/waitlist/30227?ref_id=123456"
          className="min-h-[80px]"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={previewTweet}
          className="text-xs p-0 h-auto"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Preview as Tweet
        </Button>
      </div>

      {/* Success Message Social Media */}
      <div className="space-y-3">
        <div>
          <Label className="text-sm font-medium">
            Success Message Social Media
          </Label>
          <p className="text-xs text-muted-foreground mt-1">
            Pick which links we show on the post-signup section for users to
            share their referral links on.
          </p>
        </div>
        <div className="space-y-2">
          {Object.entries(config.successMessagePlatforms).map(
            ([platform, checked]) => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox
                  id={platform}
                  checked={checked}
                  onCheckedChange={(checked) =>
                    updatePlatform(
                      platform as keyof SocialConfig["successMessagePlatforms"],
                      checked as boolean,
                    )
                  }
                />
                <Label
                  htmlFor={platform}
                  className="text-sm capitalize cursor-pointer"
                >
                  {platform === "linkedin"
                    ? "LinkedIn"
                    : platform === "whatsapp"
                      ? "WhatsApp"
                      : platform === "telegram"
                        ? "Telegram"
                        : platform === "facebook"
                          ? "Facebook"
                          : platform === "twitter"
                            ? "Twitter"
                            : platform === "email"
                              ? "Email"
                              : platform === "reddit"
                                ? "Reddit"
                                : platform}
                </Label>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Custom Social Media Cards */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Custom Social Media Cards</Label>

        {/* OG Title */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">OG Title</Label>
          <p className="text-xs text-muted-foreground">
            This is the title that will show up when someone shares your
            waitlist on social media.
          </p>
          <Input
            value={config.ogTitle}
            onChange={(e) => updateConfig({ ogTitle: e.target.value })}
            placeholder="Join the waitlist"
          />
        </div>

        {/* OG Description */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">OG Description</Label>
          <p className="text-xs text-muted-foreground">
            This is the description that will show up when someone shares your
            waitlist on social media.
          </p>
          <Textarea
            value={config.ogDescription}
            onChange={(e) => updateConfig({ ogDescription: e.target.value })}
            placeholder="Be the first to know when we launch!"
            className="min-h-[60px]"
          />
        </div>
      </div>
    </div>
  );
}
