'use client';

import React from 'react';
import type { TimestampMarker } from '../../core/types';
import { parseDate } from '../../time/date-utils';
import { formatDate } from '../../formatters/date';

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
  const color = marker.color || '#ef4444';
  const type = marker.type || 'line';

  if (type === 'line') {
    return (
      <g>
        <line
          x1={xPosition}
          y1={0}
          x2={xPosition}
          y2={chartHeight}
          stroke={color}
          strokeWidth={2}
          strokeDasharray="4 4"
        />
        {marker.label && (
          <text
            x={xPosition}
            y={-10}
            fill={color}
            fontSize={12}
            textAnchor="middle"
            fontWeight="bold"
          >
            {marker.label}
          </text>
        )}
      </g>
    );
  }

  if (type === 'dot') {
    return (
      <g>
        <circle
          cx={xPosition}
          cy={chartHeight / 2}
          r={6}
          fill={color}
          stroke="#fff"
          strokeWidth={2}
        />
        {marker.label && (
          <text
            x={xPosition}
            y={chartHeight / 2 - 15}
            fill={color}
            fontSize={12}
            textAnchor="middle"
            fontWeight="bold"
          >
            {marker.label}
          </text>
        )}
      </g>
    );
  }

  if (type === 'annotation') {
    return (
      <g>
        <line
          x1={xPosition}
          y1={0}
          x2={xPosition}
          y2={chartHeight}
          stroke={color}
          strokeWidth={1}
          opacity={0.3}
        />
        <rect
          x={xPosition - 60}
          y={10}
          width={120}
          height={40}
          fill={color}
          opacity={0.9}
          rx={4}
        />
        <text
          x={xPosition}
          y={25}
          fill="#fff"
          fontSize={11}
          textAnchor="middle"
          fontWeight="bold"
        >
          {marker.label}
        </text>
        {timestamp && (
          <text
            x={xPosition}
            y={40}
            fill="#fff"
            fontSize={10}
            textAnchor="middle"
          >
            {formatDate(timestamp, 'MMM dd, yyyy', timezone)}
          </text>
        )}
      </g>
    );
  }

  return null;
}
