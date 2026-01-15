"use client";

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  createLineChartConfig,
  getColorVariable,
} from "../../core/chart-config";
import {
  DEFAULT_COLORS,
  DEFAULT_CURVE,
  DEFAULT_STROKE_WIDTH,
} from "../../core/constants";
import type {
  ChartData,
  LineChartConfig,
  TimestampMarker,
} from "../../core/types";
import { validateChartData } from "../../data/formats";
import { parseDate } from "../../time/date-utils";

export interface LineChartProps {
  data: ChartData;
  config: LineChartConfig;
  markers?: TimestampMarker[];
  timezone?: string;
  className?: string;
}

export function LineChart({ data, config, className }: LineChartProps) {
  if (!validateChartData(data, "line")) {
    return (
      <div className={className}>
        <p>Invalid data for line chart</p>
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
  const strokeWidth = config.strokeWidth || DEFAULT_STROKE_WIDTH;
  const curve = config.curve || DEFAULT_CURVE;
  const chartConfig = createLineChartConfig(config, colors);

  return (
    <ChartContainer className={className} config={chartConfig}>
      <RechartsLineChart accessibilityLayer data={data.data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={config.xKey}
          scale={data.metadata.types[config.xKey] === "date" ? "time" : undefined}
          tickFormatter={(value) => {
            if (data.metadata.types[config.xKey] === "date") {
              const date = parseDate(value);
              return date ? date.toLocaleDateString() : String(value);
            }
            return String(value);
          }}
          tickLine={false}
          type={
            data.metadata.types[config.xKey] === "date" ? "number" : "category"
          }
        />
        <YAxis axisLine={false} tickLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {config.yKeys.map((key) => (
          <Line
            activeDot={{ r: 6 }}
            dataKey={key}
            dot={{ r: 4 }}
            key={key}
            stroke={getColorVariable(key)}
            strokeWidth={strokeWidth}
            type={curve}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
}
