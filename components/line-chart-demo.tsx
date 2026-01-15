"use client";

import { lineChartData } from "@/app/examples/data";
import { ChartDemo } from "@/components/chart-demo";
import { LineChart } from "@/lib/data-viz/components/charts/line-chart";
import {
  type ColorSchemeId,
  getColorScheme,
} from "@/lib/data-viz/core/color-schemes";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";

interface LineChartDemoProps {
  colorScheme?: ColorSchemeId;
}

export function LineChartDemo({ colorScheme = "default" }: LineChartDemoProps) {
  const { data } = useChartData(lineChartData.data);
  const scheme = getColorScheme(colorScheme);
  const config = {
    xKey: "date",
    yKeys: ["users", "revenue"],
    colors: scheme.colors.slice(0, 2),
  };

  return (
    <ChartDemo
      chart={<LineChart config={config} data={data} />}
      config={config}
      data={lineChartData.data}
    />
  );
}
