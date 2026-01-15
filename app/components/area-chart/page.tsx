import type { Metadata } from "next";
import { createPageMetadata } from "@/app/metadata";
import { AreaChartDemoWrapper } from "@/components/area-chart-demo-wrapper";
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
      <div>
        <h1 className="font-bold text-4xl tracking-tight">Area Chart</h1>
      </div>

      <AreaChartDemoWrapper code={exampleCode} />
    </>
  );
}
