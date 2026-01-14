'use client';

import React from 'react';
import type { TimestampMarker } from '../../core/types';
import { TimestampMarkerComponent } from './timestamp-marker';
import { parseDate } from '../../time/date-utils';

export interface AnnotationLayerProps {
  markers: TimestampMarker[];
  chartType: 'bar' | 'line' | 'area' | 'pie' | 'time-series';
  data: any[];
  xKey: string;
  chartWidth: number;
  chartHeight: number;
  xScale?: (value: any) => number;
  timezone?: string;
}

export function AnnotationLayer({
  markers,
  chartType,
  data,
  xKey,
  chartWidth,
  chartHeight,
  xScale,
  timezone,
}: AnnotationLayerProps) {
  if (markers.length === 0 || chartType === 'pie') {
    return null;
  }

  const calculateXPosition = (marker: TimestampMarker): number | null => {
    const markerTime = parseDate(marker.timestamp);
    if (!markerTime) return null;

    if (xScale) {
      return xScale(markerTime);
    }

    if (data.length === 0) return null;

    const dataTimes = data.map((d) => {
      const time = parseDate(d[xKey] || d.timestamp);
      return time ? time.getTime() : null;
    }).filter((t): t is number => t !== null);

    if (dataTimes.length === 0) return null;

    const minTime = Math.min(...dataTimes);
    const maxTime = Math.max(...dataTimes);
    const markerTimeMs = markerTime.getTime();

    if (markerTimeMs < minTime || markerTimeMs > maxTime) {
      return null;
    }

    const ratio = (markerTimeMs - minTime) / (maxTime - minTime);
    return ratio * chartWidth;
  };

  return (
    <g>
      {markers.map((marker, index) => {
        const xPosition = calculateXPosition(marker);
        if (xPosition === null) return null;

        return (
          <TimestampMarkerComponent
            key={index}
            marker={marker}
            xPosition={xPosition}
            chartHeight={chartHeight}
            timezone={timezone}
          />
        );
      })}
    </g>
  );
}
