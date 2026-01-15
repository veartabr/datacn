import { format as dateFnsFormat } from "date-fns";
import { fromZonedTime, toZonedTime, format as tzFormat } from "date-fns-tz";
import { DEFAULT_TIMEZONE } from "../core/constants";
import type { DataPoint, TimeSeriesDataPoint } from "../core/types";
import { parseDate } from "./date-utils";

export function normalizeTimezone(
  date: Date | string,
  fromTz: string,
  toTz: string
): Date {
  const dateObj = parseDate(date);
  if (!dateObj) {
    throw new Error("Invalid date provided to normalizeTimezone");
  }

  if (fromTz === toTz) {
    return dateObj;
  }

  try {
    if (fromTz === "UTC" || fromTz === "GMT") {
      return toZonedTime(dateObj, toTz);
    }

    if (toTz === "UTC" || toTz === "GMT") {
      return fromZonedTime(dateObj, fromTz);
    }

    const utcDate = fromZonedTime(dateObj, fromTz);
    return toZonedTime(utcDate, toTz);
  } catch (error) {
    console.warn(
      `Timezone conversion failed: ${error}. Returning original date.`
    );
    return dateObj;
  }
}

export function detectTimezone(data: DataPoint[]): string | null {
  if (data.length === 0) {
    return null;
  }

  for (const point of data) {
    if (point.timezone && typeof point.timezone === "string") {
      return point.timezone;
    }
  }

  return null;
}

export function groupByTimezone(
  data: TimeSeriesDataPoint[],
  tz: string
): TimeSeriesDataPoint[] {
  return data.map((point) => {
    const timestamp = parseDate(point.timestamp);
    if (!timestamp) {
      return point;
    }

    const normalizedTimestamp = normalizeTimezone(
      timestamp,
      point.timezone || DEFAULT_TIMEZONE,
      tz
    );

    return {
      ...point,
      timestamp: normalizedTimestamp,
      timezone: tz,
    };
  });
}

export function formatWithTimezone(
  date: Date | string,
  tz: string,
  format = "yyyy-MM-dd HH:mm:ss"
): string {
  const dateObj = parseDate(date);
  if (!dateObj) {
    return "";
  }

  try {
    return tzFormat(dateObj, format, { timeZone: tz });
  } catch (_error) {
    try {
      return dateFnsFormat(dateObj, format);
    } catch {
      return dateObj.toISOString();
    }
  }
}

export function getTimezoneOffset(date: Date, tz: string): number {
  try {
    const zonedDate = toZonedTime(date, tz);
    const utcDate = new Date(date.getTime());
    return zonedDate.getTime() - utcDate.getTime();
  } catch {
    return 0;
  }
}
