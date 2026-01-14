'use client';

import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { ChartData, PieChartConfig } from '../../core/types';
import { validateChartData } from '../../data/formats';
import { DEFAULT_COLORS } from '../../core/constants';

export interface PieChartProps {
  data: ChartData;
  config: PieChartConfig;
  className?: string;
}

export function PieChart({ data, config, className }: PieChartProps) {
  if (!validateChartData(data, 'pie')) {
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
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsPieChart>
        <Pie
          data={data.data}
          dataKey={config.dataKey}
          nameKey={config.nameKey}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
