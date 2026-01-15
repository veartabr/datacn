"use client";

import { barChartData } from "@/app/examples/data";
import { BarChartDemo } from "@/components/bar-chart-demo";
import { ChartDemoWrapper } from "@/components/chart-demo-wrapper";
import type { ColorSchemeId } from "@/lib/data-viz/core/color-schemes";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";

interface BarChartDemoWrapperProps {
  code: string;
}

export function BarChartDemoWrapper({ code }: BarChartDemoWrapperProps) {
  const { data: processedData } = useChartData(barChartData.data);

  return (
    <ChartDemoWrapper
      chart={(colorScheme: ColorSchemeId) => (
        <BarChartDemo colorScheme={colorScheme} />
      )}
      code={code}
      processedData={processedData}
      rawData={barChartData.data}
    />
  );
}
