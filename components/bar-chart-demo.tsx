'use client';

import { ChartDemo } from '@/components/chart-demo';
import { BarChart } from '@/lib/data-viz/components/charts/bar-chart';
import { useChartData } from '@/lib/data-viz/hooks/use-chart-data';
import { barChartData } from '@/app/examples/data';

export function BarChartDemo() {
  const { data } = useChartData(barChartData.data);

  return (
    <ChartDemo
      chart={
        <BarChart
          data={data}
          config={{ xKey: 'month', yKey: 'revenue' }}
        />
      }
      data={barChartData.data}
      config={{ xKey: 'month', yKey: 'revenue' }}
    />
  );
}
