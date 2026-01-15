"use client";

import { lineChartData } from "@/app/examples/data";
import { ChartDemoWrapper } from "@/components/chart-demo-wrapper";
import { LineChartDemo } from "@/components/line-chart-demo";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";
import type { ColorSchemeId } from "@/lib/data-viz/core/color-schemes";

interface LineChartDemoWrapperProps {
  code: string;
}

export function LineChartDemoWrapper({ code }: LineChartDemoWrapperProps) {
  const { data: processedData } = useChartData(lineChartData.data);

  return (
    <ChartDemoWrapper
      chart={(colorScheme: ColorSchemeId) => (
        <LineChartDemo colorScheme={colorScheme} />
      )}
      rawData={lineChartData.data}
      processedData={processedData}
      code={code}
    />
  );
}
