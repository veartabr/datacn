export type DataPoint = {
  [key: string]: string | number | Date | null | undefined;
  timestamp?: Date | string;
  timezone?: string;
}

export type TimeSeriesDataPoint = DataPoint & {
  timestamp: Date | string;
  timezone: string;
}

export type ChartData = {
  data: DataPoint[];
  metadata: {
    columns: string[];
    types: Record<string, 'string' | 'number' | 'date' | 'boolean'>;
    timezone?: string;
    source?: string;
  };
}

export type AggregationConfig = {
  field: string;
  operation: 'sum' | 'avg' | 'count' | 'min' | 'max' | 'median';
  groupBy?: string[];
  timeGranularity?: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
}

export type ComparisonConfig = {
  type: 'period-over-period' | 'year-over-year' | 'month-over-month';
  baseField: string;
  comparisonField: string;
  period: number;
}

export type JoinConfig = {
  type: 'inner' | 'left' | 'right' | 'full';
  leftKey: string;
  rightKey: string;
}

export type BarChartConfig = {
  xKey: string;
  yKey: string;
  color?: string;
  colors?: string[];
  stacked?: boolean;
  horizontal?: boolean;
}

export type LineChartConfig = {
  xKey: string;
  yKeys: string[];
  colors?: string[];
  strokeWidth?: number;
  curve?: 'linear' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter';
}

export type AreaChartConfig = {
  xKey: string;
  yKeys: string[];
  colors?: string[];
  stacked?: boolean;
  curve?: 'linear' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter';
}

export type PieChartConfig = {
  dataKey: string;
  nameKey: string;
  colors?: string[];
}

export type TimeSeriesConfig = {
  yKeys: string[];
  colors?: string[];
  granularity?: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
  showMarkers?: boolean;
}

export type TimestampMarker = {
  timestamp: Date | string;
  label: string;
  color?: string;
  icon?: React.ReactNode;
  type?: 'line' | 'dot' | 'annotation';
}

export type FormatOptions = {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}
