'use client';

import React from 'react';
import { DEFAULT_COLORS } from '../../core/constants';

export interface LegendItem {
  label: string;
  color: string;
  icon?: React.ReactNode;
}

export interface ChartLegendProps {
  items: LegendItem[];
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function ChartLegend({ items, className, orientation = 'horizontal' }: ChartLegendProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {item.icon || (
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
                borderRadius: '2px',
              }}
            />
          )}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
