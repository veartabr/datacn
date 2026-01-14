# Data Visualization Library

A comprehensive, modular data visualization library with standardized data formats, timezone handling, and reusable chart components.

## Features

- **Standardized Data Format**: Consistent `ChartData` type with metadata
- **Timezone Support**: Full timezone awareness with conversion utilities
- **Data Manipulation**: Aggregation, comparison, joining, and transformation utilities
- **Chart Components**: Bar, line, area, pie, and time-series charts
- **Advanced Features**: Timestamped markers, interactive legends, date pickers
- **Formatting**: Number, currency, percentage, and date formatters
- **React Hooks**: Easy-to-use hooks for data transformation and timezone management

## Installation

```bash
npm install date-fns date-fns-tz zod recharts
```

## Quick Start

```typescript
import { normalizeData, BarChart, useChartData } from '@/lib/data-viz';

const rawData = [
  { date: '2024-01-01', revenue: 1000 },
  { date: '2024-01-02', revenue: 1200 },
];

const { data } = useChartData(rawData);

<BarChart
  data={data}
  config={{ xKey: 'date', yKey: 'revenue' }}
/>
```

## Core Concepts

### ChartData

All data is normalized into a `ChartData` structure:

```typescript
{
  data: DataPoint[];
  metadata: {
    columns: string[];
    types: Record<string, 'string' | 'number' | 'date' | 'boolean'>;
    timezone?: string;
    source?: string;
  };
}
```

### Data Normalization

```typescript
import { normalizeData } from '@/lib/data-viz';

const chartData = normalizeData(rawData);
```

### Timezone Handling

```typescript
import { useTimezone, normalizeTimezone } from '@/lib/data-viz';

const { timezone, convert, format } = useTimezone('America/New_York');
const converted = convert(date, 'UTC', 'America/New_York');
```

### Aggregation

```typescript
import { aggregate } from '@/lib/data-viz';

const aggregated = aggregate(data, {
  field: 'revenue',
  operation: 'sum',
  timeGranularity: 'day',
});
```

### Chart Components

```typescript
import { BarChart, LineChart, PieChart } from '@/lib/data-viz';

<BarChart
  data={chartData}
  config={{ xKey: 'date', yKey: 'revenue' }}
/>

<LineChart
  data={chartData}
  config={{ xKey: 'date', yKeys: ['revenue', 'users'] }}
/>

<PieChart
  data={chartData}
  config={{ dataKey: 'value', nameKey: 'category' }}
/>
```

## API Reference

See individual module documentation for detailed API references.
