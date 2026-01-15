"use client";

import { timeSeriesData } from "@/app/examples/data";
import { ChartDemo } from "@/components/chart-demo";
import { TimeSeriesChart } from "@/lib/data-viz/components/charts/time-series-chart";

export function TimeSeriesChartDemo() {
  return (
    <ChartDemo
      chart={
        <TimeSeriesChart
          config={{ yKeys: ["temperature", "humidity"], granularity: "day" }}
          data={timeSeriesData}
        />
      }
      config={{ yKeys: ["temperature", "humidity"], granularity: "day" }}
      data={timeSeriesData}
    />
  );
}
