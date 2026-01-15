"use client";

import { Cell, Pie, PieChart as RechartsPieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  createPieChartConfig,
  generateStableChartId,
  getColorVariable,
} from "../../core/chart-config";
import { DEFAULT_COLORS } from "../../core/constants";
import type { ChartData, PieChartConfig } from "../../core/types";
import { validateChartData } from "../../data/formats";

export interface PieChartProps {
  data: ChartData;
  config: PieChartConfig;
  className?: string;
}

export function PieChart({ data, config, className }: PieChartProps) {
  if (!validateChartData(data, "pie")) {
    return (
      <div className={className}>
        <p>Invalid data for pie chart</p>
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
  const chartConfig = createPieChartConfig(config, colors, data.data);
  const uniqueNames = Array.from(
    new Set(data.data.map((entry) => String(entry[config.nameKey])))
  );
  const chartId = generateStableChartId(uniqueNames);

  return (
    <ChartContainer className={className} config={chartConfig} id={chartId}>
      <RechartsPieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={data.data}
          dataKey={config.dataKey}
          label
          nameKey={config.nameKey}
          outerRadius={80}
        >
          {data.data.map((entry) => {
            const nameValue = String(entry[config.nameKey]);
            return <Cell fill={getColorVariable(nameValue)} key={nameValue} />;
          })}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend
          content={({ payload, verticalAlign }) => (
            <ChartLegendContent
              payload={payload}
              verticalAlign={verticalAlign}
            />
          )}
        />
      </RechartsPieChart>
    </ChartContainer>
  );
}
