"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Copy, Check } from "lucide-react";
import { DesignPanel } from "@/components/widget-builder/design-panel";
import { PreviewPanel } from "@/components/widget-builder/preview-panel";
import { SocialPanel } from "@/components/widget-builder/social-panel";
import { Label } from "@/components/ui/label";

interface WidgetBuilderProps {
  waitlistId: string;
}

export function WidgetBuilder({ waitlistId }: WidgetBuilderProps) {
  const [activeTab, setActiveTab] = React.useState("design");
  const [widgetConfig, setWidgetConfig] = React.useState({
    submitButtonColor: "#3829c2",
    backgroundColor: "#f4f4f4",
    fontColor: "#000000",
    buttonFontColor: "#ffffff",
    borderColor: "#cccccc",
    title: "Sign up for LaunchQ",
    successTitle: "Successfully signed up for LaunchQ",
    makeTransparent: false,
    colorFormat: "hex" as "hex" | "oklch",
  });

  const [socialConfig, setSocialConfig] = React.useState({
    socialMessage:
      "I'm {priority} on LaunchQ https://getwaitlist.com/waitlist/30227?ref_id=123456",
    successMessagePlatforms: {
      twitter: true,
      whatsapp: true,
      telegram: false,
      facebook: false,
      linkedin: false,
      email: false,
      reddit: false,
    },
    ogTitle: "Join the waitlist",
    ogDescription: "Be the first to know when we launch!",
  });

  const [previewType, setPreviewType] = React.useState("full");
  const [embedCode, setEmbedCode] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const generateEmbedCode = React.useCallback(
    (config: typeof widgetConfig, type: string) => {
      const baseUrl = `https://widget.getwaitlist.com/${waitlistId}`;
      const params = new URLSearchParams({
        title: config.title,
        success_title: config.successTitle,
        button_color: config.submitButtonColor,
        background_color: config.backgroundColor,
        font_color: config.fontColor,
        button_font_color: config.buttonFontColor,
        border_color: config.borderColor,
        transparent: config.makeTransparent.toString(),
      });

      switch (type) {
        case "mini":
          return `<script src="${baseUrl}/mini.js?${params}"></script>`;
        case "docked":
          return `<script src="${baseUrl}/docked.js?${params}"></script>`;
        case "hosted":
          return `<iframe src="${baseUrl}/hosted?${params}" width="100%" height="400" frameborder="0"></iframe>`;
        default:
          return `<script src="${baseUrl}/embed.js?${params}"></script>`;
      }
    },
    [waitlistId],
  );

  React.useEffect(() => {
    // Generate embed code based on current config
    const code = generateEmbedCode(widgetConfig, previewType);
    setEmbedCode(code);
  }, [widgetConfig, previewType, generateEmbedCode]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel - Configuration */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Widget Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
              </TabsList>

              <TabsContent value="design" className="mt-4">
                <DesignPanel
                  config={widgetConfig}
                  onConfigChange={setWidgetConfig}
                />
              </TabsContent>

              <TabsContent value="social" className="mt-4">
                <SocialPanel
                  config={socialConfig}
                  onConfigChange={setSocialConfig}
                />
              </TabsContent>

              <TabsContent value="questions" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Custom questions will be available here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Preview */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Preview</CardTitle>
              <div className="flex items-center gap-2">
                <Tabs value={previewType} onValueChange={setPreviewType}>
                  <TabsList>
                    <TabsTrigger value="full">Full Widget</TabsTrigger>
                    <TabsTrigger value="mini">Mini Widget</TabsTrigger>
                    <TabsTrigger value="docked">Docked Widget</TabsTrigger>
                    <TabsTrigger value="hosted">Hosted Page</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button onClick={copyToClipboard} size="sm">
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Code className="h-4 w-4" />
                  )}
                  {copied ? "Copied!" : "Get Embed Code"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PreviewPanel config={widgetConfig} type={previewType} />

            {embedCode && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Embed Code</Label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <pre className="text-xs bg-background p-2 rounded border overflow-x-auto">
                  <code>{embedCode}</code>
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
