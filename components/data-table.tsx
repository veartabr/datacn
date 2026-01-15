"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ChartData, DataPoint, TimeSeriesDataPoint } from "@/lib/data-viz/core/types";
import { parseDate } from "@/lib/data-viz/time/date-utils";

interface DataTableProps {
  rawData?: DataPoint[] | TimeSeriesDataPoint[];
  processedData?: ChartData;
  className?: string;
}

function formatValue(value: unknown, type?: string): string {
  if (value === null || value === undefined) {
    return "-";
  }

  if (type === "date" || value instanceof Date) {
    const date = typeof value === "string" ? parseDate(value) : value;
    if (date) {
      return date.toLocaleDateString();
    }
    return String(value);
  }

  if (typeof value === "number") {
    return new Intl.NumberFormat().format(value);
  }

  return String(value);
}

function DataTableContent({ data, columns }: { data: DataPoint[]; columns: string[] }) {
  if (!data || data.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="text-center text-muted-foreground">
          No data available
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((column) => (
            <TableCell key={column}>
              {formatValue(row[column])}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function DataTable({ rawData, processedData, className }: DataTableProps) {
  const [dataView, setDataView] = useState<"raw" | "processed">("raw");

  const hasBothViews = rawData && processedData;
  const displayData = dataView === "raw" && rawData ? rawData : processedData?.data || rawData || [];
  const columns =
    dataView === "processed" && processedData
      ? processedData.metadata.columns
      : rawData && rawData.length > 0
        ? Object.keys(rawData[0])
        : [];

  if (!rawData && !processedData) {
    return (
      <div className={className}>
        <p className="text-muted-foreground text-sm">No data available</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {hasBothViews && (
        <div className="mb-4 flex items-center gap-2">
          <Tabs value={dataView} onValueChange={(v) => setDataView(v as "raw" | "processed")}>
            <TabsList>
              <TabsTrigger value="raw">Raw Data</TabsTrigger>
              <TabsTrigger value="processed">Processed Data</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <DataTableContent data={displayData} columns={columns} />
          </TableBody>
        </Table>
      </div>

      {processedData && (
        <div className="mt-4 rounded-md border bg-muted/50 p-3 text-xs">
          <p className="font-medium mb-1">Metadata:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>Columns: {processedData.metadata.columns.join(", ")}</li>
            <li>
              Types:{" "}
              {Object.entries(processedData.metadata.types)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ")}
            </li>
            {processedData.metadata.timezone && (
              <li>Timezone: {processedData.metadata.timezone}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
