"use client";

import { areaChartData } from "@/app/examples/data";
import { ChartDemoWrapper } from "@/components/chart-demo-wrapper";
import { AreaChartDemo } from "@/components/area-chart-demo";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";
import type { ColorSchemeId } from "@/lib/data-viz/core/color-schemes";

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
      rawData={areaChartData.data}
      processedData={processedData}
      code={code}
    />
  );
}
