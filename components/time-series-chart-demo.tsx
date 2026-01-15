"use client";

import { timeSeriesData } from "@/app/examples/data";
import { ChartDemo } from "@/components/chart-demo";
import { TimeSeriesChart } from "@/lib/data-viz/components/charts/time-series-chart";
import { getColorScheme, type ColorSchemeId } from "@/lib/data-viz/core/color-schemes";

interface TimeSeriesChartDemoProps {
  colorScheme?: ColorSchemeId;
}

export function TimeSeriesChartDemo({ colorScheme = "default" }: TimeSeriesChartDemoProps) {
  const scheme = getColorScheme(colorScheme);
  const config = {
    yKeys: ["temperature", "humidity"],
    granularity: "day" as const,
    colors: scheme.colors.slice(0, 2),
  };

  return (
    <ChartDemo
      chart={<TimeSeriesChart config={config} data={timeSeriesData} />}
      config={config}
      data={timeSeriesData}
    />
  );
}
