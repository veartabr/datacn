'use client';

import { ChartDemo } from '@/components/chart-demo';
import { LineChart } from '@/lib/data-viz/components/charts/line-chart';
import { useChartData } from '@/lib/data-viz/hooks/use-chart-data';
import { lineChartData } from '@/app/examples/data';

export function LineChartDemo() {
  const { data } = useChartData(lineChartData.data);

  return (
    <ChartDemo
      chart={
        <LineChart
          data={data}
          config={{ xKey: 'date', yKeys: ['users', 'revenue'] }}
        />
      }
      data={lineChartData.data}
      config={{ xKey: 'date', yKeys: ['users', 'revenue'] }}
    />
  );
}
