"use client";

import { barChartData } from "@/app/examples/data";
import { ChartDemo } from "@/components/chart-demo";
import { BarChart } from "@/lib/data-viz/components/charts/bar-chart";
import {
  type ColorSchemeId,
  getColorScheme,
} from "@/lib/data-viz/core/color-schemes";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";

interface BarChartDemoProps {
  colorScheme?: ColorSchemeId;
}

export function BarChartDemo({ colorScheme = "default" }: BarChartDemoProps) {
  const { data } = useChartData(barChartData.data);
  const scheme = getColorScheme(colorScheme);
  const config = {
    xKey: "month",
    yKey: "revenue",
    color: scheme.colors[0],
  };

  return (
    <ChartDemo
      chart={<BarChart config={config} data={data} />}
      config={config}
      data={barChartData.data}
    />
  );
}
