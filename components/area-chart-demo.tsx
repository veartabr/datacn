"use client";

import { areaChartData } from "@/app/examples/data";
import { ChartDemo } from "@/components/chart-demo";
import { AreaChart } from "@/lib/data-viz/components/charts/area-chart";
import { getColorScheme, type ColorSchemeId } from "@/lib/data-viz/core/color-schemes";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";

interface AreaChartDemoProps {
  colorScheme?: ColorSchemeId;
}

export function AreaChartDemo({ colorScheme = "default" }: AreaChartDemoProps) {
  const { data } = useChartData(areaChartData.data);
  const scheme = getColorScheme(colorScheme);
  const config = {
    xKey: "month",
    yKeys: ["sales", "expenses"],
    stacked: true,
    colors: scheme.colors.slice(0, 2),
  };

  return (
    <ChartDemo
      chart={<AreaChart config={config} data={data} />}
      config={config}
      data={areaChartData.data}
    />
  );
}
