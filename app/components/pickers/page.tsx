import type { Metadata } from "next";
import { createPageMetadata } from "@/app/metadata";
import { ComponentDemoWrapper } from "@/components/component-demo-wrapper";
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
          Date range pickers and time granularity selectors for filtering and
          controlling chart data with datacn.
        </p>
      </div>

      <ComponentDemoWrapper
        className="mb-6"
        code={dateRangePickerCode}
        data={{
          example: {
            from: "2024-01-01",
            to: "2024-01-31",
            timezone: "UTC",
          },
        }}
        description="Select date ranges with preset options and timezone support"
        title="Date Range Picker"
      />

      <ComponentDemoWrapper
        code={granularityPickerCode}
        data={{
          options: ["day", "week", "month", "quarter", "year"],
          default: "day",
        }}
        description="Select time granularity for time series charts"
        title="Time Granularity Picker"
      />
    </>
  );
}
