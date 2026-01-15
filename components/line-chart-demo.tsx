"use client";

import { lineChartData } from "@/app/examples/data";
import { ChartDemo } from "@/components/chart-demo";
import { LineChart } from "@/lib/data-viz/components/charts/line-chart";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";

export function LineChartDemo() {
  const { data } = useChartData(lineChartData.data);

  return (
    <ChartDemo
      chart={
        <LineChart
          config={{ xKey: "date", yKeys: ["users", "revenue"] }}
          data={data}
        />
      }
      config={{ xKey: "date", yKeys: ["users", "revenue"] }}
      data={lineChartData.data}
    />
  );
}
