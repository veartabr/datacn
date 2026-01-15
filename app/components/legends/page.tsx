import type { Metadata } from "next";
import { createPageMetadata } from "@/app/metadata";
import { ComponentDemoWrapper } from "@/components/component-demo-wrapper";
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
      <div>
        <h1 className="font-bold text-4xl tracking-tight">Legends</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Create interactive and static legends for your charts with datacn.
          Toggle series visibility and customize appearance.
        </p>
      </div>

      <ComponentDemoWrapper
        title="Chart Legend"
        description="Static legend component"
        code={chartLegendCode}
        data={[
          { label: "Revenue", color: "hsl(var(--chart-1))" },
          { label: "Users", color: "hsl(var(--chart-2))" },
        ]}
        className="mb-6"
      />

      <ComponentDemoWrapper
        title="Interactive Legend"
        description="Legend with toggle functionality"
        code={interactiveLegendCode}
        data={[
          { label: "Revenue", color: "hsl(var(--chart-1))", visible: true },
          { label: "Users", color: "hsl(var(--chart-2))", visible: true },
        ]}
      />
    </>
  );
}
