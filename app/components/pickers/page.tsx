import type { Metadata } from "next";
import { createPageMetadata } from "@/app/metadata";
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
  "Pickers",
  "Date range pickers and time granularity selectors for filtering and controlling chart data with datacn.",
  "/components/pickers"
);

const dateRangePickerCode = `import { DateRangePicker } from '@/lib/data-viz';

const [dateRange, setDateRange] = useState({
  from: new Date('2024-01-01'),
  to: new Date('2024-01-31'),
});

<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
  timezone="UTC"
/>`;

const granularityPickerCode = `import { TimeGranularityPicker } from '@/lib/data-viz';

const [granularity, setGranularity] = useState<'day' | 'week' | 'month'>('day');

<TimeGranularityPicker
  value={granularity}
  onChange={setGranularity}
  variant="buttons"
/>`;

export default function PickersPage() {
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "Components", url: "/components" },
    { name: "Pickers", url: "/components/pickers" },
  ]);

  const articleSchema = createArticleSchema(
    "Pickers - datacn",
    "Date range pickers and time granularity selectors for filtering and controlling chart data."
  );

  return (
    <>
      <JsonLdScript schema={breadcrumbSchema} />
      <JsonLdScript schema={articleSchema} />
      <div>
        <h1 className="font-bold text-4xl tracking-tight">Pickers</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Date range pickers and time granularity selectors for filtering
          and controlling chart data with datacn.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Date Range Picker</CardTitle>
          <CardDescription>
            Select date ranges with preset options and timezone support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock code={dateRangePickerCode} language="typescript" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Granularity Picker</CardTitle>
          <CardDescription>
            Select time granularity for time series charts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock code={granularityPickerCode} language="typescript" />
        </CardContent>
      </Card>
    </>
  );
}
