import { format as dateFnsFormat } from 'date-fns';
import { formatWithTimezone } from '../time/timezone';
import { parseDate } from '../time/date-utils';
import { DEFAULT_TIMEZONE } from '../core/constants';

export function formatDate(
  value: Date | string | null | undefined,
  format: string = 'yyyy-MM-dd',
  timezone?: string
): string {
  const date = parseDate(value);
  if (!date) return '';

  if (timezone) {
    return formatWithTimezone(date, timezone, format);
  }

  try {
    return dateFnsFormat(date, format);
  } catch {
    return date.toISOString();
  }
}

export function formatDateTime(
  value: Date | string | null | undefined,
  timezone?: string
): string {
  return formatDate(value, 'yyyy-MM-dd HH:mm:ss', timezone);
}

export function formatTime(
  value: Date | string | null | undefined,
  timezone?: string
): string {
  return formatDate(value, 'HH:mm:ss', timezone);
}

export function formatRelativeTime(
  value: Date | string | null | undefined
): string {
  const date = parseDate(value);
  if (!date) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return 'just now';
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  } else if (diffDay < 7) {
    return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
  } else {
    return formatDate(date);
  }
}
