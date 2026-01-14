'use client';

import { ChartDemo } from '@/components/chart-demo';
import { TimeSeriesChart } from '@/lib/data-viz/components/charts/time-series-chart';
import { timeSeriesData } from '@/app/examples/data';

export function TimeSeriesChartDemo() {
  return (
    <ChartDemo
      chart={
        <TimeSeriesChart
          data={timeSeriesData}
          config={{ yKeys: ['temperature', 'humidity'], granularity: 'day' }}
        />
      }
      data={timeSeriesData}
      config={{ yKeys: ['temperature', 'humidity'], granularity: 'day' }}
    />
  );
}
