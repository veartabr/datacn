export function formatPercentage(
  value: number | null | undefined,
  decimals: number = 2
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }

  return `${value.toFixed(decimals)}%`;
}

export function formatPercentageFromDecimal(
  value: number | null | undefined,
  decimals: number = 2
): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }

  return formatPercentage(value * 100, decimals);
}
