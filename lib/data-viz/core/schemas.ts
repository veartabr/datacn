import { z } from "zod";

export const DataPointSchema = z
  .object({
    timestamp: z.union([z.date(), z.string()]).optional(),
    timezone: z.string().optional(),
  })
  .passthrough();

export const TimeSeriesDataPointSchema = z
  .object({
    timestamp: z.union([z.date(), z.string()]),
    timezone: z.string(),
  })
  .passthrough();

export const ChartDataSchema = z.object({
  data: z.array(DataPointSchema),
  metadata: z.object({
    columns: z.array(z.string()),
    types: z.record(z.enum(["string", "number", "date", "boolean"])),
    timezone: z.string().optional(),
    source: z.string().optional(),
  }),
});

export const AggregationConfigSchema = z.object({
  field: z.string(),
  operation: z.enum(["sum", "avg", "count", "min", "max", "median"]),
  groupBy: z.array(z.string()).optional(),
  timeGranularity: z
    .enum(["hour", "day", "week", "month", "quarter", "year"])
    .optional(),
});

export const ComparisonConfigSchema = z.object({
  type: z.enum(["period-over-period", "year-over-year", "month-over-month"]),
  baseField: z.string(),
  comparisonField: z.string(),
  period: z.number(),
});

export const JoinConfigSchema = z.object({
  type: z.enum(["inner", "left", "right", "full"]),
  leftKey: z.string(),
  rightKey: z.string(),
});

export const BarChartConfigSchema = z.object({
  xKey: z.string(),
  yKey: z.string(),
  color: z.string().optional(),
  colors: z.array(z.string()).optional(),
  stacked: z.boolean().optional(),
  horizontal: z.boolean().optional(),
});

export const LineChartConfigSchema = z.object({
  xKey: z.string(),
  yKeys: z.array(z.string()),
  colors: z.array(z.string()).optional(),
  strokeWidth: z.number().optional(),
  curve: z
    .enum(["linear", "monotone", "step", "stepBefore", "stepAfter"])
    .optional(),
});

export const AreaChartConfigSchema = z.object({
  xKey: z.string(),
  yKeys: z.array(z.string()),
  colors: z.array(z.string()).optional(),
  stacked: z.boolean().optional(),
  curve: z
    .enum(["linear", "monotone", "step", "stepBefore", "stepAfter"])
    .optional(),
});

export const PieChartConfigSchema = z.object({
  dataKey: z.string(),
  nameKey: z.string(),
  colors: z.array(z.string()).optional(),
});

export const TimeSeriesConfigSchema = z.object({
  yKeys: z.array(z.string()),
  colors: z.array(z.string()).optional(),
  granularity: z
    .enum(["hour", "day", "week", "month", "quarter", "year"])
    .optional(),
  showMarkers: z.boolean().optional(),
});

export const TimestampMarkerSchema = z.object({
  timestamp: z.union([z.date(), z.string()]),
  label: z.string(),
  color: z.string().optional(),
  type: z.enum(["line", "dot", "annotation"]).optional(),
});
