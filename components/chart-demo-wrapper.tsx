"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { ColorSchemeSelector } from "@/components/color-scheme-selector";
import { DataTable } from "@/components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ColorSchemeId } from "@/lib/data-viz/core/color-schemes";
import type {
  ChartData,
  DataPoint,
  TimeSeriesDataPoint,
} from "@/lib/data-viz/core/types";

interface ChartDemoWrapperProps {
  title?: string;
  description?: string;
  chart: React.ReactNode | ((colorScheme: ColorSchemeId) => React.ReactNode);
  rawData?: DataPoint[] | TimeSeriesDataPoint[];
  processedData?: ChartData;
  code: string;
  showColorSelector?: boolean;
  onColorSchemeChange?: (scheme: ColorSchemeId) => void;
  defaultColorScheme?: ColorSchemeId;
  className?: string;
}

export function ChartDemoWrapper({
  title,
  description,
  chart,
  rawData,
  processedData,
  code,
  showColorSelector = true,
  onColorSchemeChange,
  defaultColorScheme = "default",
  className,
}: ChartDemoWrapperProps) {
  const [colorScheme, setColorScheme] =
    useState<ColorSchemeId>(defaultColorScheme);

  const handleColorSchemeChange = (scheme: ColorSchemeId) => {
    setColorScheme(scheme);
    onColorSchemeChange?.(scheme);
  };

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            {showColorSelector && (
              <ColorSchemeSelector
                className="w-[200px]"
                onValueChange={handleColorSchemeChange}
                value={colorScheme}
              />
            )}
          </div>
        </CardHeader>
      )}
      {!(title || description) && showColorSelector && (
        <CardHeader className="pb-2">
          <div className="flex justify-end">
            <ColorSchemeSelector
              className="w-[200px]"
              onValueChange={handleColorSchemeChange}
              value={colorScheme}
            />
          </div>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        <Tabs className="w-full" defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="data">Data as a table</TabsTrigger>
          </TabsList>
          <TabsContent className="mt-4" value="preview">
            <div className="rounded-lg border bg-background p-4">
              <div className="h-[400px] w-full">
                {typeof chart === "function" ? chart(colorScheme) : chart}
              </div>
            </div>
          </TabsContent>
          <TabsContent className="mt-4" value="data">
            <DataTable processedData={processedData} rawData={rawData} />
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <CodeBlock code={code} language="typescript" />
        </div>
      </CardContent>
    </Card>
  );
}
