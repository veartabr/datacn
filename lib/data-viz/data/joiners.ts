import type { ChartData, JoinConfig, DataPoint, TimeSeriesDataPoint } from '../core/types';
import { parseDate } from '../time/date-utils';

export function joinData(left: ChartData, right: ChartData, config: JoinConfig): ChartData {
  const { type, leftKey, rightKey } = config;

  if (!left.metadata.columns.includes(leftKey)) {
    throw new Error(`Left key "${leftKey}" not found in left data`);
  }

  if (!right.metadata.columns.includes(rightKey)) {
    throw new Error(`Right key "${rightKey}" not found in right data`);
  }

  const rightMap = new Map<string | number, DataPoint[]>();
  for (const point of right.data) {
    const key = point[rightKey];
    if (key === null || key === undefined) continue;
    if (!rightMap.has(key)) {
      rightMap.set(key, []);
    }
    rightMap.get(key)!.push(point);
  }

  const result: DataPoint[] = [];
  const leftMatched = new Set<string | number>();

  for (const leftPoint of left.data) {
    const key = leftPoint[leftKey];
    if (key === null || key === undefined) {
      if (type === 'left' || type === 'full') {
        result.push({ ...leftPoint });
      }
      continue;
    }

    const rightMatches = rightMap.get(key) || [];
    leftMatched.add(key);

    if (rightMatches.length === 0) {
      if (type === 'left' || type === 'full') {
        result.push({ ...leftPoint });
      }
    } else {
      for (const rightPoint of rightMatches) {
        const joined: DataPoint = { ...leftPoint };
        for (const key in rightPoint) {
          if (key !== config.rightKey) {
            joined[key] = rightPoint[key];
          }
        }
        result.push(joined);
      }
    }
  }

  if (type === 'right' || type === 'full') {
    for (const [key, rightPoints] of rightMap) {
      if (!leftMatched.has(key)) {
        for (const rightPoint of rightPoints) {
          result.push({ ...rightPoint });
        }
      }
    }
  }

  const columns = new Set<string>([...left.metadata.columns, ...right.metadata.columns]);
  const types: Record<string, 'string' | 'number' | 'date' | 'boolean'> = {
    ...left.metadata.types,
    ...right.metadata.types,
  };

  return {
    data: result,
    metadata: {
      columns: Array.from(columns),
      types,
      timezone: left.metadata.timezone || right.metadata.timezone,
      source: [left.metadata.source, right.metadata.source].filter(Boolean).join(', ') || undefined,
    },
  };
}

export function mergeTimeSeries(
  ...series: TimeSeriesDataPoint[][]
): TimeSeriesDataPoint[] {
  if (series.length === 0) return [];
  if (series.length === 1) return series[0];

  const allPoints: TimeSeriesDataPoint[] = [];
  for (const s of series) {
    allPoints.push(...s);
  }

  const timeMap = new Map<string, TimeSeriesDataPoint>();

  for (const point of allPoints) {
    const timestamp = parseDate(point.timestamp);
    if (!timestamp) continue;

    const key = timestamp.toISOString();
    if (!timeMap.has(key)) {
      timeMap.set(key, { ...point });
    } else {
      const existing = timeMap.get(key)!;
      for (const field in point) {
        if (field !== 'timestamp' && field !== 'timezone') {
          existing[field] = point[field];
        }
      }
    }
  }

  const merged = Array.from(timeMap.values());
  merged.sort((a, b) => {
    const aTime = parseDate(a.timestamp);
    const bTime = parseDate(b.timestamp);
    if (!aTime || !bTime) return 0;
    return aTime.getTime() - bTime.getTime();
  });

  return merged;
}
