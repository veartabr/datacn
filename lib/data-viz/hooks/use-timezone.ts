import { useState, useMemo, useEffect } from 'react';
import { normalizeTimezone, formatWithTimezone } from '../time/timezone';
import { DEFAULT_TIMEZONE } from '../core/constants';

export function useTimezone(initialTimezone?: string) {
  const [timezone, setTimezone] = useState<string>(() => {
    if (initialTimezone) return initialTimezone;
    
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return DEFAULT_TIMEZONE;
    }
  });

  const convert = useMemo(() => {
    return (date: Date | string, fromTz: string, toTz?: string) => {
      return normalizeTimezone(date, fromTz, toTz || timezone);
    };
  }, [timezone]);

  const format = useMemo(() => {
    return (date: Date | string, format: string = 'yyyy-MM-dd HH:mm:ss') => {
      return formatWithTimezone(date, timezone, format);
    };
  }, [timezone]);

  return {
    timezone,
    setTimezone,
    convert,
    format,
  };
}
