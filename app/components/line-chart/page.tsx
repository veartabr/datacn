import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/code-block';
import { LineChartDemo } from '@/components/line-chart-demo';
import { createPageMetadata } from '@/app/metadata';
import { createBreadcrumbListSchema, createArticleSchema } from '@/lib/seo/structured-data';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = createPageMetadata(
  'Line Chart',
  'Create multi-line charts with datacn. Perfect for showing trends over time with multiple data series.',
  '/components/line-chart'
);

const exampleCode = `'use client';

import { LineChart, useChartData } from '@/lib/data-viz';

const rawData = [
  { date: '2024-01-01', users: 100, revenue: 5000 },
  { date: '2024-01-02', users: 120, revenue: 6000 },
  { date: '2024-01-03', users: 110, revenue: 5500 },
];

export function MyLineChart() {
  const { data } = useChartData(rawData);

  return (
    <LineChart
      data={data}
      config={{
        xKey: 'date',
        yKeys: ['users', 'revenue'],
        colors: ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'],
      }}
    />
  );
}`;

export default function LineChartPage() {
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: 'Home', url: '/' },
    { name: 'Components', url: '/components' },
    { name: 'Line Chart', url: '/components/line-chart' },
  ]);

  const articleSchema = createArticleSchema(
    'Line Chart - datacn',
    'Create multi-line charts with datacn. Perfect for showing trends over time with multiple data series.'
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
            <h1 className="text-4xl font-bold tracking-tight">Line Chart</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create multi-line charts with datacn. Perfect for showing trends over time
              with multiple data series.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Example</h2>
            <LineChartDemo />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Code</CardTitle>
              <CardDescription>Full implementation example</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={exampleCode} language="typescript" />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
