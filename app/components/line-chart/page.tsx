import type { Metadata } from "next";
import { createPageMetadata } from "@/app/metadata";
import { LineChartDemoWrapper } from "@/components/line-chart-demo-wrapper";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import {
  createArticleSchema,
  createBreadcrumbListSchema,
} from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata(
  "Line Chart",
  "Create multi-line charts with datacn. Perfect for showing trends over time with multiple data series.",
  "/components/line-chart"
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
    { name: "Home", url: "/" },
    { name: "Components", url: "/components" },
    { name: "Line Chart", url: "/components/line-chart" },
  ]);

  const articleSchema = createArticleSchema(
    "Line Chart - datacn",
    "Create multi-line charts with datacn. Perfect for showing trends over time with multiple data series."
  );

  return (
    <>
      <JsonLdScript schema={breadcrumbSchema} />
      <JsonLdScript schema={articleSchema} />
      <div>
        <h1 className="font-bold text-4xl tracking-tight">Line Chart</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Create multi-line charts with datacn. Perfect for showing trends over
          time with multiple data series.
        </p>
      </div>

      <LineChartDemoWrapper code={exampleCode} />
    </>
  );
}
