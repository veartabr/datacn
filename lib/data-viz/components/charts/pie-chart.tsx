"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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

  return (
    <ResponsiveContainer className={className} height="100%" width="100%">
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
          {data.data.map((_entry, index) => (
            <Cell fill={colors[index % colors.length]} key={`cell-${index}`} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
