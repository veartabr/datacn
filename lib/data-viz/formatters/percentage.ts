export function formatPercentage(
  value: number | null | undefined,
  decimals = 2
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "";
  }

  return `${value.toFixed(decimals)}%`;
}

export function formatPercentageFromDecimal(
  value: number | null | undefined,
  decimals = 2
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "";
  }

  return formatPercentage(value * 100, decimals);
}
