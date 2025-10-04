"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Send, ExternalLink } from "lucide-react";

interface WidgetConfig {
  submitButtonColor: string;
  backgroundColor: string;
  fontColor: string;
  buttonFontColor: string;
  borderColor: string;
  title: string;
  successTitle: string;
  makeTransparent: boolean;
  colorFormat: "hex" | "oklch";
}

interface PreviewPanelProps {
  config: WidgetConfig;
  type: string;
}

export function PreviewPanel({ config, type }: PreviewPanelProps) {
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset after 3 seconds to show the success state
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const renderWidget = () => {
    const widgetStyle = {
      backgroundColor: config.makeTransparent
        ? "transparent"
        : config.backgroundColor,
      color: config.fontColor,
      borderColor: config.borderColor,
    };

    const buttonStyle = {
      backgroundColor: config.submitButtonColor,
      color: config.buttonFontColor,
    };

    if (isSubmitted) {
      return (
        <div
          className="p-6 rounded-lg border-2 border-dashed text-center"
          style={widgetStyle}
        >
          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3
              className="text-lg font-semibold"
              style={{ color: config.fontColor }}
            >
              {config.successTitle || "Successfully signed up!"}
            </h3>
            <p
              className="text-sm opacity-75"
              style={{ color: config.fontColor }}
            >
              Thank you for joining our waitlist!
            </p>
          </div>
        </div>
      );
    }

    switch (type) {
      case "mini":
        return (
          <div
            className="flex items-center gap-2 p-3 rounded-lg border"
            style={widgetStyle}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 text-sm"
              style={{ color: config.fontColor }}
            />
            <Button size="sm" onClick={handleSubmit} style={buttonStyle}>
              Join
            </Button>
          </div>
        );

      case "docked":
        return (
          <div
            className="fixed bottom-4 right-4 w-80 p-4 rounded-lg shadow-lg border"
            style={widgetStyle}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3
                  className="font-semibold text-sm"
                  style={{ color: config.fontColor }}
                >
                  {config.title || "Join our waitlist"}
                </h3>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  ×
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm"
                  style={{ color: config.fontColor }}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="w-full"
                  style={buttonStyle}
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </div>
        );

      case "hosted":
        return (
          <div
            className="min-h-[400px] p-8 rounded-lg border"
            style={widgetStyle}
          >
            <div className="max-w-md mx-auto text-center space-y-6">
              <div className="space-y-2">
                <h1
                  className="text-2xl font-bold"
                  style={{ color: config.fontColor }}
                >
                  {config.title || "Join our waitlist"}
                </h1>
                <p
                  className="text-sm opacity-75"
                  style={{ color: config.fontColor }}
                >
                  Be the first to know when we launch!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-left"
                    style={{ color: config.fontColor }}
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@getwaitlist.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ color: config.fontColor }}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  style={buttonStyle}
                >
                  Sign Up
                </Button>
              </form>

              <div
                className="text-xs opacity-60"
                style={{ color: config.fontColor }}
              >
                <p>
                  Signed up before?{" "}
                  <a href="#" className="underline">
                    Check your Status
                  </a>
                </p>
              </div>
            </div>
          </div>
        );

      default: // Full Widget
        return (
          <div className="p-6 rounded-lg border" style={widgetStyle}>
            <div className="max-w-sm mx-auto space-y-4">
              {config.title && (
                <h2
                  className="text-lg font-semibold text-center"
                  style={{ color: config.fontColor }}
                >
                  {config.title}
                </h2>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <Label
                    htmlFor="email"
                    className="text-sm"
                    style={{ color: config.fontColor }}
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@getwaitlist.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ color: config.fontColor }}
                  />
                </div>

                <Button type="submit" className="w-full" style={buttonStyle}>
                  Sign Up
                </Button>
              </form>

              <div
                className="text-xs text-center opacity-75"
                style={{ color: config.fontColor }}
              >
                <p>
                  Signed up before?{" "}
                  <a href="#" className="underline">
                    Check your Status
                  </a>
                </p>
              </div>

              <div
                className="flex items-center justify-center gap-1 text-xs opacity-50"
                style={{ color: config.fontColor }}
              >
                <Send className="h-3 w-3" />
                <span>Widget by getwaitlist.com</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="text-xs">
          {type === "full"
            ? "Full Widget"
            : type === "mini"
              ? "Mini Widget"
              : type === "docked"
                ? "Docked Widget"
                : "Hosted Page"}
        </Badge>
        <Button variant="ghost" size="sm" className="text-xs">
          <ExternalLink className="h-3 w-3 mr-1" />
          Open in new tab
        </Button>
      </div>

      <div className="border rounded-lg p-4 bg-muted/20">{renderWidget()}</div>
    </div>
  );
}
