'use client';

import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import type { ChartData, BarChartConfig } from '../../core/types';
import { validateChartData } from '../../data/formats';
import { DEFAULT_COLORS, DEFAULT_STROKE_WIDTH } from '../../core/constants';

export interface BarChartProps {
  data: ChartData;
  config: BarChartConfig;
  timezone?: string;
  className?: string;
}

export function BarChart({ data, config, timezone, className }: BarChartProps) {
  if (!validateChartData(data, 'bar')) {
    return (
      <div className={className}>
        <p>Invalid data for bar chart</p>
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
  const color = config.color || colors[0];

  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsBarChart data={data.data} layout={config.horizontal ? 'vertical' : 'horizontal'}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={config.horizontal ? config.yKey : config.xKey}
          type={config.horizontal ? 'number' : 'category'}
        />
        <YAxis
          dataKey={config.horizontal ? config.xKey : config.yKey}
          type={config.horizontal ? 'category' : 'number'}
        />
        <Bar
          dataKey={config.horizontal ? config.xKey : config.yKey}
          fill={color}
          radius={[4, 4, 0, 0]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
