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
  "Markers",
  "Add timestamped markers and annotations to your charts with datacn. Highlight important events and milestones.",
  "/components/markers"
);

const markerCode = `import { TimestampMarker, AnnotationLayer } from '@/lib/data-viz';

const markers = [
  {
    timestamp: '2024-01-15T00:00:00Z',
    label: 'Product Launch',
    color: '#ef4444',
    type: 'line',
  },
  {
    timestamp: '2024-02-01T00:00:00Z',
    label: 'Major Update',
    color: '#3b82f6',
    type: 'annotation',
  },
];

<AnnotationLayer
  markers={markers}
  chartType="line"
  data={chartData.data}
  xKey="timestamp"
  chartWidth={800}
  chartHeight={400}
/>`;

export default function MarkersPage() {
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Components", url: "/components" },
    { name: "Markers", url: "/components/markers" },
  ]);

  const articleSchema = createArticleSchema(
    "Markers - datacn",
    "Add timestamped markers and annotations to your charts with datacn."
  );

  return (
    <>
      <JsonLdScript schema={breadcrumbSchema} />
      <JsonLdScript schema={articleSchema} />
      <div>
        <h1 className="font-bold text-4xl tracking-tight">Markers</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Add timestamped markers and annotations to your charts with
          datacn. Highlight important events and milestones.
        </p>
      </div>

      <ComponentDemoWrapper
        title="Timestamped Markers"
        description="Add vertical lines, dots, or annotation boxes to highlight events"
        code={markerCode}
        data={[
          {
            timestamp: "2024-01-15T00:00:00Z",
            label: "Product Launch",
            color: "#ef4444",
            type: "line",
          },
          {
            timestamp: "2024-02-01T00:00:00Z",
            label: "Major Update",
            color: "#3b82f6",
            type: "annotation",
          },
        ]}
      />
    </>
  );
}
