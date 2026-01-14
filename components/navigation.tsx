'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  AreaChart, 
  Clock,
  Info,
  Tag,
  Calendar,
  Home
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  {
    name: 'Components',
    children: [
      { name: 'Bar Chart', href: '/components/bar-chart', icon: BarChart3 },
      { name: 'Line Chart', href: '/components/line-chart', icon: LineChart },
      { name: 'Area Chart', href: '/components/area-chart', icon: AreaChart },
      { name: 'Pie Chart', href: '/components/pie-chart', icon: PieChart },
      { name: 'Time Series', href: '/components/time-series-chart', icon: Clock },
      { name: 'Legends', href: '/components/legends', icon: Tag },
      { name: 'Markers', href: '/components/markers', icon: Info },
      { name: 'Pickers', href: '/components/pickers', icon: Calendar },
    ],
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block w-64 border-r bg-muted/40 p-4 space-y-4 sticky top-0 h-screen overflow-y-auto">
      <div className="space-y-1">
        {navigation.map((item) => {
          if (item.children) {
            return (
              <div key={item.name} className="space-y-1">
                <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">
                  {item.name}
                </div>
                {item.children.map((child) => {
                  const isActive = pathname === child.href;
                  return (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      )}
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
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
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
