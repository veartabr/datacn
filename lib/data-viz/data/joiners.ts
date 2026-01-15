import type {
  ChartData,
  DataPoint,
  JoinConfig,
  TimeSeriesDataPoint,
} from "../core/types";
import { parseDate } from "../time/date-utils";

function buildRightMap(
  right: ChartData,
  rightKey: string
): Map<string | number, DataPoint[]> {
  const rightMap = new Map<string | number, DataPoint[]>();
  for (const point of right.data) {
    const key = point[rightKey];
    if (key === null || key === undefined) {
      continue;
    }
    if (!rightMap.has(key)) {
      rightMap.set(key, []);
    }
    rightMap.get(key)?.push(point);
  }
  return rightMap;
}

function performLeftJoin(
  left: ChartData,
  rightMap: Map<string | number, DataPoint[]>,
  leftKey: string,
  rightKey: string,
  type: JoinConfig["type"]
): { result: DataPoint[]; leftMatched: Set<string | number> } {
  const result: DataPoint[] = [];
  const leftMatched = new Set<string | number>();

  for (const leftPoint of left.data) {
    const key = leftPoint[leftKey];
    if (key === null || key === undefined) {
      if (type === "left" || type === "full") {
        result.push({ ...leftPoint });
      }
      continue;
    }

    const rightMatches = rightMap.get(key) || [];
    leftMatched.add(key);

    if (rightMatches.length === 0) {
      if (type === "left" || type === "full") {
        result.push({ ...leftPoint });
      }
    } else {
      for (const rightPoint of rightMatches) {
        const joined: DataPoint = { ...leftPoint };
        for (const key in rightPoint) {
          if (!Object.hasOwn(rightPoint, key)) {
            continue;
          }
          if (key !== rightKey) {
            joined[key] = rightPoint[key];
          }
        }
        result.push(joined);
      }
    }
  }

  return { result, leftMatched };
}

function performRightJoin(
  rightMap: Map<string | number, DataPoint[]>,
  leftMatched: Set<string | number>,
  type: JoinConfig["type"],
  result: DataPoint[]
): void {
  if (type !== "right" && type !== "full") {
    return;
  }

  for (const [key, rightPoints] of rightMap) {
    if (!leftMatched.has(key)) {
      for (const rightPoint of rightPoints) {
        result.push({ ...rightPoint });
      }
    }
  }
}

export function joinData(
  left: ChartData,
  right: ChartData,
  config: JoinConfig
): ChartData {
  const { type, leftKey, rightKey } = config;

  if (!left.metadata.columns.includes(leftKey)) {
    throw new Error(`Left key "${leftKey}" not found in left data`);
  }

  if (!right.metadata.columns.includes(rightKey)) {
    throw new Error(`Right key "${rightKey}" not found in right data`);
  }

  const rightMap = buildRightMap(right, rightKey);
  const { result, leftMatched } = performLeftJoin(
    left,
    rightMap,
    leftKey,
    rightKey,
    type
  );
  performRightJoin(rightMap, leftMatched, type, result);

  const columns = new Set<string>([
    ...left.metadata.columns,
    ...right.metadata.columns,
  ]);
  const types: Record<string, "string" | "number" | "date" | "boolean"> = {
    ...left.metadata.types,
    ...right.metadata.types,
  };

  return {
    data: result,
    metadata: {
      columns: Array.from(columns),
      types,
      timezone: left.metadata.timezone || right.metadata.timezone,
      source:
        [left.metadata.source, right.metadata.source]
          .filter(Boolean)
          .join(", ") || undefined,
    },
  };
}

export function mergeTimeSeries(
  ...series: TimeSeriesDataPoint[][]
): TimeSeriesDataPoint[] {
  if (series.length === 0) {
    return [];
  }
  if (series.length === 1) {
    return series[0];
  }

  const allPoints: TimeSeriesDataPoint[] = [];
  for (const s of series) {
    allPoints.push(...s);
  }

  const timeMap = new Map<string, TimeSeriesDataPoint>();

  for (const point of allPoints) {
    const timestamp = parseDate(point.timestamp);
    if (!timestamp) {
      continue;
    }

    const key = timestamp.toISOString();
    const existing = timeMap.get(key);
    if (existing) {
      for (const field in point) {
        if (!Object.hasOwn(point, field)) {
          continue;
        }
        if (field !== "timestamp" && field !== "timezone") {
          existing[field] = point[field];
        }
      }
    } else {
      timeMap.set(key, { ...point });
    }
  }

  const merged = Array.from(timeMap.values());
  merged.sort((a, b) => {
    const aTime = parseDate(a.timestamp);
    const bTime = parseDate(b.timestamp);
    if (!(aTime && bTime)) {
      return 0;
    }
    return aTime.getTime() - bTime.getTime();
  });

  return merged;
}
