import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/code-block';
import { createPageMetadata } from '@/app/metadata';
import { createBreadcrumbListSchema, createArticleSchema } from '@/lib/seo/structured-data';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = createPageMetadata(
  'Markers',
  'Add timestamped markers and annotations to your charts with datacn. Highlight important events and milestones.',
  '/components/markers'
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
    { name: 'Home', url: '/' },
    { name: 'Components', url: '/components' },
    { name: 'Markers', url: '/components/markers' },
  ]);

  const articleSchema = createArticleSchema(
    'Markers - datacn',
    'Add timestamped markers and annotations to your charts with datacn.'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container py-8">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Markers</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Add timestamped markers and annotations to your charts with datacn.
              Highlight important events and milestones.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Timestamped Markers</CardTitle>
              <CardDescription>
                Add vertical lines, dots, or annotation boxes to highlight events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={markerCode} language="typescript" />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
