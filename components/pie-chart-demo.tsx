"use client";

import { pieChartData } from "@/app/examples/data";
import { ChartDemo } from "@/components/chart-demo";
import { PieChart } from "@/lib/data-viz/components/charts/pie-chart";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";

export function PieChartDemo() {
  const { data } = useChartData(pieChartData.data);

  return (
    <ChartDemo
      chart={
        <PieChart
          config={{ dataKey: "value", nameKey: "category" }}
          data={data}
        />
      }
      config={{ dataKey: "value", nameKey: "category" }}
      data={pieChartData.data}
    />
  );
}
