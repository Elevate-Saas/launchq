"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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

interface DesignPanelProps {
  config: WidgetConfig;
  onConfigChange: (config: WidgetConfig) => void;
}

export function DesignPanel({ config, onConfigChange }: DesignPanelProps) {
  const updateConfig = (updates: Partial<WidgetConfig>) => {
    onConfigChange({ ...config, ...updates });
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
          placeholder={
            config.colorFormat === "hex" ? "#000000" : "oklch(0.5 0.1 180)"
          }
        />
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Color Format Selector */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Color Format</Label>
        <div className="flex gap-2">
          <Button
            variant={config.colorFormat === "hex" ? "default" : "outline"}
            size="sm"
            onClick={() => updateConfig({ colorFormat: "hex" })}
          >
            HEX
          </Button>
          <Button
            variant={config.colorFormat === "oklch" ? "default" : "outline"}
            size="sm"
            onClick={() => updateConfig({ colorFormat: "oklch" })}
          >
            OKLCH
          </Button>
        </div>
      </div>

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
    </div>
  );
}
