import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/code-block';
import { TimeSeriesChartDemo } from '@/components/time-series-chart-demo';
import { createPageMetadata } from '@/app/metadata';
import { createBreadcrumbListSchema, createArticleSchema } from '@/lib/seo/structured-data';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = createPageMetadata(
  'Time Series Chart',
  'Create time series charts with automatic binning and timezone support. Perfect for temporal data visualization.',
  '/components/time-series-chart'
);

const exampleCode = `'use client';

import { TimeSeriesChart } from '@/lib/data-viz';

const timeSeriesData = [
  { timestamp: '2024-01-01T00:00:00Z', timezone: 'UTC', temperature: 20 },
  { timestamp: '2024-01-01T06:00:00Z', timezone: 'UTC', temperature: 18 },
];

export function MyTimeSeriesChart() {
  return (
    <TimeSeriesChart
      data={timeSeriesData}
      config={{
        yKeys: ['temperature'],
        granularity: 'day',
      }}
    />
  );
}`;

export default function TimeSeriesChartPage() {
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: 'Home', url: '/' },
    { name: 'Components', url: '/components' },
    { name: 'Time Series Chart', url: '/components/time-series-chart' },
  ]);

  const articleSchema = createArticleSchema(
    'Time Series Chart - datacn',
    'Create time series charts with automatic binning and timezone support. Perfect for temporal data visualization.'
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
            <h1 className="text-4xl font-bold tracking-tight">Time Series Chart</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create time series charts with automatic binning and timezone support.
              Perfect for temporal data visualization.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Example</h2>
            <TimeSeriesChartDemo />
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
