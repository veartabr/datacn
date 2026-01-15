"use client";

import { barChartData } from "@/app/examples/data";
import { ChartDemo } from "@/components/chart-demo";
import { BarChart } from "@/lib/data-viz/components/charts/bar-chart";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";

export function HomeChartPreview() {
  const { data } = useChartData(barChartData.data);

  return (
    <ChartDemo
      chart={
        <BarChart config={{ xKey: "month", yKey: "revenue" }} data={data} />
      }
      config={{ xKey: "month", yKey: "revenue" }}
      data={barChartData.data}
      description="A simple bar chart example"
      title="Quick Preview"
    />
  );
}
