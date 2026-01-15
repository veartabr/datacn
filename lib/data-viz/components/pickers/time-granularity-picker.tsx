"use client";

import { TIME_GRANULARITIES } from "../../core/constants";

export type TimeGranularity =
  | "hour"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year";

export interface TimeGranularityPickerProps {
  value: TimeGranularity;
  onChange: (granularity: TimeGranularity) => void;
  className?: string;
  variant?: "dropdown" | "buttons";
}

export function TimeGranularityPicker({
  value,
  onChange,
  className,
  variant = "buttons",
}: TimeGranularityPickerProps) {
  if (variant === "dropdown") {
    return (
      <select
        className={className}
        onChange={(e) => onChange(e.target.value as TimeGranularity)}
        style={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        value={value}
      >
        {TIME_GRANULARITIES.map((granularity) => (
          <option key={granularity} value={granularity}>
            {granularity.charAt(0).toUpperCase() + granularity.slice(1)}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div
      className={className}
      style={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
      }}
    >
      {TIME_GRANULARITIES.map((granularity) => (
        <button
          key={granularity}
          onClick={() => onChange(granularity)}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: value === granularity ? "#007bff" : "#fff",
            color: value === granularity ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          {granularity.charAt(0).toUpperCase() + granularity.slice(1)}
        </button>
      ))}
    </div>
  );
}
