"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COLOR_SCHEMES,
  type ColorSchemeId,
  getColorScheme,
} from "@/lib/data-viz/core/color-schemes";

interface ColorSchemeSelectorProps {
  value: ColorSchemeId;
  onValueChange: (value: ColorSchemeId) => void;
  className?: string;
}

export function ColorSchemeSelector({
  value,
  onValueChange,
  className,
}: ColorSchemeSelectorProps) {
  const currentScheme = getColorScheme(value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue>
          <div className="flex items-center gap-2">
            <span>Color Scheme:</span>
            <span className="font-medium">{currentScheme.name}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {COLOR_SCHEMES.map((scheme) => (
          <SelectItem key={scheme.id} value={scheme.id}>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {scheme.colors.slice(0, 3).map((color, idx) => (
                  <div
                    key={idx}
                    className="h-4 w-4 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span>{scheme.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
