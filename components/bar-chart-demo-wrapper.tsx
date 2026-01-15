"use client";

import { barChartData } from "@/app/examples/data";
import { ChartDemoWrapper } from "@/components/chart-demo-wrapper";
import { BarChartDemo } from "@/components/bar-chart-demo";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";
import type { ColorSchemeId } from "@/lib/data-viz/core/color-schemes";

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
      rawData={barChartData.data}
      processedData={processedData}
      code={code}
    />
  );
}
