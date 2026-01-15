"use client";

import { ChevronDown, ChevronUp, Code2, Database } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

interface ChartDemoProps {
  title?: string;
  description?: string;
  chart: React.ReactNode;
  data?: unknown;
  config?: unknown;
  code?: string;
  className?: string;
}

export function ChartDemo({
  title,
  description,
  chart,
  data,
  config,
  code,
  className,
}: ChartDemoProps) {
  const [showData, setShowData] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showCode, setShowCode] = useState(false);

  return (
    <Card className={cn("w-full", className)}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        <div className="rounded-lg border bg-background p-4">
          <div className="h-[400px] w-full">{chart}</div>
        </div>

        {(data || config || code) && (
          <div className="space-y-2">
            {data && (
              <div>
                <Button
                  className="w-full justify-between"
                  onClick={() => setShowData(!showData)}
                  size="sm"
                  variant="outline"
                >
                  <span className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Sample Data
                  </span>
                  {showData ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                {showData && (
                  <div className="mt-2 rounded-md border bg-muted p-4">
                    <pre className="overflow-x-auto text-xs">
                      {JSON.stringify(data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {config && (
              <div>
                <Button
                  className="w-full justify-between"
                  onClick={() => setShowConfig(!showConfig)}
                  size="sm"
                  variant="outline"
                >
                  <span className="flex items-center gap-2">
                    <Code2 className="h-4 w-4" />
                    Configuration
                  </span>
                  {showConfig ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                {showConfig && (
                  <div className="mt-2 rounded-md border bg-muted p-4">
                    <pre className="overflow-x-auto text-xs">
                      {JSON.stringify(config, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {code && (
              <div>
                <Button
                  className="w-full justify-between"
                  onClick={() => setShowCode(!showCode)}
                  size="sm"
                  variant="outline"
                >
                  <span className="flex items-center gap-2">
                    <Code2 className="h-4 w-4" />
                    Code
                  </span>
                  {showCode ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                {showCode && <div className="mt-2">{code}</div>}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
