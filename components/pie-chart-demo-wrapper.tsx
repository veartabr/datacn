"use client";

import { pieChartData } from "@/app/examples/data";
import { ChartDemoWrapper } from "@/components/chart-demo-wrapper";
import { PieChartDemo } from "@/components/pie-chart-demo";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";
import type { ColorSchemeId } from "@/lib/data-viz/core/color-schemes";

interface PieChartDemoWrapperProps {
  code: string;
}

export function PieChartDemoWrapper({ code }: PieChartDemoWrapperProps) {
  const { data: processedData } = useChartData(pieChartData.data);

  return (
    <ChartDemoWrapper
      chart={(colorScheme: ColorSchemeId) => (
        <PieChartDemo colorScheme={colorScheme} />
      )}
      rawData={pieChartData.data}
      processedData={processedData}
      code={code}
    />
  );
}
