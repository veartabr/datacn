import { subYears } from "date-fns";
import type { ChartData, ComparisonConfig, DataPoint } from "../core/types";
import { parseDate } from "../time/date-utils";

export function comparePeriods(
  data: ChartData,
  config: ComparisonConfig
): ChartData {
  const { type, baseField, period } = config;

  if (!data.metadata.columns.includes(baseField)) {
    throw new Error(`Base field "${baseField}" not found in data`);
  }

  switch (type) {
    case "year-over-year":
      return yearOverYear(data, baseField);
    case "month-over-month":
      return monthOverMonth(data, baseField);
    case "period-over-period":
      return periodOverPeriod(data, baseField, period);
    default:
      throw new Error(`Unknown comparison type: ${type}`);
  }
}

export function calculateGrowthRate(
  data: ChartData,
  field: string,
  period: number
): number {
  if (data.data.length < 2) {
    return 0;
  }

  const sorted = [...data.data].sort((a, b) => {
    const aTime = parseDate(a.timestamp);
    const bTime = parseDate(b.timestamp);
    if (!(aTime && bTime)) {
      return 0;
    }
    return aTime.getTime() - bTime.getTime();
  });

  const current = sorted.at(-1);
  const previous = sorted[Math.max(0, sorted.length - 1 - period)];

  const currentValue = typeof current[field] === "number" ? current[field] : 0;
  const previousValue =
    typeof previous[field] === "number" ? previous[field] : 0;

  if (previousValue === 0) {
    return currentValue > 0 ? 100 : 0;
  }

  return ((currentValue - previousValue) / previousValue) * 100;
}

function findMatchingPreviousPoint(
  currentTimestamp: Date,
  previousPoints: DataPoint[],
  field: string
): { point: DataPoint; value: number } | null {
  const previousTimestamp = subYears(currentTimestamp, 1);
  const matchingPrevious = previousPoints.find((p) => {
    const pTime = parseDate(p.timestamp);
    if (!pTime) {
      return false;
    }
    return (
      pTime.getMonth() === previousTimestamp.getMonth() &&
      pTime.getDate() === previousTimestamp.getDate()
    );
  });

  if (!matchingPrevious) {
    return null;
  }

  const previousValue =
    typeof matchingPrevious[field] === "number" ? matchingPrevious[field] : 0;

  return { point: matchingPrevious, value: previousValue };
}

function calculateComparison(
  currentValue: number,
  previousValue: number
): { change: number; changePercent: number } {
  const change = currentValue - previousValue;
  const changePercent =
    previousValue !== 0 ? (change / previousValue) * 100 : 0;
  return { change, changePercent };
}

export function yearOverYear(data: ChartData, field: string): ChartData {
  if (data.data.length === 0) {
    return data;
  }

  const sorted = [...data.data].sort((a, b) => {
    const aTime = parseDate(a.timestamp);
    const bTime = parseDate(b.timestamp);
    if (!(aTime && bTime)) {
      return 0;
    }
    return aTime.getTime() - bTime.getTime();
  });

  const result: DataPoint[] = [];
  const yearMap = new Map<number, DataPoint[]>();

  for (const point of sorted) {
    const timestamp = parseDate(point.timestamp);
    if (!timestamp) {
      continue;
    }

    const year = timestamp.getFullYear();
    if (!yearMap.has(year)) {
      yearMap.set(year, []);
    }
    yearMap.get(year)?.push(point);
  }

  const years = Array.from(yearMap.keys()).sort();
  if (years.length < 2) {
    return data;
  }

  for (let i = 1; i < years.length; i++) {
    const currentYear = years[i];
    const previousYear = years[i - 1];

    const currentPoints = yearMap.get(currentYear);
    const previousPoints = yearMap.get(previousYear);
    if (!(currentPoints && previousPoints)) {
      continue;
    }

    for (const currentPoint of currentPoints) {
      const currentTimestamp = parseDate(currentPoint.timestamp);
      if (!currentTimestamp) {
        continue;
      }

      const match = findMatchingPreviousPoint(
        currentTimestamp,
        previousPoints,
        field
      );
      if (!match) {
        continue;
      }

      const currentValue =
        typeof currentPoint[field] === "number" ? currentPoint[field] : 0;
      const { change, changePercent } = calculateComparison(
        currentValue,
        match.value
      );

      result.push({
        ...currentPoint,
        [`${field}_previous`]: match.value,
        [`${field}_change`]: change,
        [`${field}_changePercent`]: changePercent,
      });
    }
  }

  const columns = [...data.metadata.columns];
  columns.push(
    `${field}_previous`,
    `${field}_change`,
    `${field}_changePercent`
  );

  const types = { ...data.metadata.types };
  types[`${field}_previous`] = "number";
  types[`${field}_change`] = "number";
  types[`${field}_changePercent`] = "number";

  return {
    data: result,
    metadata: {
      columns,
      types,
      timezone: data.metadata.timezone,
      source: data.metadata.source,
    },
  };
}

function monthOverMonth(data: ChartData, field: string): ChartData {
  if (data.data.length === 0) {
    return data;
  }

  const sorted = [...data.data].sort((a, b) => {
    const aTime = parseDate(a.timestamp);
    const bTime = parseDate(b.timestamp);
    if (!(aTime && bTime)) {
      return 0;
    }
    return aTime.getTime() - bTime.getTime();
  });

  const result: typeof data.data = [];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const previous = sorted[i - 1];

    const currentTimestamp = parseDate(current.timestamp);
    const previousTimestamp = parseDate(previous.timestamp);

    if (!(currentTimestamp && previousTimestamp)) {
      continue;
    }

    const monthDiff =
      (currentTimestamp.getFullYear() - previousTimestamp.getFullYear()) * 12 +
      (currentTimestamp.getMonth() - previousTimestamp.getMonth());

    if (monthDiff === 1) {
      const currentValue =
        typeof current[field] === "number" ? current[field] : 0;
      const previousValue =
        typeof previous[field] === "number" ? previous[field] : 0;
      const change = currentValue - previousValue;
      const changePercent =
        previousValue !== 0 ? (change / previousValue) * 100 : 0;

      result.push({
        ...current,
        [`${field}_previous`]: previousValue,
        [`${field}_change`]: change,
        [`${field}_changePercent`]: changePercent,
      });
    }
  }

  const columns = [...data.metadata.columns];
  columns.push(
    `${field}_previous`,
    `${field}_change`,
    `${field}_changePercent`
  );

  const types = { ...data.metadata.types };
  types[`${field}_previous`] = "number";
  types[`${field}_change`] = "number";
  types[`${field}_changePercent`] = "number";

  return {
    data: result,
    metadata: {
      columns,
      types,
      timezone: data.metadata.timezone,
      source: data.metadata.source,
    },
  };
}

function periodOverPeriod(
  data: ChartData,
  field: string,
  period: number
): ChartData {
  if (data.data.length === 0) {
    return data;
  }

  const sorted = [...data.data].sort((a, b) => {
    const aTime = parseDate(a.timestamp);
    const bTime = parseDate(b.timestamp);
    if (!(aTime && bTime)) {
      return 0;
    }
    return aTime.getTime() - bTime.getTime();
  });

  const result: typeof data.data = [];

  for (let i = period; i < sorted.length; i++) {
    const current = sorted[i];
    const previous = sorted[i - period];

    const currentValue =
      typeof current[field] === "number" ? current[field] : 0;
    const previousValue =
      typeof previous[field] === "number" ? previous[field] : 0;
    const change = currentValue - previousValue;
    const changePercent =
      previousValue !== 0 ? (change / previousValue) * 100 : 0;

    result.push({
      ...current,
      [`${field}_previous`]: previousValue,
      [`${field}_change`]: change,
      [`${field}_changePercent`]: changePercent,
    });
  }

  const columns = [...data.metadata.columns];
  columns.push(
    `${field}_previous`,
    `${field}_change`,
    `${field}_changePercent`
  );

  const types = { ...data.metadata.types };
  types[`${field}_previous`] = "number";
  types[`${field}_change`] = "number";
  types[`${field}_changePercent`] = "number";

  return {
    data: result,
    metadata: {
      columns,
      types,
      timezone: data.metadata.timezone,
      source: data.metadata.source,
    },
  };
}
