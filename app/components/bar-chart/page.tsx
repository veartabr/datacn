import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/code-block';
import { ChartDemo } from '@/components/chart-demo';
import { BarChartDemo } from '@/components/bar-chart-demo';
import { createPageMetadata } from '@/app/metadata';
import { createBreadcrumbListSchema, createArticleSchema } from '@/lib/seo/structured-data';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = createPageMetadata(
  'Bar Chart',
  'Create beautiful bar charts with datacn. Supports horizontal and vertical orientations, stacking, and custom colors.',
  '/components/bar-chart'
);

const importCode = `import { BarChart } from '@/lib/data-viz';`;

const exampleCode = `'use client';

import { BarChart, useChartData } from '@/lib/data-viz';

const rawData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
];

export function MyBarChart() {
  const { data } = useChartData(rawData);

  return (
    <BarChart
      data={data}
      config={{
        xKey: 'month',
        yKey: 'revenue',
        color: 'hsl(var(--chart-1))',
      }}
    />
  );
}`;

const propsCode = `interface BarChartProps {
  data: ChartData;
  config: BarChartConfig;
  timezone?: string;
  className?: string;
}

interface BarChartConfig {
  xKey: string;
  yKey: string;
  color?: string;
  colors?: string[];
  stacked?: boolean;
  horizontal?: boolean;
}`;

export default function BarChartPage() {
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: 'Home', url: '/' },
    { name: 'Components', url: '/components' },
    { name: 'Bar Chart', url: '/components/bar-chart' },
  ]);

  const articleSchema = createArticleSchema(
    'Bar Chart - datacn',
    'Create beautiful bar charts with datacn. Supports horizontal and vertical orientations, stacking, and custom colors.'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container py-8">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Bar Chart</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create beautiful bar charts with datacn. Supports horizontal and vertical
              orientations, stacking, and custom colors.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Import</CardTitle>
              <CardDescription>
                Import the BarChart component from the library
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={importCode} language="typescript" />
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Example</h2>
            <BarChartDemo />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Code</CardTitle>
              <CardDescription>
                Full implementation example
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={exampleCode} language="typescript" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>
                Props and configuration options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={propsCode} language="typescript" />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
