"use client";

import { pieChartData } from "@/app/examples/data";
import { ChartDemo } from "@/components/chart-demo";
import { PieChart } from "@/lib/data-viz/components/charts/pie-chart";
import { getColorScheme, type ColorSchemeId } from "@/lib/data-viz/core/color-schemes";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";

interface PieChartDemoProps {
  colorScheme?: ColorSchemeId;
}

export function PieChartDemo({ colorScheme = "default" }: PieChartDemoProps) {
  const { data } = useChartData(pieChartData.data);
  const scheme = getColorScheme(colorScheme);
  const config = {
    dataKey: "value",
    nameKey: "category",
    colors: scheme.colors,
  };

  return (
    <ChartDemo
      chart={<PieChart config={config} data={data} />}
      config={config}
      data={pieChartData.data}
    />
  );
}
