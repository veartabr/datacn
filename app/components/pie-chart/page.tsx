import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/code-block';
import { PieChartDemo } from '@/components/pie-chart-demo';
import { createPageMetadata } from '@/app/metadata';
import { createBreadcrumbListSchema, createArticleSchema } from '@/lib/seo/structured-data';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = createPageMetadata(
  'Pie Chart',
  'Create beautiful pie charts with datacn. Perfect for showing proportional data and category distributions.',
  '/components/pie-chart'
);

const exampleCode = `'use client';

import { PieChart, useChartData } from '@/lib/data-viz';

const rawData = [
  { category: 'Desktop', value: 45 },
  { category: 'Mobile', value: 30 },
  { category: 'Tablet', value: 15 },
];

export function MyPieChart() {
  const { data } = useChartData(rawData);

  return (
    <PieChart
      data={data}
      config={{
        dataKey: 'value',
        nameKey: 'category',
      }}
    />
  );
}`;

export default function PieChartPage() {
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: 'Home', url: '/' },
    { name: 'Components', url: '/components' },
    { name: 'Pie Chart', url: '/components/pie-chart' },
  ]);

  const articleSchema = createArticleSchema(
    'Pie Chart - datacn',
    'Create beautiful pie charts with datacn. Perfect for showing proportional data and category distributions.'
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
            <h1 className="text-4xl font-bold tracking-tight">Pie Chart</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create beautiful pie charts with datacn. Perfect for showing proportional
              data and category distributions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Example</h2>
            <PieChartDemo />
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
