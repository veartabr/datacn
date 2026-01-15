"use client";

import { areaChartData } from "@/app/examples/data";
import { AreaChartDemo } from "@/components/area-chart-demo";
import { ChartDemoWrapper } from "@/components/chart-demo-wrapper";
import type { ColorSchemeId } from "@/lib/data-viz/core/color-schemes";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";

interface AreaChartDemoWrapperProps {
  code: string;
}

export function AreaChartDemoWrapper({ code }: AreaChartDemoWrapperProps) {
  const { data: processedData } = useChartData(areaChartData.data);

  return (
    <ChartDemoWrapper
      chart={(colorScheme: ColorSchemeId) => (
        <AreaChartDemo colorScheme={colorScheme} />
      )}
      code={code}
      processedData={processedData}
      rawData={areaChartData.data}
    />
  );
}
