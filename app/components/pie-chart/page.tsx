import type { Metadata } from "next";
import { createPageMetadata } from "@/app/metadata";
import { PieChartDemoWrapper } from "@/components/pie-chart-demo-wrapper";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import {
  createArticleSchema,
  createBreadcrumbListSchema,
} from "@/lib/seo/structured-data";

export const metadata: Metadata = createPageMetadata(
  "Pie Chart",
  "Create beautiful pie charts with datacn. Perfect for showing proportional data and category distributions.",
  "/components/pie-chart"
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
    { name: "Home", url: "/" },
    { name: "Components", url: "/components" },
    { name: "Pie Chart", url: "/components/pie-chart" },
  ]);

  const articleSchema = createArticleSchema(
    "Pie Chart - datacn",
    "Create beautiful pie charts with datacn. Perfect for showing proportional data and category distributions."
  );

  return (
    <>
      <JsonLdScript schema={breadcrumbSchema} />
      <JsonLdScript schema={articleSchema} />
      <div>
        <h1 className="font-bold text-4xl tracking-tight">Pie Chart</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Create beautiful pie charts with datacn. Perfect for showing
          proportional data and category distributions.
        </p>
      </div>

      <PieChartDemoWrapper code={exampleCode} />
    </>
  );
}
