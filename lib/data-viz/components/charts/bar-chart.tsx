"use client";

import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  createBarChartConfig,
  getColorVariable,
} from "../../core/chart-config";
import { DEFAULT_COLORS } from "../../core/constants";
import type { BarChartConfig, ChartData } from "../../core/types";
import { validateChartData } from "../../data/formats";

export interface BarChartProps {
  data: ChartData;
  config: BarChartConfig;
  timezone?: string;
  className?: string;
}

export function BarChart({ data, config, className }: BarChartProps) {
  if (!validateChartData(data, "bar")) {
    return (
      <div className={className}>
        <p>Invalid data for bar chart</p>
      </div>
    );
  }

  if (data.data.length === 0) {
    return (
      <div className={className}>
        <p>No data available</p>
      </div>
    );
  }

  const colors = config.colors || DEFAULT_COLORS;
  const chartConfig = createBarChartConfig(config, colors);
  const dataKey = config.horizontal ? config.xKey : config.yKey;

  return (
    <ChartContainer className={className} config={chartConfig}>
      <RechartsBarChart
        accessibilityLayer
        data={data.data}
        layout={config.horizontal ? "vertical" : "horizontal"}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={config.horizontal ? config.yKey : config.xKey}
          tickLine={false}
          type={config.horizontal ? "number" : "category"}
        />
        <YAxis
          axisLine={false}
          dataKey={config.horizontal ? config.xKey : config.yKey}
          tickLine={false}
          type={config.horizontal ? "category" : "number"}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey={dataKey}
          fill={getColorVariable(dataKey)}
          radius={[4, 4, 0, 0]}
        />
      </RechartsBarChart>
    </ChartContainer>
  );
}
