export type ColorSchemeId =
  | "default"
  | "blue"
  | "green"
  | "red"
  | "purple"
  | "orange";

export interface ColorScheme {
  id: ColorSchemeId;
  name: string;
  colors: string[];
}

export const COLOR_SCHEMES: ColorScheme[] = [
  {
    id: "default",
    name: "Default",
    colors: [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ],
  },
  {
    id: "blue",
    name: "Blue",
    colors: [
      "hsl(217, 91%, 60%)",
      "hsl(217, 91%, 50%)",
      "hsl(217, 91%, 40%)",
      "hsl(217, 91%, 70%)",
      "hsl(217, 91%, 30%)",
    ],
  },
  {
    id: "green",
    name: "Green",
    colors: [
      "hsl(142, 71%, 45%)",
      "hsl(142, 71%, 35%)",
      "hsl(142, 71%, 55%)",
      "hsl(142, 71%, 25%)",
      "hsl(142, 71%, 65%)",
    ],
  },
  {
    id: "red",
    name: "Red",
    colors: [
      "hsl(0, 84%, 60%)",
      "hsl(0, 84%, 50%)",
      "hsl(0, 84%, 40%)",
      "hsl(0, 84%, 70%)",
      "hsl(0, 84%, 30%)",
    ],
  },
  {
    id: "purple",
    name: "Purple",
    colors: [
      "hsl(262, 83%, 58%)",
      "hsl(262, 83%, 48%)",
      "hsl(262, 83%, 68%)",
      "hsl(262, 83%, 38%)",
      "hsl(262, 83%, 78%)",
    ],
  },
  {
    id: "orange",
    name: "Orange",
    colors: [
      "hsl(25, 95%, 53%)",
      "hsl(25, 95%, 43%)",
      "hsl(25, 95%, 63%)",
      "hsl(25, 95%, 33%)",
      "hsl(25, 95%, 73%)",
    ],
  },
];

export function getColorScheme(id: ColorSchemeId): ColorScheme {
  return COLOR_SCHEMES.find((scheme) => scheme.id === id) || COLOR_SCHEMES[0];
}
