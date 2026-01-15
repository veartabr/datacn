import type { ChartConfig } from "@/components/ui/chart";
import type {
  AreaChartConfig,
  BarChartConfig,
  LineChartConfig,
  PieChartConfig,
  TimeSeriesConfig,
} from "./types";

function sanitizeCssVariableName(name: string): string {
  return String(name)
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/^-+|-+$/g, "");
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }
  return Math.abs(hash).toString(36);
}

export function generateStableChartId(keys: string[]): string {
  const keyString = keys.sort().join("-");
  return `chart-${simpleHash(keyString)}`;
}

export function getColorVariable(key: string): string {
  const sanitized = sanitizeCssVariableName(key);
  return `var(--color-${sanitized})`;
}

export function createChartConfig(
  keys: string[],
  colors: string[],
  labels?: Record<string, string>
): ChartConfig {
  const config: ChartConfig = {};
  keys.forEach((key, index) => {
    config[key] = {
      label: labels?.[key] || key,
      color: colors[index % colors.length],
    };
  });
  return config;
}

export function createAreaChartConfig(
  config: AreaChartConfig,
  colors: string[]
): ChartConfig {
  return createChartConfig(config.yKeys, colors);
}

export function createBarChartConfig(
  config: BarChartConfig,
  colors: string[]
): ChartConfig {
  const color = config.color || colors[0];
  return {
    [config.yKey]: {
      label: config.yKey,
      color,
    },
  };
}

export function createLineChartConfig(
  config: LineChartConfig,
  colors: string[]
): ChartConfig {
  return createChartConfig(config.yKeys, colors);
}

export function createPieChartConfig(
  config: PieChartConfig,
  colors: string[],
  data: any[]
): ChartConfig {
  const uniqueNames = Array.from(
    new Set(data.map((entry) => entry[config.nameKey]))
  );
  return createChartConfig(uniqueNames, colors);
}

export function createTimeSeriesChartConfig(
  config: TimeSeriesConfig,
  colors: string[]
): ChartConfig {
  return createChartConfig(config.yKeys, colors);
}
