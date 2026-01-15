import { DEFAULT_TIMEZONE } from "../core/constants";
import type { ChartData, TimeSeriesDataPoint } from "../core/types";
import { binByTime } from "../data/aggregators";
import { parseDate } from "./date-utils";
import { normalizeTimezone } from "./timezone";

export function alignTimeSeries(
  series: TimeSeriesDataPoint[],
  targetTimezone: string = DEFAULT_TIMEZONE
): TimeSeriesDataPoint[] {
  return series.map((point) => {
    const timestamp = parseDate(point.timestamp);
    if (!timestamp) {
      return point;
    }

    const normalized = normalizeTimezone(
      timestamp,
      point.timezone || DEFAULT_TIMEZONE,
      targetTimezone
    );

    return {
      ...point,
      timestamp: normalized,
      timezone: targetTimezone,
    };
  });
}

function createGapPoint(
  current: TimeSeriesDataPoint,
  gapTime: Date,
  timezone: string,
  fillValue: number | null
): TimeSeriesDataPoint {
  const gapPoint: TimeSeriesDataPoint = {
    timestamp: gapTime,
    timezone,
  };

  for (const key in current) {
    if (!Object.hasOwn(current, key)) {
      continue;
    }
    if (key !== "timestamp" && key !== "timezone") {
      if (typeof current[key] === "number") {
        gapPoint[key] = fillValue;
      } else {
        gapPoint[key] = current[key];
      }
    }
  }

  return gapPoint;
}

export function fillTimeSeriesGaps(
  series: TimeSeriesDataPoint[],
  granularity: "hour" | "day" | "week" | "month" | "quarter" | "year",
  fillValue: number | null = null
): TimeSeriesDataPoint[] {
  if (series.length === 0) {
    return series;
  }

  const sorted = [...series].sort((a, b) => {
    const aTime = parseDate(a.timestamp);
    const bTime = parseDate(b.timestamp);
    if (!(aTime && bTime)) {
      return 0;
    }
    return aTime.getTime() - bTime.getTime();
  });

  const filled: TimeSeriesDataPoint[] = [];
  const timezone = sorted[0].timezone || DEFAULT_TIMEZONE;

  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];

    const currentTime = parseDate(current.timestamp);
    const nextTime = parseDate(next.timestamp);
    if (!(currentTime && nextTime)) {
      filled.push(current);
      continue;
    }

    filled.push(current);

    const gap = calculateTimeGap(currentTime, nextTime, granularity);
    if (gap > 1) {
      for (let j = 1; j < gap; j++) {
        const gapTime = addTimeGranularity(currentTime, granularity, j);
        const gapPoint = createGapPoint(current, gapTime, timezone, fillValue);
        filled.push(gapPoint);
      }
    }
  }

  filled.push(sorted.at(-1));
  return filled;
}

function calculateTimeGap(
  start: Date,
  end: Date,
  granularity: "hour" | "day" | "week" | "month" | "quarter" | "year"
): number {
  switch (granularity) {
    case "hour":
      return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    case "day":
      return Math.floor(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
    case "week":
      return Math.floor(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7)
      );
    case "month":
      return (
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth())
      );
    case "quarter": {
      const startQuarter = Math.floor(start.getMonth() / 3);
      const endQuarter = Math.floor(end.getMonth() / 3);
      return (
        (end.getFullYear() - start.getFullYear()) * 4 +
        (endQuarter - startQuarter)
      );
    }
    case "year":
      return end.getFullYear() - start.getFullYear();
    default:
      return 0;
  }
}

function addTimeGranularity(
  date: Date,
  granularity: "hour" | "day" | "week" | "month" | "quarter" | "year",
  amount: number
): Date {
  const result = new Date(date);
  switch (granularity) {
    case "hour":
      result.setHours(result.getHours() + amount);
      break;
    case "day":
      result.setDate(result.getDate() + amount);
      break;
    case "week":
      result.setDate(result.getDate() + amount * 7);
      break;
    case "month":
      result.setMonth(result.getMonth() + amount);
      break;
    case "quarter":
      result.setMonth(result.getMonth() + amount * 3);
      break;
    case "year":
      result.setFullYear(result.getFullYear() + amount);
      break;
    default:
      throw new Error(`Unknown granularity: ${granularity}`);
  }
  return result;
}

export function resampleTimeSeries(
  series: TimeSeriesDataPoint[],
  granularity: "hour" | "day" | "week" | "month" | "quarter" | "year"
): ChartData {
  return binByTime(series, granularity);
}

export function extractTimeRange(series: TimeSeriesDataPoint[]): {
  start: Date | null;
  end: Date | null;
} {
  if (series.length === 0) {
    return { start: null, end: null };
  }

  let start: Date | null = null;
  let end: Date | null = null;

  for (const point of series) {
    const timestamp = parseDate(point.timestamp);
    if (!timestamp) {
      continue;
    }

    if (!start || timestamp < start) {
      start = timestamp;
    }
    if (!end || timestamp > end) {
      end = timestamp;
    }
  }

  return { start, end };
}

export function filterTimeRange(
  series: TimeSeriesDataPoint[],
  start: Date,
  end: Date
): TimeSeriesDataPoint[] {
  return series.filter((point) => {
    const timestamp = parseDate(point.timestamp);
    if (!timestamp) {
      return false;
    }
    return timestamp >= start && timestamp <= end;
  });
}
