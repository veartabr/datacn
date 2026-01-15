import type { ChartData, TimeSeriesDataPoint } from "@/lib/data-viz/core/types";

export const barChartData: ChartData = {
  data: [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4500 },
    { month: "May", revenue: 6000 },
    { month: "Jun", revenue: 5500 },
  ],
  metadata: {
    columns: ["month", "revenue"],
    types: {
      month: "string",
      revenue: "number",
    },
  },
};

export const lineChartData: ChartData = {
  data: [
    { date: "2024-01-01", users: 100, revenue: 5000 },
    { date: "2024-01-02", users: 120, revenue: 6000 },
    { date: "2024-01-03", users: 110, revenue: 5500 },
    { date: "2024-01-04", users: 140, revenue: 7000 },
    { date: "2024-01-05", users: 130, revenue: 6500 },
    { date: "2024-01-06", users: 150, revenue: 7500 },
    { date: "2024-01-07", users: 160, revenue: 8000 },
  ],
  metadata: {
    columns: ["date", "users", "revenue"],
    types: {
      date: "date",
      users: "number",
      revenue: "number",
    },
  },
};

export const areaChartData: ChartData = {
  data: [
    { month: "Q1", sales: 12_000, expenses: 8000 },
    { month: "Q2", sales: 15_000, expenses: 9000 },
    { month: "Q3", sales: 18_000, expenses: 10_000 },
    { month: "Q4", sales: 20_000, expenses: 11_000 },
  ],
  metadata: {
    columns: ["month", "sales", "expenses"],
    types: {
      month: "string",
      sales: "number",
      expenses: "number",
    },
  },
};

export const pieChartData: ChartData = {
  data: [
    { category: "Desktop", value: 45 },
    { category: "Mobile", value: 30 },
    { category: "Tablet", value: 15 },
    { category: "Other", value: 10 },
  ],
  metadata: {
    columns: ["category", "value"],
    types: {
      category: "string",
      value: "number",
    },
  },
};

export const timeSeriesData: TimeSeriesDataPoint[] = [
  {
    timestamp: "2024-01-01T00:00:00Z",
    timezone: "UTC",
    temperature: 20,
    humidity: 65,
  },
  {
    timestamp: "2024-01-01T06:00:00Z",
    timezone: "UTC",
    temperature: 18,
    humidity: 70,
  },
  {
    timestamp: "2024-01-01T12:00:00Z",
    timezone: "UTC",
    temperature: 25,
    humidity: 60,
  },
  {
    timestamp: "2024-01-01T18:00:00Z",
    timezone: "UTC",
    temperature: 22,
    humidity: 68,
  },
  {
    timestamp: "2024-01-02T00:00:00Z",
    timezone: "UTC",
    temperature: 19,
    humidity: 72,
  },
  {
    timestamp: "2024-01-02T06:00:00Z",
    timezone: "UTC",
    temperature: 17,
    humidity: 75,
  },
  {
    timestamp: "2024-01-02T12:00:00Z",
    timezone: "UTC",
    temperature: 24,
    humidity: 62,
  },
  {
    timestamp: "2024-01-02T18:00:00Z",
    timezone: "UTC",
    temperature: 21,
    humidity: 70,
  },
];

export const monthlyRevenueData: ChartData = {
  data: [
    { month: "January", revenue: 45_000, profit: 12_000 },
    { month: "February", revenue: 52_000, profit: 15_000 },
    { month: "March", revenue: 48_000, profit: 13_000 },
    { month: "April", revenue: 61_000, profit: 18_000 },
    { month: "May", revenue: 55_000, profit: 16_000 },
    { month: "June", revenue: 67_000, profit: 20_000 },
  ],
  metadata: {
    columns: ["month", "revenue", "profit"],
    types: {
      month: "string",
      revenue: "number",
      profit: "number",
    },
  },
};

export const userGrowthData: ChartData = {
  data: [
    { date: "2024-01-01", activeUsers: 1200, newUsers: 150 },
    { date: "2024-01-08", activeUsers: 1350, newUsers: 180 },
    { date: "2024-01-15", activeUsers: 1500, newUsers: 200 },
    { date: "2024-01-22", activeUsers: 1650, newUsers: 220 },
    { date: "2024-01-29", activeUsers: 1800, newUsers: 250 },
  ],
  metadata: {
    columns: ["date", "activeUsers", "newUsers"],
    types: {
      date: "date",
      activeUsers: "number",
      newUsers: "number",
    },
  },
};

export const productDistributionData: ChartData = {
  data: [
    { product: "Product A", sales: 35 },
    { product: "Product B", sales: 28 },
    { product: "Product C", sales: 20 },
    { product: "Product D", sales: 12 },
    { product: "Product E", sales: 5 },
  ],
  metadata: {
    columns: ["product", "sales"],
    types: {
      product: "string",
      sales: "number",
    },
  },
};
