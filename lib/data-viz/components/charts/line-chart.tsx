'use client';

import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import type { ChartData, LineChartConfig, TimestampMarker } from '../../core/types';
import { validateChartData } from '../../data/formats';
import { DEFAULT_COLORS, DEFAULT_STROKE_WIDTH, DEFAULT_CURVE } from '../../core/constants';
import { parseDate } from '../../time/date-utils';

export interface LineChartProps {
  data: ChartData;
  config: LineChartConfig;
  markers?: TimestampMarker[];
  timezone?: string;
  className?: string;
}

export function LineChart({ data, config, markers, timezone, className }: LineChartProps) {
  if (!validateChartData(data, 'line')) {
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
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsLineChart data={data.data}>
        <CartesianGrid strokeDasharray="3 3" />
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
          <Line
            key={key}
            type={curve}
            dataKey={key}
            stroke={colors[index % colors.length]}
            strokeWidth={strokeWidth}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
