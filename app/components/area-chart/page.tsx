import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/app/metadata";
import { AreaChartDemo } from "@/components/area-chart-demo";
import { CodeBlock } from "@/components/code-block";
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
  "Area Chart",
  "Create stacked or overlapping area charts with datacn. Great for showing cumulative values over time.",
  "/components/area-chart"
);

const exampleCode = `'use client';

import { AreaChart, useChartData } from '@/lib/data-viz';

const rawData = [
  { month: 'Q1', sales: 12000, expenses: 8000 },
  { month: 'Q2', sales: 15000, expenses: 9000 },
];

export function MyAreaChart() {
  const { data } = useChartData(rawData);

  return (
    <AreaChart
      data={data}
      config={{
        xKey: 'month',
        yKeys: ['sales', 'expenses'],
        stacked: true,
      }}
    />
  );
}`;

export default function AreaChartPage() {
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Components", url: "/components" },
    { name: "Area Chart", url: "/components/area-chart" },
  ]);

  const articleSchema = createArticleSchema(
    "Area Chart - datacn",
    "Create stacked or overlapping area charts with datacn. Great for showing cumulative values over time."
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
            <h1 className="font-bold text-4xl tracking-tight">Area Chart</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create stacked or overlapping area charts with datacn. Great for
              showing cumulative values over time.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-semibold text-2xl tracking-tight">
              Example
            </h2>
            <AreaChartDemo />
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
