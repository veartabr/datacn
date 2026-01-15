import {
  ArrowRight,
  BarChart3,
  Clock,
  Database,
  Globe,
  Type,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { HomeChartPreview } from "@/components/home-chart-preview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { createBreadcrumbListSchema } from "@/lib/seo/structured-data";

export default function HomePage() {
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: "Home", url: "/" },
  ]);

  const quickStartCode = `import { BarChart, useChartData } from '@/lib/data-viz';

const rawData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
];

const { data } = useChartData(rawData);

<BarChart
  data={data}
  config={{ xKey: 'month', yKey: 'revenue' }}
/>`;

  const installationCode = "pnpm install date-fns date-fns-tz zod recharts";

  const features = [
    {
      icon: Database,
      title: "Standardized Data Formats",
      description:
        "Consistent ChartData structure with metadata for type safety and validation.",
    },
    {
      icon: Clock,
      title: "Timezone Support",
      description:
        "Full timezone awareness with conversion utilities for global applications.",
    },
    {
      icon: BarChart3,
      title: "Multiple Chart Types",
      description:
        "Bar, line, area, pie, and time-series charts with consistent API.",
    },
    {
      icon: Zap,
      title: "Data Manipulation",
      description:
        "Aggregation, comparison, joining, and transformation utilities built-in.",
    },
    {
      icon: Type,
      title: "TypeScript First",
      description:
        "Fully typed with Zod schemas for runtime validation and type safety.",
    },
    {
      icon: Globe,
      title: "Production Ready",
      description:
        "Built for performance with optimized rendering and memory management.",
    },
  ];

  return (
    <>
      <JsonLdScript schema={breadcrumbSchema} />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <section className="container py-24 sm:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="font-bold text-4xl tracking-tight sm:text-6xl">
                datacn
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-8">
                Build beautiful, timezone-aware charts with standardized data
                formats. TypeScript-first data visualization library for React.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                  <Link href="/components/bar-chart">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/components/bar-chart">View Components</Link>
                </Button>
              </div>
            </div>

            <div className="mt-16">
              <HomeChartPreview />
            </div>
          </section>

          <section className="container border-t py-24 sm:py-32">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-bold text-3xl tracking-tight sm:text-4xl">
                Features
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to build powerful data visualizations
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <feature.icon className="mb-2 h-8 w-8 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <section className="container border-t py-24 sm:py-32">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-12 text-center font-bold text-3xl tracking-tight sm:text-4xl">
                Quick Start
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="mb-4 font-semibold text-xl">Installation</h3>
                  <CodeBlock code={installationCode} language="bash" />
                </div>
                <div>
                  <h3 className="mb-4 font-semibold text-xl">Basic Usage</h3>
                  <CodeBlock code={quickStartCode} language="typescript" />
                </div>
                <div className="flex justify-center">
                  <Button asChild size="lg">
                    <Link href="/components/bar-chart">
                      View Full Documentation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="container border-t py-24 sm:py-32">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-12 font-bold text-3xl tracking-tight sm:text-4xl">
                Chart Types
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Bar Chart", href: "/components/bar-chart" },
                  { name: "Line Chart", href: "/components/line-chart" },
                  { name: "Area Chart", href: "/components/area-chart" },
                  { name: "Pie Chart", href: "/components/pie-chart" },
                  {
                    name: "Time Series",
                    href: "/components/time-series-chart",
                  },
                  { name: "Legends", href: "/components/legends" },
                  { name: "Markers", href: "/components/markers" },
                  { name: "Pickers", href: "/components/pickers" },
                ].map((chart) => (
                  <Card
                    className="transition-shadow hover:shadow-lg"
                    key={chart.name}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">
                        <Link className="hover:underline" href={chart.href}>
                          {chart.name}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
