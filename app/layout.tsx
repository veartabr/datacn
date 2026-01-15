import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import {
  createSoftwareApplicationSchema,
  createWebSiteSchema,
} from "@/lib/seo/structured-data";
import { defaultMetadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareSchema = createSoftwareApplicationSchema();
  const websiteSchema = createWebSiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLdScript schema={softwareSchema} />
        <JsonLdScript schema={websiteSchema} />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <div className="flex min-h-screen">
            <Navigation />
            <div className="flex flex-1 flex-col">
              <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between px-4">
                  <Link className="font-bold text-xl" href="/">
                    datacn
                  </Link>
                  <ThemeToggle />
                </div>
              </header>
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
