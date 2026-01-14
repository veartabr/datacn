'use client';

import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { TimeSeriesDataPoint, TimeSeriesConfig } from '../../core/types';
import { resampleTimeSeries } from '../../time/time-series';
import { DEFAULT_COLORS, DEFAULT_STROKE_WIDTH, DEFAULT_CURVE } from '../../core/constants';
import { parseDate } from '../../time/date-utils';

export interface TimeSeriesChartProps {
  data: TimeSeriesDataPoint[];
  config: TimeSeriesConfig;
  className?: string;
}

export function TimeSeriesChart({ data, config, className }: TimeSeriesChartProps) {
  if (data.length === 0) {
    return (
      <div className={className}>
        <p>No data available</p>
      </div>
    );
  }

  const granularity = config.granularity || 'day';
  const chartData = resampleTimeSeries(data, granularity);
  const colors = config.colors || DEFAULT_COLORS;
  const strokeWidth = DEFAULT_STROKE_WIDTH;
  const curve = DEFAULT_CURVE;

  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsLineChart data={chartData.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          type="number"
          scale="time"
          domain={['dataMin', 'dataMax']}
          tickFormatter={(value) => {
            const date = parseDate(value);
            return date ? date.toLocaleDateString() : String(value);
          }}
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
            key={key}
            type={curve}
            dataKey={key}
            stroke={colors[index % colors.length]}
            strokeWidth={strokeWidth}
            dot={config.showMarkers ? { r: 4 } : false}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
