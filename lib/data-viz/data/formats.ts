import type { z } from "zod";
import type { ChartData, DataPoint } from "../core/types";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}/;

function detectValueType(
  value: unknown
): "string" | "number" | "date" | "boolean" | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "boolean") {
    return "boolean";
  }
  if (typeof value === "number") {
    return "number";
  }
  if (value instanceof Date) {
    return "date";
  }
  if (typeof value === "string") {
    if (value.match(DATE_REGEX) || !Number.isNaN(Date.parse(value))) {
      return "date";
    }
    return "string";
  }
  return null;
}

export function detectColumnTypes(
  data: DataPoint[]
): Record<string, "string" | "number" | "date" | "boolean"> {
  if (data.length === 0) {
    return {};
  }

  const types: Record<string, "string" | "number" | "date" | "boolean"> = {};
  const sampleSize = Math.min(10, data.length);

  for (let i = 0; i < sampleSize; i++) {
    const point = data[i];
    for (const key in point) {
      if (!Object.hasOwn(point, key)) {
        continue;
      }
      if (key === "timestamp" || key === "timezone") {
        continue;
      }

      if (types[key]) {
        continue;
      }

      const detectedType = detectValueType(point[key]);
      if (detectedType) {
        types[key] = detectedType;
      }
    }
  }

  for (const key in types) {
    if (!types[key]) {
      types[key] = "string";
    }
  }

  return types;
}

export function normalizeData(data: any[], schema?: z.ZodSchema): ChartData {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      metadata: {
        columns: [],
        types: {},
      },
    };
  }

  let processedData = data;
  if (schema) {
    processedData = data.map((item) => schema.parse(item));
  }

  const normalized: DataPoint[] = processedData.map((item) => {
    const point: DataPoint = {};
    for (const key in item) {
      if (!Object.hasOwn(item, key)) {
        continue;
      }
      const value = item[key];
      if (value !== null && value !== undefined) {
        if (
          typeof value === "string" &&
          (key === "timestamp" || key.includes("date") || key.includes("time"))
        ) {
          const parsed = new Date(value);
          if (Number.isNaN(parsed.getTime())) {
            point[key] = value;
          } else {
            point[key] = parsed;
          }
        } else {
          point[key] = value;
        }
      }
    }
    return point;
  });

  const columns = normalized.length > 0 ? Object.keys(normalized[0]) : [];
  const types = detectColumnTypes(normalized);

  const metadata: ChartData["metadata"] = {
    columns,
    types,
  };

  if (normalized.length > 0 && normalized[0].timezone) {
    metadata.timezone = String(normalized[0].timezone);
  }

  return {
    data: normalized,
    metadata,
  };
}

export function validateChartData(data: ChartData, chartType: string): boolean {
  if (!(data?.data && Array.isArray(data.data))) {
    console.error("[validateChartData] Data is invalid: missing data array");
    return false;
  }

  if (!(data.metadata?.columns && Array.isArray(data.metadata.columns))) {
    console.error(
      "[validateChartData] Data is invalid: missing metadata.columns"
    );
    return false;
  }

  if (!data.metadata.types || typeof data.metadata.types !== "object") {
    console.error(
      "[validateChartData] Data is invalid: missing metadata.types"
    );
    return false;
  }

  if (data.data.length === 0) {
    console.warn(`[validateChartData] No data points for ${chartType} chart`);
    return false;
  }

  switch (chartType) {
    case "bar":
    case "line":
    case "area":
      if (data.metadata.columns.length < 2) {
        console.warn(
          `[validateChartData] ${chartType} chart requires at least 2 columns, got ${data.metadata.columns.length}`
        );
        return false;
      }
      return true;
    case "pie":
      if (data.metadata.columns.length < 2) {
        console.warn(
          `[validateChartData] pie chart requires at least 2 columns, got ${data.metadata.columns.length}`
        );
        return false;
      }
      return true;
    case "time-series": {
      const hasTimestamp = data.metadata.columns.some(
        (col) => col === "timestamp" || data.metadata.types[col] === "date"
      );
      if (!hasTimestamp) {
        console.warn(
          "[validateChartData] time-series chart requires a timestamp or date column"
        );
        return false;
      }
      return hasTimestamp;
    }
    default:
      return true;
  }
}

export function mergeDataSources(...sources: ChartData[]): ChartData {
  if (sources.length === 0) {
    return {
      data: [],
      metadata: {
        columns: [],
        types: {},
      },
    };
  }

  if (sources.length === 1) {
    return sources[0];
  }

  const mergedData: DataPoint[] = [];
  const allColumns = new Set<string>();
  const allTypes: Record<string, "string" | "number" | "date" | "boolean"> = {};
  const timezones = new Set<string>();

  for (const source of sources) {
    mergedData.push(...source.data);
    for (const col of source.metadata.columns) {
      allColumns.add(col);
    }
    Object.assign(allTypes, source.metadata.types);
    if (source.metadata.timezone) {
      timezones.add(source.metadata.timezone);
    }
  }

  const metadata: ChartData["metadata"] = {
    columns: Array.from(allColumns),
    types: allTypes,
  };

  if (timezones.size === 1) {
    metadata.timezone = Array.from(timezones)[0];
  }

  if (sources[0]?.metadata.source) {
    metadata.source = sources
      .map((s) => s.metadata.source)
      .filter(Boolean)
      .join(", ");
  }

  return {
    data: mergedData,
    metadata,
  };
}
