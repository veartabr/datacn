import { z } from 'zod';
import type { DataPoint, ChartData } from '../core/types';

export function detectColumnTypes(data: DataPoint[]): Record<string, 'string' | 'number' | 'date' | 'boolean'> {
  if (data.length === 0) return {};

  const types: Record<string, 'string' | 'number' | 'date' | 'boolean'> = {};
  const sampleSize = Math.min(10, data.length);

  for (let i = 0; i < sampleSize; i++) {
    const point = data[i];
    for (const key in point) {
      if (key === 'timestamp' || key === 'timezone') continue;

      const value = point[key];
      
      if (types[key]) continue;

      if (value === null || value === undefined) {
        continue;
      }

      if (typeof value === 'boolean') {
        types[key] = 'boolean';
      } else if (typeof value === 'number') {
        types[key] = 'number';
      } else if (value instanceof Date) {
        types[key] = 'date';
      } else if (typeof value === 'string') {
        if (value.match(/^\d{4}-\d{2}-\d{2}/) || !isNaN(Date.parse(value))) {
          types[key] = 'date';
        } else {
          types[key] = 'string';
        }
      }
    }
  }

  for (const key in types) {
    if (!types[key]) {
      types[key] = 'string';
    }
  }

  return types;
}

export function normalizeData(
  data: any[],
  schema?: z.ZodSchema
): ChartData {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      data: [],
      metadata: {
        columns: [],
        types: {},
      },
    };
  }

  if (schema) {
    const parsed = data.map(item => schema.parse(item));
    data = parsed;
  }

  const normalized: DataPoint[] = data.map((item) => {
    const point: DataPoint = {};
    for (const key in item) {
      const value = item[key];
      if (value !== null && value !== undefined) {
        if (typeof value === 'string' && (key === 'timestamp' || key.includes('date') || key.includes('time'))) {
          const parsed = new Date(value);
          if (!isNaN(parsed.getTime())) {
            point[key] = parsed;
          } else {
            point[key] = value;
          }
        } else {
          point[key] = value;
        }
      }
    }
    return point;
  });

  const columns = normalized.length > 0 ? Object.keys(normalized[0]) : [];
  const types = detectColumnTypes(normalized);

  const metadata: ChartData['metadata'] = {
    columns,
    types,
  };

  if (normalized.length > 0 && normalized[0].timezone) {
    metadata.timezone = String(normalized[0].timezone);
  }

  return {
    data: normalized,
    metadata,
  };
}

export function validateChartData(data: ChartData, chartType: string): boolean {
  if (!data || !data.data || !Array.isArray(data.data)) {
    console.error(`[validateChartData] Data is invalid: missing data array`);
    return false;
  }
  
  if (!data.metadata || !data.metadata.columns || !Array.isArray(data.metadata.columns)) {
    console.error(`[validateChartData] Data is invalid: missing metadata.columns`);
    return false;
  }
  
  if (!data.metadata.types || typeof data.metadata.types !== 'object') {
    console.error(`[validateChartData] Data is invalid: missing metadata.types`);
    return false;
  }
  
  if (data.data.length === 0) {
    console.warn(`[validateChartData] No data points for ${chartType} chart`);
    return false;
  }

  switch (chartType) {
    case 'bar':
    case 'line':
    case 'area':
      if (data.metadata.columns.length < 2) {
        console.warn(`[validateChartData] ${chartType} chart requires at least 2 columns, got ${data.metadata.columns.length}`);
        return false;
      }
      return true;
    case 'pie':
      if (data.metadata.columns.length < 2) {
        console.warn(`[validateChartData] pie chart requires at least 2 columns, got ${data.metadata.columns.length}`);
        return false;
      }
      return true;
    case 'time-series':
      const hasTimestamp = data.metadata.columns.some(col => 
        col === 'timestamp' || data.metadata.types[col] === 'date'
      );
      if (!hasTimestamp) {
        console.warn(`[validateChartData] time-series chart requires a timestamp or date column`);
        return false;
      }
      return hasTimestamp;
    default:
      return true;
  }
}

export function mergeDataSources(...sources: ChartData[]): ChartData {
  if (sources.length === 0) {
    return {
      data: [],
      metadata: {
        columns: [],
        types: {},
      },
    };
  }

  if (sources.length === 1) {
    return sources[0];
  }

  const mergedData: DataPoint[] = [];
  const allColumns = new Set<string>();
  const allTypes: Record<string, 'string' | 'number' | 'date' | 'boolean'> = {};
  const timezones = new Set<string>();

  for (const source of sources) {
    mergedData.push(...source.data);
    source.metadata.columns.forEach(col => allColumns.add(col));
    Object.assign(allTypes, source.metadata.types);
    if (source.metadata.timezone) {
      timezones.add(source.metadata.timezone);
    }
  }

  const metadata: ChartData['metadata'] = {
    columns: Array.from(allColumns),
    types: allTypes,
  };

  if (timezones.size === 1) {
    metadata.timezone = Array.from(timezones)[0];
  }

  if (sources[0]?.metadata.source) {
    metadata.source = sources.map(s => s.metadata.source).filter(Boolean).join(', ');
  }

  return {
    data: mergedData,
    metadata,
  };
}
