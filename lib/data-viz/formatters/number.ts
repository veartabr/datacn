import type { FormatOptions } from '../core/types';

export function formatNumber(
  value: number | null | undefined,
  options?: FormatOptions
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }

  const {
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 3,
    useGrouping = true,
  } = options || {};

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
      useGrouping,
    }).format(value);
  } catch {
    return value.toLocaleString(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    });
  }
}

export function formatCompactNumber(
  value: number | null | undefined,
  locale: string = 'en-US'
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }

  try {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(2)}K`;
    }
    return String(value);
  }
}
