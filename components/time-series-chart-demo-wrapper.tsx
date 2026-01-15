"use client";

import { timeSeriesData } from "@/app/examples/data";
import { ChartDemoWrapper } from "@/components/chart-demo-wrapper";
import { TimeSeriesChartDemo } from "@/components/time-series-chart-demo";
import type { ColorSchemeId } from "@/lib/data-viz/core/color-schemes";

interface TimeSeriesChartDemoWrapperProps {
  code: string;
}

export function TimeSeriesChartDemoWrapper({
  code,
}: TimeSeriesChartDemoWrapperProps) {
  return (
    <ChartDemoWrapper
      chart={(colorScheme: ColorSchemeId) => (
        <TimeSeriesChartDemo colorScheme={colorScheme} />
      )}
      code={code}
      rawData={timeSeriesData}
    />
  );
}
