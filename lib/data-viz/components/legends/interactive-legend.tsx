'use client';

import React, { useState, useCallback } from 'react';
import { ChartLegend, LegendItem } from './chart-legend';

export interface InteractiveLegendProps {
  items: LegendItem[];
  onToggle?: (label: string, visible: boolean) => void;
  onItemClick?: (label: string) => void;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function InteractiveLegend({
  items,
  onToggle,
  onItemClick,
  className,
  orientation = 'horizontal',
}: InteractiveLegendProps) {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(
    new Set(items.map(item => item.label))
  );

  const handleToggle = useCallback(
    (label: string) => {
      const newVisible = new Set(visibleItems);
      if (newVisible.has(label)) {
        newVisible.delete(label);
      } else {
        newVisible.add(label);
      }
      setVisibleItems(newVisible);
      onToggle?.(label, newVisible.has(label));
    },
    [visibleItems, onToggle]
  );

  const handleClick = useCallback(
    (label: string) => {
      onItemClick?.(label);
    },
    [onItemClick]
  );

  const visibleItemsList = items.filter(item => visibleItems.has(item.label));

  return (
    <div className={className}>
      <ChartLegend items={visibleItemsList} orientation={orientation} />
      <div
        style={{
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
          gap: '0.5rem',
          marginTop: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        {items.map((item) => {
          const isVisible = visibleItems.has(item.label);
          return (
            <button
              key={item.label}
              onClick={() => {
                handleToggle(item.label);
                handleClick(item.label);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.25rem 0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: isVisible ? '#fff' : '#f0f0f0',
                cursor: 'pointer',
                opacity: isVisible ? 1 : 0.5,
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: item.color,
                  borderRadius: '2px',
                }}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
