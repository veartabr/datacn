import type { Metadata } from "next";
import { createPageMetadata } from "@/app/metadata";
import { BarChartDemo } from "@/components/bar-chart-demo";
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
  "Bar Chart",
  "Create beautiful bar charts with datacn. Supports horizontal and vertical orientations, stacking, and custom colors.",
  "/components/bar-chart"
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
    { name: "Home", url: "/" },
    { name: "Components", url: "/components" },
    { name: "Bar Chart", url: "/components/bar-chart" },
  ]);

  const articleSchema = createArticleSchema(
    "Bar Chart - datacn",
    "Create beautiful bar charts with datacn. Supports horizontal and vertical orientations, stacking, and custom colors."
  );

  return (
    <>
      <JsonLdScript schema={breadcrumbSchema} />
      <JsonLdScript schema={articleSchema} />
      <div>
        <h1 className="font-bold text-4xl tracking-tight">Bar Chart</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Create beautiful bar charts with datacn. Supports horizontal and
          vertical orientations, stacking, and custom colors.
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
        <h2 className="mb-4 font-semibold text-2xl tracking-tight">
          Example
        </h2>
        <BarChartDemo />
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

      <Card>
        <CardHeader>
          <CardTitle>API Reference</CardTitle>
          <CardDescription>Props and configuration options</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock code={propsCode} language="typescript" />
        </CardContent>
      </Card>
    </>
  );
}
