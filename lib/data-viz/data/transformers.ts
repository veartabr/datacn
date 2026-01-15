import type { ChartData, DataPoint } from "../core/types";

export function filterData(
  data: ChartData,
  predicate: (point: DataPoint) => boolean
): ChartData {
  return {
    data: data.data.filter(predicate),
    metadata: data.metadata,
  };
}

function compareValues(
  aVal: unknown,
  bVal: unknown,
  direction: "asc" | "desc"
): number {
  if (aVal === null || aVal === undefined) {
    return direction === "asc" ? -1 : 1;
  }
  if (bVal === null || bVal === undefined) {
    return direction === "asc" ? 1 : -1;
  }

  if (typeof aVal === "number" && typeof bVal === "number") {
    return direction === "asc" ? aVal - bVal : bVal - aVal;
  }

  if (aVal instanceof Date && bVal instanceof Date) {
    return direction === "asc"
      ? aVal.getTime() - bVal.getTime()
      : bVal.getTime() - aVal.getTime();
  }

  const aStr = String(aVal);
  const bStr = String(bVal);
  return direction === "asc"
    ? aStr.localeCompare(bStr)
    : bStr.localeCompare(aStr);
}

export function sortData(
  data: ChartData,
  key: string,
  direction: "asc" | "desc" = "asc"
): ChartData {
  const sorted = [...data.data].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    return compareValues(aVal, bVal, direction);
  });

  return {
    data: sorted,
    metadata: data.metadata,
  };
}

export function selectColumns(data: ChartData, columns: string[]): ChartData {
  const selected = data.data.map((point) => {
    const selectedPoint: DataPoint = {};
    for (const col of columns) {
      if (col in point) {
        selectedPoint[col] = point[col];
      }
    }
    return selectedPoint;
  });

  const types: Record<string, "string" | "number" | "date" | "boolean"> = {};
  for (const col of columns) {
    if (col in data.metadata.types) {
      types[col] = data.metadata.types[col];
    }
  }

  return {
    data: selected,
    metadata: {
      columns: columns.filter((col) => data.metadata.columns.includes(col)),
      types,
      timezone: data.metadata.timezone,
      source: data.metadata.source,
    },
  };
}

export function renameColumn(
  data: ChartData,
  oldName: string,
  newName: string
): ChartData {
  const renamed = data.data.map((point) => {
    const renamedPoint: DataPoint = { ...point };
    if (oldName in renamedPoint) {
      renamedPoint[newName] = renamedPoint[oldName];
      delete renamedPoint[oldName];
    }
    return renamedPoint;
  });

  const columns = data.metadata.columns.map((col) =>
    col === oldName ? newName : col
  );
  const types: Record<string, "string" | "number" | "date" | "boolean"> = {};
  for (const col of columns) {
    if (col === newName && oldName in data.metadata.types) {
      types[col] = data.metadata.types[oldName];
    } else if (col in data.metadata.types) {
      types[col] = data.metadata.types[col];
    }
  }

  return {
    data: renamed,
    metadata: {
      columns,
      types,
      timezone: data.metadata.timezone,
      source: data.metadata.source,
    },
  };
}

export function addCalculatedColumn(
  data: ChartData,
  newColumn: string,
  calculate: (point: DataPoint) => string | number | Date | null
): ChartData {
  const transformed = data.data.map((point) => ({
    ...point,
    [newColumn]: calculate(point),
  }));

  const columns = [...data.metadata.columns];
  if (!columns.includes(newColumn)) {
    columns.push(newColumn);
  }

  const sampleValue = transformed.length > 0 ? transformed[0][newColumn] : null;
  const types = { ...data.metadata.types };
  if (sampleValue !== null && sampleValue !== undefined) {
    if (typeof sampleValue === "number") {
      types[newColumn] = "number";
    } else if (sampleValue instanceof Date) {
      types[newColumn] = "date";
    } else if (typeof sampleValue === "boolean") {
      types[newColumn] = "boolean";
    } else {
      types[newColumn] = "string";
    }
  }

  return {
    data: transformed,
    metadata: {
      columns,
      types,
      timezone: data.metadata.timezone,
      source: data.metadata.source,
    },
  };
}

export function limitData(data: ChartData, limit: number): ChartData {
  return {
    data: data.data.slice(0, limit),
    metadata: data.metadata,
  };
}

export function offsetData(data: ChartData, offset: number): ChartData {
  return {
    data: data.data.slice(offset),
    metadata: data.metadata,
  };
}

export function pivotData(
  data: ChartData,
  indexColumn: string,
  valueColumn: string,
  columns?: string[]
): ChartData {
  const indexValues = new Set<string>();
  const pivotMap = new Map<
    string,
    Map<string, string | number | Date | null>
  >();

  for (const point of data.data) {
    const indexValue = String(point[indexColumn] ?? "");
    indexValues.add(indexValue);

    if (!pivotMap.has(indexValue)) {
      pivotMap.set(indexValue, new Map());
    }

    const row = pivotMap.get(indexValue);
    if (row) {
      const columnName = columns ? String(point[columns[0]] ?? "") : "value";
      row.set(columnName, point[valueColumn] ?? null);
    }
  }

  const result: DataPoint[] = [];
  const resultColumns = new Set<string>([indexColumn]);

  for (const [indexValue, row] of pivotMap) {
    const resultPoint: DataPoint = { [indexColumn]: indexValue };
    for (const [col, value] of row) {
      resultPoint[col] = value;
      resultColumns.add(col);
    }
    result.push(resultPoint);
  }

  const types: Record<string, "string" | "number" | "date" | "boolean"> = {
    [indexColumn]: data.metadata.types[indexColumn] || "string",
  };

  for (const col of resultColumns) {
    if (col !== indexColumn) {
      types[col] = data.metadata.types[valueColumn] || "string";
    }
  }

  return {
    data: result,
    metadata: {
      columns: Array.from(resultColumns),
      types,
      timezone: data.metadata.timezone,
      source: data.metadata.source,
    },
  };
}
