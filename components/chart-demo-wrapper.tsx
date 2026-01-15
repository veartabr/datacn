"use client";

import { useState } from "react";
import { ColorSchemeSelector } from "@/components/color-scheme-selector";
import { DataTable } from "@/components/data-table";
import { CodeBlock } from "@/components/code-block";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ChartData, DataPoint, TimeSeriesDataPoint } from "@/lib/data-viz/core/types";
import type { ColorSchemeId } from "@/lib/data-viz/core/color-schemes";

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
  const [colorScheme, setColorScheme] = useState<ColorSchemeId>(defaultColorScheme);

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
                value={colorScheme}
                onValueChange={handleColorSchemeChange}
                className="w-[200px]"
              />
            )}
          </div>
        </CardHeader>
      )}
      {!title && !description && showColorSelector && (
        <CardHeader className="pb-2">
          <div className="flex justify-end">
            <ColorSchemeSelector
              value={colorScheme}
              onValueChange={handleColorSchemeChange}
              className="w-[200px]"
            />
          </div>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="data">Data as a table</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4">
            <div className="rounded-lg border bg-background p-4">
              <div className="h-[400px] w-full">
                {typeof chart === "function" ? chart(colorScheme) : chart}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="data" className="mt-4">
            <DataTable rawData={rawData} processedData={processedData} />
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <CodeBlock code={code} language="typescript" />
        </div>
      </CardContent>
    </Card>
  );
}
