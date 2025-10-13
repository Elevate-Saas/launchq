"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ColorFormat } from "@launchq/core";

interface WidgetConfig {
  submitButtonColor: string;
  backgroundColor: string;
  fontColor: string;
  buttonFontColor: string;
  borderColor: string;
  title: string;
  successTitle: string;
  successDescription: string;
  buttonText: string;
  makeTransparent: boolean;
  colorFormat: ColorFormat;
}

interface DesignPanelProps {
  config: WidgetConfig;
  onConfigChange: (config: WidgetConfig) => void;
}

export function DesignPanel({ config, onConfigChange }: DesignPanelProps) {
  const updateConfig = (updates: Partial<WidgetConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const getColorPlaceholder = (format: ColorFormat): string => {
    switch (format) {
      case ColorFormat.HEX:
        return "#000000";
      case ColorFormat.RGB:
        return "rgb(0, 0, 0)";
      case ColorFormat.HSL:
        return "hsl(0, 0%, 0%)";
      case ColorFormat.OKLCH:
        return "oklch(0.5 0.1 180)";
      default:
        return "#000000";
    }
  };

  const ColorPicker = ({
    label,
    value,
    onChange,
    description,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    description?: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded border border-input cursor-pointer"
          />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
          placeholder={getColorPlaceholder(config.colorFormat)}
        />
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Submit Button Color */}
      <ColorPicker
        label="Submit Button Color"
        value={config.submitButtonColor}
        onChange={(value) => updateConfig({ submitButtonColor: value })}
      />

      {/* Background Color */}
      <div className="space-y-2">
        <ColorPicker
          label="Background Color"
          value={config.backgroundColor}
          onChange={(value) => updateConfig({ backgroundColor: value })}
        />
        <div className="flex items-center space-x-2">
          <Switch
            id="transparent"
            checked={config.makeTransparent}
            onCheckedChange={(checked) =>
              updateConfig({ makeTransparent: checked })
            }
          />
          <Label htmlFor="transparent" className="text-sm">
            Make transparent
          </Label>
        </div>
      </div>

      {/* Font Color */}
      <ColorPicker
        label="Font Color"
        value={config.fontColor}
        onChange={(value) => updateConfig({ fontColor: value })}
      />

      {/* Button Font Color */}
      <ColorPicker
        label="Button Font Color"
        value={config.buttonFontColor}
        onChange={(value) => updateConfig({ buttonFontColor: value })}
      />

      {/* Border Color */}
      <ColorPicker
        label="Border Color"
        value={config.borderColor}
        onChange={(value) => updateConfig({ borderColor: value })}
      />

      {/* Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Title</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateConfig({ title: "" })}
            className="text-xs"
          >
            Remove Title
          </Button>
        </div>
        <Input
          value={config.title}
          onChange={(e) => updateConfig({ title: e.target.value })}
          placeholder="Enter widget title"
        />
      </div>

      {/* Success Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Success Title</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateConfig({ successTitle: "" })}
            className="text-xs"
          >
            Remove Success Title
          </Button>
        </div>
        <Input
          value={config.successTitle}
          onChange={(e) => updateConfig({ successTitle: e.target.value })}
          placeholder="Enter success message"
        />
      </div>

      {/* Success Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Success Description</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateConfig({ successDescription: "" })}
            className="text-xs"
          >
            Remove Success Description
          </Button>
        </div>
        <textarea
          value={config.successDescription}
          onChange={(e) => updateConfig({ successDescription: e.target.value })}
          placeholder="Enter success description"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Signup Button Text */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Signup Button Text</Label>
        <Input
          value={config.buttonText}
          onChange={(e) => updateConfig({ buttonText: e.target.value })}
          placeholder="Sign Up"
        />
      </div>
    </div>
  );
}
