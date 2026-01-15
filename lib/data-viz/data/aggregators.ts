import {
  startOfDay,
  startOfHour,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
} from "date-fns";
import type {
  AggregationConfig,
  ChartData,
  DataPoint,
  TimeSeriesDataPoint,
} from "../core/types";
import { parseDate } from "../time/date-utils";

function calculateOperation(
  values: number[],
  operation: AggregationConfig["operation"]
): number {
  switch (operation) {
    case "sum":
      return values.reduce((a, b) => a + b, 0);
    case "avg":
      return values.length > 0
        ? values.reduce((a, b) => a + b, 0) / values.length
        : 0;
    case "count":
      return values.length;
    case "min":
      return values.length > 0 ? Math.min(...values) : 0;
    case "max":
      return values.length > 0 ? Math.max(...values) : 0;
    case "median": {
      const sorted = [...values].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      if (sorted.length === 0) {
        return 0;
      }
      if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
      }
      return sorted[mid];
    }
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
}

export function aggregate(
  data: ChartData,
  config: AggregationConfig
): ChartData {
  if (data.data.length === 0) {
    return data;
  }

  const { field, operation, groupBy, timeGranularity } = config;

  if (!data.metadata.columns.includes(field)) {
    throw new Error(`Field "${field}" not found in data`);
  }

  if (timeGranularity && groupBy) {
    return aggregateByTimeAndGroup(
      data,
      field,
      operation,
      groupBy,
      timeGranularity
    );
  }
  if (timeGranularity) {
    return aggregateByTime(data, field, operation, timeGranularity);
  }
  if (groupBy) {
    return aggregateByGroup(data, field, operation, groupBy);
  }
  return aggregateAll(data, field, operation);
}

function aggregateAll(
  data: ChartData,
  field: string,
  operation: AggregationConfig["operation"]
): ChartData {
  const values = data.data
    .map((point) => point[field])
    .filter((v): v is number => typeof v === "number");

  const result = calculateOperation(values, operation);

  return {
    data: [{ [field]: result }],
    metadata: {
      columns: [field],
      types: { [field]: "number" },
    },
  };
}

function aggregateByGroup(
  data: ChartData,
  field: string,
  operation: AggregationConfig["operation"],
  groupBy: string[]
): ChartData {
  const groups = new Map<string, DataPoint[]>();

  for (const point of data.data) {
    const key = groupBy.map((g) => String(point[g] || "")).join("|");
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)?.push(point);
  }

  const aggregated: DataPoint[] = [];
  const columns = new Set<string>(groupBy);
  columns.add(field);

  for (const [key, points] of groups) {
    const values = points
      .map((p) => p[field])
      .filter((v): v is number => typeof v === "number");

    const result = calculateOperation(values, operation);

    const groupValues = key.split("|");
    const aggregatedPoint: DataPoint = {};
    for (let i = 0; i < groupBy.length; i++) {
      aggregatedPoint[groupBy[i]] = groupValues[i];
    }
    aggregatedPoint[field] = result;
    aggregated.push(aggregatedPoint);
  }

  const types: Record<string, "string" | "number" | "date" | "boolean"> = {};
  for (const g of groupBy) {
    types[g] = data.metadata.types[g] || "string";
  }
  types[field] = "number";

  return {
    data: aggregated,
    metadata: {
      columns: Array.from(columns),
      types,
    },
  };
}

function aggregateByTime(
  data: ChartData,
  field: string,
  operation: AggregationConfig["operation"],
  granularity: NonNullable<AggregationConfig["timeGranularity"]>
): ChartData {
  const timeGroups = new Map<string, DataPoint[]>();

  for (const point of data.data) {
    const timestamp = parseDate(point.timestamp || point.date || point.time);
    if (!timestamp) {
      continue;
    }

    let timeKey: Date;
    switch (granularity) {
      case "hour":
        timeKey = startOfHour(timestamp);
        break;
      case "day":
        timeKey = startOfDay(timestamp);
        break;
      case "week":
        timeKey = startOfWeek(timestamp);
        break;
      case "month":
        timeKey = startOfMonth(timestamp);
        break;
      case "quarter":
        timeKey = startOfQuarter(timestamp);
        break;
      case "year":
        timeKey = startOfYear(timestamp);
        break;
      default:
        throw new Error(`Unknown granularity: ${granularity}`);
    }

    const key = timeKey.toISOString();
    if (!timeGroups.has(key)) {
      timeGroups.set(key, []);
    }
    timeGroups.get(key)?.push(point);
  }

  const aggregated: DataPoint[] = [];

  for (const [key, points] of timeGroups) {
    const values = points
      .map((p) => p[field])
      .filter((v): v is number => typeof v === "number");

    const result = calculateOperation(values, operation);

    aggregated.push({
      timestamp: new Date(key),
      [field]: result,
    });
  }

  aggregated.sort((a, b) => {
    const aTime = parseDate(a.timestamp);
    const bTime = parseDate(b.timestamp);
    if (!(aTime && bTime)) {
      return 0;
    }
    return aTime.getTime() - bTime.getTime();
  });

  return {
    data: aggregated,
    metadata: {
      columns: ["timestamp", field],
      types: {
        timestamp: "date",
        [field]: "number",
      },
    },
  };
}

function aggregateByTimeAndGroup(
  data: ChartData,
  field: string,
  operation: AggregationConfig["operation"],
  groupBy: string[],
  granularity: NonNullable<AggregationConfig["timeGranularity"]>
): ChartData {
  const groups = new Map<string, DataPoint[]>();

  for (const point of data.data) {
    const timestamp = parseDate(point.timestamp || point.date || point.time);
    if (!timestamp) {
      continue;
    }

    let timeKey: Date;
    switch (granularity) {
      case "hour":
        timeKey = startOfHour(timestamp);
        break;
      case "day":
        timeKey = startOfDay(timestamp);
        break;
      case "week":
        timeKey = startOfWeek(timestamp);
        break;
      case "month":
        timeKey = startOfMonth(timestamp);
        break;
      case "quarter":
        timeKey = startOfQuarter(timestamp);
        break;
      case "year":
        timeKey = startOfYear(timestamp);
        break;
      default:
        throw new Error(`Unknown granularity: ${granularity}`);
    }

    const groupKey = groupBy.map((g) => String(point[g] || "")).join("|");
    const key = `${timeKey.toISOString()}|${groupKey}`;

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)?.push(point);
  }

  const aggregated: DataPoint[] = [];

  for (const [key, points] of groups) {
    const [timeKey, ...groupValues] = key.split("|");
    const values = points
      .map((p) => p[field])
      .filter((v): v is number => typeof v === "number");

    const result = calculateOperation(values, operation);

    const aggregatedPoint: DataPoint = {
      timestamp: new Date(timeKey),
      [field]: result,
    };
    for (let i = 0; i < groupBy.length; i++) {
      aggregatedPoint[groupBy[i]] = groupValues[i];
    }
    aggregated.push(aggregatedPoint);
  }

  aggregated.sort((a, b) => {
    const aTime = parseDate(a.timestamp);
    const bTime = parseDate(b.timestamp);
    if (!(aTime && bTime)) {
      return 0;
    }
    return aTime.getTime() - bTime.getTime();
  });

  const columns = ["timestamp", ...groupBy, field];
  const types: Record<string, "string" | "number" | "date" | "boolean"> = {
    timestamp: "date",
    [field]: "number",
  };
  for (const g of groupBy) {
    types[g] = data.metadata.types[g] || "string";
  }

  return {
    data: aggregated,
    metadata: {
      columns,
      types,
    },
  };
}

export function groupBy(
  data: ChartData,
  fields: string[]
): Map<string, ChartData> {
  const groups = new Map<string, DataPoint[]>();

  for (const point of data.data) {
    const key = fields.map((f) => String(point[f] || "")).join("|");
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)?.push(point);
  }

  const result = new Map<string, ChartData>();
  for (const [key, points] of groups) {
    result.set(key, {
      data: points,
      metadata: data.metadata,
    });
  }

  return result;
}

export function binByTime(
  data: TimeSeriesDataPoint[],
  granularity: "hour" | "day" | "week" | "month" | "quarter" | "year"
): ChartData {
  const bins = new Map<string, TimeSeriesDataPoint[]>();

  for (const point of data) {
    const timestamp = parseDate(point.timestamp);
    if (!timestamp) {
      continue;
    }

    let binKey: Date;
    switch (granularity) {
      case "hour":
        binKey = startOfHour(timestamp);
        break;
      case "day":
        binKey = startOfDay(timestamp);
        break;
      case "week":
        binKey = startOfWeek(timestamp);
        break;
      case "month":
        binKey = startOfMonth(timestamp);
        break;
      case "quarter":
        binKey = startOfQuarter(timestamp);
        break;
      case "year":
        binKey = startOfYear(timestamp);
        break;
      default:
        throw new Error(`Unknown granularity: ${granularity}`);
    }

    const key = binKey.toISOString();
    if (!bins.has(key)) {
      bins.set(key, []);
    }
    bins.get(key)?.push(point);
  }

  const binned: DataPoint[] = [];
  for (const [key, points] of bins) {
    const aggregated: DataPoint = {
      timestamp: new Date(key),
    };

    const numericFields = new Set<string>();
    for (const point of points) {
      for (const field in point) {
        if (field === "timestamp" || field === "timezone") {
          continue;
        }
        if (typeof point[field] === "number") {
          numericFields.add(field);
        }
      }
    }

    for (const field of numericFields) {
      const values = points
        .map((p) => p[field])
        .filter((v): v is number => typeof v === "number");
      aggregated[field] = values.reduce((a, b) => a + b, 0) / values.length;
    }

    binned.push(aggregated);
  }

  binned.sort((a, b) => {
    const aTime = parseDate(a.timestamp);
    const bTime = parseDate(b.timestamp);
    if (!(aTime && bTime)) {
      return 0;
    }
    return aTime.getTime() - bTime.getTime();
  });

  const columns = binned.length > 0 ? Object.keys(binned[0]) : [];
  const types: Record<string, "string" | "number" | "date" | "boolean"> = {
    timestamp: "date",
  };
  for (const col of columns) {
    if (col !== "timestamp") {
      types[col] = "number";
    }
  }

  return {
    data: binned,
    metadata: {
      columns,
      types,
      timezone: data[0]?.timezone,
    },
  };
}
