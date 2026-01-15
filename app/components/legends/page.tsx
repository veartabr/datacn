import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/app/metadata";
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
  "Legends",
  "Create interactive and static legends for your charts with datacn. Toggle series visibility and customize appearance.",
  "/components/legends"
);

const chartLegendCode = `import { ChartLegend } from '@/lib/data-viz';

const items = [
  { label: 'Revenue', color: 'hsl(var(--chart-1))' },
  { label: 'Users', color: 'hsl(var(--chart-2))' },
];

<ChartLegend items={items} orientation="horizontal" />`;

const interactiveLegendCode = `import { InteractiveLegend } from '@/lib/data-viz';

const items = [
  { label: 'Revenue', color: 'hsl(var(--chart-1))' },
  { label: 'Users', color: 'hsl(var(--chart-2))' },
];

<InteractiveLegend
  items={items}
  onToggle={(label, visible) => {
    console.log(\`\${label} is now \${visible ? 'visible' : 'hidden'}\`);
  }}
/>`;

export default function LegendsPage() {
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Components", url: "/components" },
    { name: "Legends", url: "/components/legends" },
  ]);

  const articleSchema = createArticleSchema(
    "Legends - datacn",
    "Create interactive and static legends for your charts with datacn."
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
            <h1 className="font-bold text-4xl tracking-tight">Legends</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create interactive and static legends for your charts with datacn.
              Toggle series visibility and customize appearance.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Chart Legend</CardTitle>
              <CardDescription>Static legend component</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={chartLegendCode} language="typescript" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Legend</CardTitle>
              <CardDescription>
                Legend with toggle functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={interactiveLegendCode} language="typescript" />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
