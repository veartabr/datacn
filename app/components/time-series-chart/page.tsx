import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/app/metadata";
import { CodeBlock } from "@/components/code-block";
import { TimeSeriesChartDemo } from "@/components/time-series-chart-demo";
import { Button } from "@/components/ui/button";
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
      <div className="container py-8">
        <Button asChild className="mb-8" variant="ghost">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <h1 className="font-bold text-4xl tracking-tight">
              Time Series Chart
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create time series charts with automatic binning and timezone
              support. Perfect for temporal data visualization.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-semibold text-2xl tracking-tight">
              Example
            </h2>
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
