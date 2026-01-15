"use client";

import {
  Area,
  CartesianGrid,
  Legend,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { DEFAULT_COLORS, DEFAULT_CURVE } from "../../core/constants";
import type { AreaChartConfig, ChartData } from "../../core/types";
import { validateChartData } from "../../data/formats";
import { parseDate } from "../../time/date-utils";

export interface AreaChartProps {
  data: ChartData;
  config: AreaChartConfig;
  timezone?: string;
  className?: string;
}

export function AreaChart({
  data,
  config,
  timezone,
  className,
}: AreaChartProps) {
  if (!validateChartData(data, "area")) {
    return (
      <div className={className}>
        <p>Invalid data for area chart</p>
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
  const curve = config.curve || DEFAULT_CURVE;

  return (
    <ResponsiveContainer className={className} height="100%" width="100%">
      <RechartsAreaChart
        accessibilityLayer
        data={data.data}
        margin={{ top: 10, right: 10 }}
        stackOffset={config.stacked ? "expand" : undefined}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis
          dataKey={config.xKey}
          scale="time"
          tickFormatter={(value) => {
            if (data.metadata.types[config.xKey] === "date") {
              const date = parseDate(value);
              return date ? date.toLocaleDateString() : String(value);
            }
            return String(value);
          }}
          type={
            data.metadata.types[config.xKey] === "date" ? "number" : "category"
          }
        />
        <YAxis />
        <Legend />
        {config.yKeys.map((key, index) => (
          <Area
            dataKey={key}
            fill={colors[index % colors.length]}
            fillOpacity={0.6}
            key={key}
            stackId={config.stacked ? "1" : undefined}
            stroke={colors[index % colors.length]}
            type={curve}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
