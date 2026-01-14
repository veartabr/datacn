export function formatCurrency(
  value: number | null | undefined,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

export function formatCompactCurrency(
  value: number | null | undefined,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    if (value >= 1e9) {
      return `${currency} ${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `${currency} ${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1e3) {
      return `${currency} ${(value / 1e3).toFixed(2)}K`;
    }
    return formatCurrency(value, currency, locale);
  }
}
