"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  DEFAULT_COLORS,
  DEFAULT_CURVE,
  DEFAULT_STROKE_WIDTH,
} from "../../core/constants";
import type { TimeSeriesConfig, TimeSeriesDataPoint } from "../../core/types";
import { parseDate } from "../../time/date-utils";
import { resampleTimeSeries } from "../../time/time-series";

export interface TimeSeriesChartProps {
  data: TimeSeriesDataPoint[];
  config: TimeSeriesConfig;
  className?: string;
}

export function TimeSeriesChart({
  data,
  config,
  className,
}: TimeSeriesChartProps) {
  if (data.length === 0) {
    return (
      <div className={className}>
        <p>No data available</p>
      </div>
    );
  }

  const granularity = config.granularity || "day";
  const chartData = resampleTimeSeries(data, granularity);
  const colors = config.colors || DEFAULT_COLORS;
  const strokeWidth = DEFAULT_STROKE_WIDTH;
  const curve = DEFAULT_CURVE;

  return (
    <ResponsiveContainer className={className} height="100%" width="100%">
      <RechartsLineChart data={chartData.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          domain={["dataMin", "dataMax"]}
          scale="time"
          tickFormatter={(value) => {
            const date = parseDate(value);
            return date ? date.toLocaleDateString() : String(value);
          }}
          type="number"
        />
        <YAxis />
        <Tooltip
          labelFormatter={(value) => {
            const date = parseDate(value);
            return date ? date.toLocaleString() : String(value);
          }}
        />
        <Legend />
        {config.yKeys.map((key, index) => (
          <Line
            activeDot={{ r: 6 }}
            dataKey={key}
            dot={config.showMarkers ? { r: 4 } : false}
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
