"use client";

import type { TimestampMarker } from "../../core/types";
import { formatDate } from "../../formatters/date";
import { parseDate } from "../../time/date-utils";

export interface TimestampMarkerProps {
  marker: TimestampMarker;
  xPosition: number;
  chartHeight: number;
  timezone?: string;
}

export function TimestampMarkerComponent({
  marker,
  xPosition,
  chartHeight,
  timezone,
}: TimestampMarkerProps) {
  const timestamp = parseDate(marker.timestamp);
  const color = marker.color || "#ef4444";
  const type = marker.type || "line";

  if (type === "line") {
    return (
      <g>
        <line
          stroke={color}
          strokeDasharray="4 4"
          strokeWidth={2}
          x1={xPosition}
          x2={xPosition}
          y1={0}
          y2={chartHeight}
        />
        {marker.label && (
          <text
            fill={color}
            fontSize={12}
            fontWeight="bold"
            textAnchor="middle"
            x={xPosition}
            y={-10}
          >
            {marker.label}
          </text>
        )}
      </g>
    );
  }

  if (type === "dot") {
    return (
      <g>
        <circle
          cx={xPosition}
          cy={chartHeight / 2}
          fill={color}
          r={6}
          stroke="#fff"
          strokeWidth={2}
        />
        {marker.label && (
          <text
            fill={color}
            fontSize={12}
            fontWeight="bold"
            textAnchor="middle"
            x={xPosition}
            y={chartHeight / 2 - 15}
          >
            {marker.label}
          </text>
        )}
      </g>
    );
  }

  if (type === "annotation") {
    return (
      <g>
        <line
          opacity={0.3}
          stroke={color}
          strokeWidth={1}
          x1={xPosition}
          x2={xPosition}
          y1={0}
          y2={chartHeight}
        />
        <rect
          fill={color}
          height={40}
          opacity={0.9}
          rx={4}
          width={120}
          x={xPosition - 60}
          y={10}
        />
        <text
          fill="#fff"
          fontSize={11}
          fontWeight="bold"
          textAnchor="middle"
          x={xPosition}
          y={25}
        >
          {marker.label}
        </text>
        {timestamp && (
          <text
            fill="#fff"
            fontSize={10}
            textAnchor="middle"
            x={xPosition}
            y={40}
          >
            {formatDate(timestamp, "MMM dd, yyyy", timezone)}
          </text>
        )}
      </g>
    );
  }

  return null;
}
