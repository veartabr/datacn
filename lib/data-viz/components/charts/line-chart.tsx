"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
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

export function LineChart({
  data,
  config,
  markers,
  timezone,
  className,
}: LineChartProps) {
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

  return (
    <ResponsiveContainer className={className} height="100%" width="100%">
      <RechartsLineChart data={data.data}>
        <CartesianGrid strokeDasharray="3 3" />
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
          <Line
            activeDot={{ r: 6 }}
            dataKey={key}
            dot={{ r: 4 }}
            key={key}
            stroke={colors[index % colors.length]}
            strokeWidth={strokeWidth}
            type={curve}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
