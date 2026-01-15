"use client";

import { areaChartData } from "@/app/examples/data";
import { ChartDemo } from "@/components/chart-demo";
import { AreaChart } from "@/lib/data-viz/components/charts/area-chart";
import { useChartData } from "@/lib/data-viz/hooks/use-chart-data";

export function AreaChartDemo() {
  const { data } = useChartData(areaChartData.data);

  return (
    <ChartDemo
      chart={
        <AreaChart
          config={{
            xKey: "month",
            yKeys: ["sales", "expenses"],
            stacked: true,
          }}
          data={data}
        />
      }
      config={{ xKey: "month", yKeys: ["sales", "expenses"], stacked: true }}
      data={areaChartData.data}
    />
  );
}
