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
  createTimeSeriesChartConfig,
  generateStableChartId,
  getColorVariable,
} from "../../core/chart-config";
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
  const chartConfig = createTimeSeriesChartConfig(config, colors);
  const chartId = generateStableChartId(config.yKeys);

  return (
    <ChartContainer className={className} config={chartConfig} id={chartId}>
      <RechartsLineChart accessibilityLayer data={chartData.data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="timestamp"
          domain={["dataMin", "dataMax"]}
          scale="time"
          tickFormatter={(value) => {
            const date = parseDate(value);
            return date ? date.toLocaleDateString() : String(value);
          }}
          tickLine={false}
          type="number"
        />
        <YAxis axisLine={false} tickLine={false} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                const date = parseDate(value);
                return date ? date.toLocaleString() : String(value);
              }}
            />
          }
        />
        <ChartLegend
          content={({ payload, verticalAlign }) => (
            <ChartLegendContent payload={payload} verticalAlign={verticalAlign} />
          )}
        />
        {config.yKeys.map((key) => (
          <Line
            activeDot={{ r: 6 }}
            dataKey={key}
            dot={config.showMarkers ? { r: 4 } : false}
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
