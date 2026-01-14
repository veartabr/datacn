'use client';

import React from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import type { ChartData, AreaChartConfig } from '../../core/types';
import { validateChartData } from '../../data/formats';
import { DEFAULT_COLORS, DEFAULT_CURVE } from '../../core/constants';
import { parseDate } from '../../time/date-utils';

export interface AreaChartProps {
  data: ChartData;
  config: AreaChartConfig;
  timezone?: string;
  className?: string;
}

export function AreaChart({ data, config, timezone, className }: AreaChartProps) {
  if (!validateChartData(data, 'area')) {
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
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsAreaChart
        data={data.data}
        accessibilityLayer
        margin={{ top: 10, right: 10 }}
        stackOffset={config.stacked ? 'expand' : undefined}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis
          dataKey={config.xKey}
          type={data.metadata.types[config.xKey] === 'date' ? 'number' : 'category'}
          scale="time"
          tickFormatter={(value) => {
            if (data.metadata.types[config.xKey] === 'date') {
              const date = parseDate(value);
              return date ? date.toLocaleDateString() : String(value);
            }
            return String(value);
          }}
        />
        <YAxis />
        <Legend />
        {config.yKeys.map((key, index) => (
          <Area
            key={key}
            type={curve}
            dataKey={key}
            stackId={config.stacked ? '1' : undefined}
            stroke={colors[index % colors.length]}
            fill={colors[index % colors.length]}
            fillOpacity={0.6}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
