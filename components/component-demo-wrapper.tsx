"use client";

import { CodeBlock } from "@/components/code-block";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ComponentDemoWrapperProps {
  title?: string;
  description?: string;
  preview?: React.ReactNode;
  code: string;
  data?: unknown;
  className?: string;
}

export function ComponentDemoWrapper({
  title,
  description,
  preview,
  code,
  data,
  className,
}: ComponentDemoWrapperProps) {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="data">Data as a table</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4">
            {preview ? (
              <div className="rounded-lg border bg-background p-4">
                {preview}
              </div>
            ) : (
              <div className="rounded-lg border bg-background p-4">
                <p className="text-muted-foreground text-sm">
                  Preview not available
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="data" className="mt-4">
            {data ? (
              <div className="rounded-md border bg-muted p-4">
                <pre className="overflow-x-auto text-xs">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="rounded-lg border bg-background p-4">
                <p className="text-muted-foreground text-sm">
                  No data available
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <CodeBlock code={code} language="typescript" />
        </div>
      </CardContent>
    </Card>
  );
}
