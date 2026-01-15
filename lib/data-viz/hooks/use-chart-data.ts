import { useMemo } from "react";
import { DEFAULT_TIMEZONE } from "../core/constants";
import type {
  AggregationConfig,
  ChartData,
  ComparisonConfig,
} from "../core/types";
import { aggregate } from "../data/aggregators";
import { comparePeriods } from "../data/comparators";
import { normalizeData } from "../data/formats";
import { normalizeTimezone } from "../time/timezone";

export interface UseChartDataOptions {
  aggregation?: AggregationConfig;
  comparison?: ComparisonConfig;
  timezone?: string;
  normalize?: boolean;
}

export function useChartData(rawData: any[], options?: UseChartDataOptions) {
  return useMemo(() => {
    if (!rawData || rawData.length === 0) {
      return {
        data: {
          data: [],
          metadata: {
            columns: [],
            types: {},
          },
        } as ChartData,
        loading: false,
        error: null,
      };
    }

    try {
      let chartData: ChartData = normalizeData(rawData);

      if (options?.timezone) {
        const timezone = options.timezone;
        if (
          chartData.metadata.timezone &&
          chartData.metadata.timezone !== timezone
        ) {
          chartData = {
            ...chartData,
            data: chartData.data.map((point) => {
              if (point.timestamp) {
                const normalized = normalizeTimezone(
                  point.timestamp,
                  chartData.metadata.timezone || DEFAULT_TIMEZONE,
                  timezone
                );
                return {
                  ...point,
                  timestamp: normalized,
                  timezone,
                };
              }
              return point;
            }),
            metadata: {
              ...chartData.metadata,
              timezone,
            },
          };
        }
      }

      if (options?.aggregation) {
        chartData = aggregate(chartData, options.aggregation);
      }

      if (options?.comparison) {
        chartData = comparePeriods(chartData, options.comparison);
      }

      return {
        data: chartData,
        loading: false,
        error: null,
      };
    } catch (error) {
      return {
        data: {
          data: [],
          metadata: {
            columns: [],
            types: {},
          },
        } as ChartData,
        loading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      };
    }
  }, [rawData, options?.aggregation, options?.comparison, options?.timezone]);
}
