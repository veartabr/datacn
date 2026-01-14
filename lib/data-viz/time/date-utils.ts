import type { DataPoint, TimeSeriesDataPoint } from '../core/types';

export function parseDate(value: Date | string | null | undefined): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'string') {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
}

export function normalizeDate(date: Date | string | null | undefined): Date | null {
  return parseDate(date);
}

export function isDateValue(value: unknown): value is Date | string {
  return value instanceof Date || 
         (typeof value === 'string' && !isNaN(Date.parse(value)));
}

export function extractTimestamp(data: DataPoint): Date | null {
  if (data.timestamp) {
    return parseDate(data.timestamp);
  }
  
  for (const key in data) {
    if (key.toLowerCase().includes('timestamp') || 
        key.toLowerCase().includes('date') ||
        key.toLowerCase().includes('time')) {
      const value = data[key];
      if (isDateValue(value)) {
        return parseDate(value);
      }
    }
  }
  
  return null;
}

export function formatDateString(date: Date, format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}
