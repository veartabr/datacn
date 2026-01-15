import type { Metadata } from "next";
import { createPageMetadata } from "@/app/metadata";
import { TimeSeriesChartDemoWrapper } from "@/components/time-series-chart-demo-wrapper";
import { CodeBlock } from "@/components/code-block";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import {
  createArticleSchema,
  createBreadcrumbListSchema,
} from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata(
  "Time Series Chart",
  "Create time series charts with automatic binning and timezone support. Perfect for temporal data visualization.",
  "/components/time-series-chart"
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
    { name: "Home", url: "/" },
    { name: "Components", url: "/components" },
    { name: "Time Series Chart", url: "/components/time-series-chart" },
  ]);

  const articleSchema = createArticleSchema(
    "Time Series Chart - datacn",
    "Create time series charts with automatic binning and timezone support. Perfect for temporal data visualization."
  );

  return (
    <>
      <JsonLdScript schema={breadcrumbSchema} />
      <JsonLdScript schema={articleSchema} />
      <div>
        <h1 className="font-bold text-4xl tracking-tight">
          Time Series Chart
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Create time series charts with automatic binning and timezone
          support. Perfect for temporal data visualization.
        </p>
      </div>

      <TimeSeriesChartDemoWrapper code={exampleCode} />
    </>
  );
}
