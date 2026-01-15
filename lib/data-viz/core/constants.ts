export const DEFAULT_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export const CHART_COLORS = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  accent: "hsl(var(--chart-3))",
  muted: "hsl(var(--chart-4))",
  destructive: "hsl(var(--chart-5))",
};

export const DEFAULT_TIMEZONE = "UTC";

export const TIME_GRANULARITIES = [
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year",
] as const;

export const AGGREGATION_OPERATIONS = [
  "sum",
  "avg",
  "count",
  "min",
  "max",
  "median",
] as const;

export const CHART_TYPES = [
  "bar",
  "line",
  "area",
  "pie",
  "time-series",
] as const;

export const DEFAULT_STROKE_WIDTH = 2;

export const DEFAULT_CURVE = "monotone" as const;
