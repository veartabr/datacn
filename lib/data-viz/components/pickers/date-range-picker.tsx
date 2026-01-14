'use client';

import React, { useState } from 'react';
import { formatDate } from '../../formatters/date';
import { parseDate } from '../../time/date-utils';
import { subDays, subMonths, subWeeks, subYears, startOfDay, endOfDay } from 'date-fns';

export interface DateRange {
  from: Date;
  to: Date;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange: (range: DateRange) => void;
  timezone?: string;
  presets?: Array<{ label: string; range: DateRange }>;
  className?: string;
}

const DEFAULT_PRESETS = [
  {
    label: 'Last 7 days',
    getRange: () => ({
      from: startOfDay(subDays(new Date(), 6)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'Last 30 days',
    getRange: () => ({
      from: startOfDay(subDays(new Date(), 29)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'Last 3 months',
    getRange: () => ({
      from: startOfDay(subMonths(new Date(), 3)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'Last 6 months',
    getRange: () => ({
      from: startOfDay(subMonths(new Date(), 6)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: 'Last year',
    getRange: () => ({
      from: startOfDay(subYears(new Date(), 1)),
      to: endOfDay(new Date()),
    }),
  },
];

export function DateRangePicker({
  value,
  onChange,
  timezone,
  presets,
  className,
}: DateRangePickerProps) {
  const [fromDate, setFromDate] = useState<string>(
    value?.from ? formatDate(value.from, 'yyyy-MM-dd', timezone) : ''
  );
  const [toDate, setToDate] = useState<string>(
    value?.to ? formatDate(value.to, 'yyyy-MM-dd', timezone) : ''
  );

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    setFromDate(dateStr);
    const date = parseDate(dateStr);
    if (date && value) {
      onChange({ from: date, to: value.to });
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    setToDate(dateStr);
    const date = parseDate(dateStr);
    if (date && value) {
      onChange({ from: value.from, to: date });
    }
  };

  const handlePresetClick = (preset: { label: string; range: DateRange }) => {
    const range = preset.range;
    setFromDate(formatDate(range.from, 'yyyy-MM-dd', timezone));
    setToDate(formatDate(range.to, 'yyyy-MM-dd', timezone));
    onChange(range);
  };

  const presetList = presets || DEFAULT_PRESETS.map(p => ({
    label: p.label,
    range: p.getRange(),
  }));

  return (
    <div className={className}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {presetList.map((preset, index) => (
          <button
            key={index}
            onClick={() => handlePresetClick(preset)}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={handleFromChange}
            style={{
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>To:</label>
          <input
            type="date"
            value={toDate}
            onChange={handleToChange}
            style={{
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
