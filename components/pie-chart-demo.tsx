'use client';

import { ChartDemo } from '@/components/chart-demo';
import { PieChart } from '@/lib/data-viz/components/charts/pie-chart';
import { useChartData } from '@/lib/data-viz/hooks/use-chart-data';
import { pieChartData } from '@/app/examples/data';

export function PieChartDemo() {
  const { data } = useChartData(pieChartData.data);

  return (
    <ChartDemo
      chart={
        <PieChart
          data={data}
          config={{ dataKey: 'value', nameKey: 'category' }}
        />
      }
      data={pieChartData.data}
      config={{ dataKey: 'value', nameKey: 'category' }}
    />
  );
}
