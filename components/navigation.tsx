"use client";

import {
  AreaChart,
  BarChart3,
  Calendar,
  Clock,
  Home,
  Info,
  LineChart,
  PieChart,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  {
    name: "Components",
    children: [
      { name: "Bar Chart", href: "/components/bar-chart", icon: BarChart3 },
      { name: "Line Chart", href: "/components/line-chart", icon: LineChart },
      { name: "Area Chart", href: "/components/area-chart", icon: AreaChart },
      { name: "Pie Chart", href: "/components/pie-chart", icon: PieChart },
      {
        name: "Time Series",
        href: "/components/time-series-chart",
        icon: Clock,
      },
      { name: "Legends", href: "/components/legends", icon: Tag },
      { name: "Markers", href: "/components/markers", icon: Info },
      { name: "Pickers", href: "/components/pickers", icon: Calendar },
    ],
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 hidden h-screen w-64 space-y-4 overflow-y-auto border-r bg-muted/40 p-4 lg:block">
      <div className="space-y-1">
        {navigation.map((item) => {
          if (item.children) {
            return (
              <div className="space-y-1" key={item.name}>
                <div className="px-3 py-2 font-semibold text-muted-foreground text-sm">
                  {item.name}
                </div>
                {item.children.map((child) => {
                  const isActive = pathname === child.href;
                  return (
                    <Link
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                      href={child.href}
                      key={child.name}
                    >
                      <child.icon className="h-4 w-4" />
                      {child.name}
                    </Link>
                  );
                })}
              </div>
            );
          }
          const isActive = pathname === item.href;
          return (
            <Link
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
              href={item.href}
              key={item.name}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
