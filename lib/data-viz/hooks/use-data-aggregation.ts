import { useMemo } from "react";
import type { AggregationConfig, ChartData } from "../core/types";
import { aggregate } from "../data/aggregators";

export function useDataAggregation(
  data: ChartData,
  config: AggregationConfig | null | undefined
) {
  return useMemo(() => {
    if (!(config && data) || data.data.length === 0) {
      return {
        aggregated: data,
        loading: false,
        error: null,
      };
    }

    try {
      const aggregated = aggregate(data, config);
      return {
        aggregated,
        loading: false,
        error: null,
      };
    } catch (error) {
      return {
        aggregated: data,
        loading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      };
    }
  }, [data, config]);
}
