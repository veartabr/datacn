"use client";

import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { copyToClipboard } from "@/lib/utils/copy-to-clipboard";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "typescript",
  className,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn("group relative", className)}>
      <div className="absolute top-2 right-2 z-10">
        <Button
          aria-label="Copy code"
          className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleCopy}
          size="icon"
          variant="ghost"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <SyntaxHighlighter
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          padding: "1rem",
          fontSize: "0.875rem",
        }}
        language={language}
        lineNumberStyle={{
          minWidth: "3em",
          paddingRight: "1em",
          color: isDark ? "#6b7280" : "#9ca3af",
        }}
        showLineNumbers={showLineNumbers}
        style={isDark ? vscDarkPlus : vs}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
