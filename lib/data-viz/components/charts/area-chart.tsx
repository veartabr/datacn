"use client";

import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
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
  createAreaChartConfig,
  generateStableChartId,
  getColorVariable,
} from "../../core/chart-config";
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

export function AreaChart({ data, config, className }: AreaChartProps) {
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
  const chartConfig = createAreaChartConfig(config, colors);
  const chartId = generateStableChartId(config.yKeys);

  return (
    <ChartContainer className={className} config={chartConfig} id={chartId}>
      <RechartsAreaChart
        accessibilityLayer
        data={data.data}
        margin={{ top: 10, right: 10 }}
        stackOffset={config.stacked ? "expand" : undefined}
      >
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={config.xKey}
          scale={
            data.metadata.types[config.xKey] === "date" ? "time" : undefined
          }
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
        <ChartLegend
          content={({ payload, verticalAlign }) => (
            <ChartLegendContent
              payload={payload}
              verticalAlign={verticalAlign}
            />
          )}
        />
        {config.yKeys.map((key) => (
          <Area
            dataKey={key}
            fill={getColorVariable(key)}
            fillOpacity={0.6}
            key={key}
            stackId={config.stacked ? "1" : undefined}
            stroke={getColorVariable(key)}
            type={curve}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
}
